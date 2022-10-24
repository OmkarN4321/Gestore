const jwtPlugin = (fastify) => {
	fastify.register(require("@fastify/jwt"), {
		secret: fastify.config.JWT_SECRET,
		cookie: {
			cookieName: "token",
			signed: false,
		},
	});

	fastify.decorate("verify", async function (req, reply) {
		const token = req.raw.headers.cookie?.match(/(?<=token=).+/)[0];

		token ? (req.user = this.jwt.verify(token)) : reply.send({ message: "Not authorized" });
	});
};

module.exports = jwtPlugin;
