const fastifyPlugin = require("fastify-plugin");
const Stripe = require("stripe");

const fastifyStripe = (fastify, options, done) => {
	try {
		const { secret, ...stripeOptions } = options;

		if (!secret) {
			return done(new Error("You must provide a Stripe API key"));
		}

		if (fastify.stripe) {
			return done(new Error("fastify-stripe has already been registered"));
		} else {
			const stripe = Stripe(secret, stripeOptions);
			fastify.decorate("stripe", stripe);

			done();
		}
	} catch (err) {
		done(err);
	}
};

const stripePlugin = (fastify) => {
	fastify.register(fastifyPlugin(fastifyStripe), {
		secret: fastify.config.STRIPE_SECRET,
	});
};

module.exports = stripePlugin;
