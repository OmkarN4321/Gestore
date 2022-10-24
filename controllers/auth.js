async function userLogin(req, reply) {
	try {
		const { email, password } = req.query;

		const users = this.mongo.db.collection("users");
		const user = await users.findOne({ email });

		if (
			user &&
			user.credentials.password === Number(password) &&
			user.credentials.expiresAt > Math.floor(new Date().getTime() / 1000)
		) {
			await users.updateOne({ email }, { $set: { credentials: { password: null, expiresAt: null } } });
			await users.updateMany(
				{ "credentials.expiresAt": { $lt: Math.floor(new Date().getTime() / 1000) } },
				{ $set: { credentials: { password: null, expiresAt: null } } }
			);

			const token = this.jwt.sign({ role: user.userType.role });
			reply.header("set-cookie", `token=${token}; HttpOnly`);

			delete user._id;
			delete user.RFID;
			delete user.credentials;
			delete user.userType.password;

			reply.code(200).send({ message: "success", user });
		} else {
			reply.code(500).send({ message: "failure" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function adminLogin(req, reply) {
	try {
		const { email, password } = req.query;

		const users = this.mongo.db.collection("users");
		const user = await users.findOne({ email });

		if (user && user.userType.role === "Admin" && user.userType.password === password) {
			const token = this.jwt.sign({ role: user.userType.role });
			reply.header("set-cookie", `token=${token}; HttpOnly`);

			delete user._id;
			delete user.RFID;
			delete user.credentials;
			delete user.userType.password;

			reply.code(200).send({ message: "success", user });
		} else {
			reply.code(500).send({ message: "failure" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function staffLogin(req, reply) {
	try {
		const { email, password } = req.query;

		const users = this.mongo.db.collection("users");
		const user = await users.findOne({ email });

		if (user && user.userType.role === "Staff" && user.userType.password === password) {
			const token = this.jwt.sign({ role: user.userType.role });
			reply.header("set-cookie", `token=${token}; HttpOnly`);

			delete user._id;
			delete user.RFID;
			delete user.credentials;
			delete user.userType.password;

			reply.code(200).send({ message: "success", user });
		} else {
			reply.code(500).send({ message: "failure" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

async function verifyRFID(req, reply) {
	try {
		const { RFID } = req.query;

		const users = this.mongo.db.collection("users");
		const user = await users.findOne({ RFID });

		if (user) {
			const password = Math.floor(1000 + Math.random() * 9000);
			const expiresAt = Math.floor(new Date().getTime() / 1000) + 600;

			await users.updateOne({ RFID }, { $set: { credentials: { password, expiresAt } } });

			await this.mailer.sendMail({
				from: this.config.AUTH_EMAIL,
				to: user.email,
				subject: "Verification mail",
				html: `<p>Your password is </P><strong> ${password} </strong>`,
			});

			reply.code(200).send({ message: "success" });
		} else {
			reply.code(500).send({ message: "failure" });
		}
	} catch ({ message }) {
		reply.code(500).send({ message });
	}
}

module.exports = {
	userLogin,
	adminLogin,
	staffLogin,
	verifyRFID,
};
