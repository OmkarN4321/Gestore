const { getOrders, addOrder, removeOrder, paymentIntent } = require("../controllers/orders");
const { OrderSchema, OrderParamsSchema, OrderPostBodySchema, PaymentIntentBodySchema } = require("../schema/orders");

const getOrdersOpts = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
					orders: {
						type: "array",
						items: OrderSchema,
					},
				},
			},
			500: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: getOrders,
};

const addOrderOpts = {
	schema: {
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: addOrder,
};

const removeOrderOpts = {
	schema: {
		params: OrderParamsSchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: removeOrder,
};

const paymentIntentOpts = {
	schema: {
		body: PaymentIntentBodySchema,
		response: {
			200: {
				type: "object",
				properties: {
					client_secret: { type: "string" },
				},
			},
			500: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: paymentIntent,
};

const orderRoutes = (fastify, options, done) => {
	// Order routes
	fastify.get("/orders", { ...getOrdersOpts, onRequest: [fastify.verify] });

	fastify.post("/paymentIntent", { ...paymentIntentOpts, onRequest: [fastify.verify] });

	fastify.post("/orders", { ...addOrderOpts, config: { rawBody: true } });

	fastify.delete("/orders/:id", { ...removeOrderOpts, onRequest: [fastify.verify] });

	done();
};

module.exports = orderRoutes;
