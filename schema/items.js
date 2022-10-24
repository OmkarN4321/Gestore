const ItemPostBodySchema = {
	type: "object",
	required: ["name", "price"],
	additionalProperties: false,
	properties: {
		name: { type: "string" },
		price: { type: "number" },
	},
};

const ItemSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		price: { type: "number" },
	},
};

const ItemUpdateBodySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		name: { type: "string" },
		price: { type: "number" },
	},
};

const ItemParamsSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		id: { type: "string" },
	},
};

module.exports = { ItemSchema, ItemParamsSchema, ItemPostBodySchema, ItemUpdateBodySchema };
