const fastifyPlugin = require("fastify-plugin");
const { createTransport } = require("nodemailer");

const fastifyMailer = (fastify, options, done) => {
	try {
		if (options) {
			if (fastify.mailer) {
				return done(new Error("mailerPlugin has already been registered"));
			} else {
				const transporter = createTransport(options);
				fastify.decorate("mailer", transporter);

				done();
			}
		} else {
			return done(new Error("You must provide valid options"));
		}
	} catch (err) {
		done(err);
	}
};

const mailerPlugin = (fastify) => {
	fastify.register(fastifyPlugin(fastifyMailer), {
		service: "gmail",
		auth: {
			user: fastify.config.AUTH_EMAIL,
			pass: fastify.config.AUTH_PASS,
		},
	});
};

module.exports = mailerPlugin;
