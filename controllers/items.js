const { ObjectId } = require("@fastify/mongodb");

async function getItems(req, reply) {
	try {
		const menu = this.mongo.db.collection("menu");
		const items = await menu.find({}).toArray();

		reply.code(200).send({ message: "Items sent", items });
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function addItem(req, reply) {
	try {
		const itemData = req.body;
		const { role } = req.user;

		if (role === "Admin") {
			const menu = this.mongo.db.collection("menu");
			const item = await menu.findOne({ name: itemData.name });

			if (!item) {
				await menu.insertOne(itemData);

				reply.code(200).send({ message: "Item added succesfully" });
			} else {
				reply.code(500).send({ message: "Item with that name already exists" });
			}
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function getItem(req, reply) {
	try {
		const { id } = req.params;

		const menu = this.mongo.db.collection("menu");
		const item = await menu.findOne({ _id: ObjectId(id) });

		if (item) {
			reply.code(200).send({ message: "Item sent", item });
		} else {
			reply.code(500).send({ message: "Item doesn't exist" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function updateItem(req, reply) {
	try {
		const itemData = req.body;
		const { id } = req.params;
		const { role } = req.user;

		if (role === "Admin") {
			const menu = this.mongo.db.collection("menu");
			await menu.updateOne({ _id: ObjectId(id) }, { $set: itemData });

			reply.code(200).send({ message: "Item updated succesfully" });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function removeItem(req, reply) {
	try {
		const { id } = req.params;
		const { role } = req.user;

		if (role === "Admin") {
			const menu = this.mongo.db.collection("menu");
			await menu.deleteOne({ _id: ObjectId(id) });

			reply.code(200).send({ message: "Item deleted succesfully" });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

module.exports = {
	getItems,
	addItem,
	getItem,
	updateItem,
	removeItem,
};
