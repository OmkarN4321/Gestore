const rawBodyPlugin = (fastify) => {
	fastify.register(require("fastify-raw-body"), {
		field: "rawBody",
		global: false,
		runFirst: true,
	});
};

module.exports = rawBodyPlugin;
