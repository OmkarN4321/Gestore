const envPlugin = require("./plugins/envPlugin");
const jwtPlugin = require("./plugins/jwtPlugin");
const mongoPlugin = require("./plugins/mongoPlugin");
const mailerPlugin = require("./plugins/mailerPlugin");
const stripePlugin = require("./plugins/stripePlugin");
const staticPlugin = require("./plugins/staticPlugin");
const rawBodyPlugin = require("./plugins/rawBodyPlugin");

const fastify = require("fastify")({ logger: true });

const init = async () => {
	envPlugin(fastify);
	await fastify.after();
	jwtPlugin(fastify);
	mongoPlugin(fastify);
	mailerPlugin(fastify);
	stripePlugin(fastify);
	staticPlugin(fastify);
	rawBodyPlugin(fastify);

	fastify.register(require("./routes/auth"));
	fastify.register(require("./routes/users"));
	fastify.register(require("./routes/items"));
	fastify.register(require("./routes/orders"));
};

const serve = () => {
	fastify.get("/", function (req, reply) {
		reply.sendFile("index.html");
	});
};

const run = async () => {
	try {
		await fastify.ready();
		await fastify.listen({ port: process.env.PORT, host: "0.0.0.0" });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

//Redeploy

serve();
init();
run();
