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
		required: ["STRIPE_SECRET", "MONGO_URL", "JWT_SECRET", "AUTH_EMAIL", "AUTH_PASS"],
		properties: {
			STRIPE_SECRET: {
				type: "string",
			},
			MONGO_URL: {
				type: "string",
			},
			JWT_SECRET: {
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
