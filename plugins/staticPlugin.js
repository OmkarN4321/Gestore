const path = require("path");

const staticPlugin = (fastify) => {
	fastify.register(require("@fastify/static"), {
		root: path.join(process.cwd(), "client", "dist"),
	});
};

module.exports = staticPlugin;
