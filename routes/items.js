const { getItems, addItem, getItem, updateItem, removeItem } = require("../controllers/items");
const { ItemSchema, ItemParamsSchema, ItemPostBodySchema, ItemUpdateBodySchema } = require("../schema/items");

const getItemsOpts = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
					items: {
						type: "array",
						items: ItemSchema,
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
	handler: getItems,
};

const addItemOpts = {
	schema: {
		body: ItemPostBodySchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: addItem,
};

const getItemOpts = {
	schema: {
		params: ItemParamsSchema,
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
					item: ItemSchema,
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
	handler: getItem,
};

const updateItemOpts = {
	schema: {
		params: ItemParamsSchema,
		body: ItemUpdateBodySchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: updateItem,
};

const removeItemOpts = {
	schema: {
		params: ItemParamsSchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: removeItem,
};

const userRoutes = (fastify, options, done) => {
	// Item routes
	fastify.get("/items", { ...getItemsOpts, onRequest: [fastify.verify] });

	fastify.post("/items", { ...addItemOpts, onRequest: [fastify.verify] });

	fastify.get("/items/:id", { ...getItemOpts, onRequest: [fastify.verify] });

	fastify.put("/items/:id", { ...updateItemOpts, onRequest: [fastify.verify] });

	fastify.delete("/items/:id", { ...removeItemOpts, onRequest: [fastify.verify] });

	done();
};

module.exports = userRoutes;
