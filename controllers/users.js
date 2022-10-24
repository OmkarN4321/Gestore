const { ObjectId } = require("@fastify/mongodb");

async function addUser(req, reply) {
	try {
		const userData = req.body;
		const { role } = req.user;

		if (role === "Admin") {
			const users = this.mongo.db.collection("users");
			const user = await users.findOne({ email: userData.email });

			if (!user) {
				await users.insertOne(userData);

				reply.code(200).send({ message: "User added succesfully" });
			} else {
				reply.code(500).send({ message: "User already exists" });
			}
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function getUser(req, reply) {
	try {
		const { email } = req.query;
		const { role } = req.user;

		if (role === "Admin") {
			const users = this.mongo.db.collection("users");
			const user = await users.findOne({ email });

			if (user && user.userType.role !== "Admin" && user.userType.role !== "Staff") {
				delete user.credentials;
				delete user.userType.password;

				reply.code(200).send({ message: "User found", user });
			} else {
				reply.code(500).send({ message: "User not found" });
			}
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function updateUser(req, reply) {
	try {
		const userData = req.body;
		const { id } = req.params;
		const { role } = req.user;

		if (role === "Admin") {
			const users = this.mongo.db.collection("users");
			await users.updateOne({ _id: ObjectId(id) }, { $set: userData });

			reply.code(200).send({ message: "User updated succesfully" });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function removeUser(req, reply) {
	try {
		const { id } = req.params;
		const { role } = req.user;

		if (role === "Admin") {
			const users = this.mongo.db.collection("users");
			await users.deleteOne({ _id: ObjectId(id) });

			reply.code(200).send({ message: "User deleted succesfully" });
		} else {
			reply.code(500).send({ message: "Not authorized" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

module.exports = {
	addUser,
	getUser,
	updateUser,
	removeUser,
};
