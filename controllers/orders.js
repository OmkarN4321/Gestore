const { ObjectId } = require("@fastify/mongodb");

async function getOrders(req, reply) {
	try {
		const { role } = req.user;

		if (role === "Staff") {
			const orders_c = this.mongo.db.collection("orders");
			const orders = await orders_c.find({}).toArray();

			reply.code(200).send({ message: "Orders sent", orders });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function addOrder(req, reply) {
	try {
		const stripeData = req.rawBody;
		const stripeSig = req.headers["stripe-signature"];
		const webhookSecret = this.config.WEBHOOK_SECRET;

		const event = await this.stripe.webhooks.constructEvent(stripeData, stripeSig, webhookSecret);

		if (event && event.type === "payment_intent.succeeded") {
			const {
				metadata: { userName, userEmail, ...listItems },
			} = event.data.object;
			console.log(listItems);
			const order = { user: { name: userName, email: userEmail }, list: Object.values(listItems) };

			const orders = this.mongo.db.collection("orders");
			await orders.insertOne(order);

			reply.code(200).send({ message: "Order added succesfully" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function removeOrder(req, reply) {
	try {
		const { id } = req.params;
		const { role } = req.user;

		if (role === "Staff") {
			const orders = this.mongo.db.collection("orders");
			const { user } = await orders.findOne({ _id: ObjectId(id) });

			await this.mailer.sendMail({
				from: this.config.AUTH_EMAIL,
				to: user.email,
				subject: "Verification mail",
				html: `<p>Collect your order at the counter </p>`,
			});

			await orders.deleteOne({ _id: ObjectId(id) });

			reply.code(200).send({ message: "Order completed succesfully" });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function paymentIntent(req, reply) {
	try {
		const { list, user } = req.body;

		let amount = 0;
		let metadata = { userName: user.name, userEmail: user.email };

		for (let i = 0; i < list.length; i++) {
			const menu = this.mongo.db.collection("menu");
			const item = await menu.findOne({ _id: ObjectId(list[i]) });

			amount += item.price * 100;
			metadata[`item${i + 1}`] = list[i];
		}

		const { client_secret } = await this.stripe.paymentIntents.create({
			amount,
			metadata,
			currency: "inr",
			automatic_payment_methods: { enabled: true },
		});

		reply.code(200).send({ client_secret });
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

module.exports = {
	getOrders,
	addOrder,
	removeOrder,
	paymentIntent,
};
