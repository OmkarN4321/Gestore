const fastifyPlugin = require("fastify-plugin");

const mongoPlugin = (fastify) => {
	fastify.register(
		fastifyPlugin(async () => {
			fastify.register(require("@fastify/mongodb"), {
				url: fastify.config.MONGO_URL,
				forceClose: true,
			});
		})
	);
};

module.exports = mongoPlugin;
