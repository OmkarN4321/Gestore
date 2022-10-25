const fastifyPlugin = require("fastify-plugin");
const envSchema = require("env-schema");

const fastifyEnv = (fastify, opts, done) => {
	try {
		const config = envSchema(opts);
		const confKey = opts.confKey || "config";
		fastify.decorate(confKey, config);

		done();
	} catch (err) {
		done(err);
	}
};

const envPlugin = (fastify) => {
	const envSchema = {
		type: "object",
		required: ["STRIPE_SECRET", "WEBHOOK_SECRET", "JWT_SECRET", "MONGO_URL", "AUTH_EMAIL", "AUTH_PASS"],
		properties: {
			STRIPE_SECRET: {
				type: "string",
			},
			WEBHOOK_SECRET: {
				type: "string",
			},
			JWT_SECRET: {
				type: "string",
			},
			MONGO_URL: {
				type: "string",
			},
			AUTH_EMAIL: {
				type: "string",
			},
			AUTH_PASS: {
				type: "string",
			},
		},
	};

	fastify.register(fastifyPlugin(fastifyEnv), {
		confKey: "config",
		schema: envSchema,
		dotenv: true,
		data: process.env,
	});
};

module.exports = envPlugin;
