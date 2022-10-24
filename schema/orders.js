const OrderSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		_id: { type: "string" },
		user: { type: "string" },
		amount: { type: "number" },
		orderNo: { type: "number" },
		items: { type: "array", items: { type: "string" } },
	},
};

const OrderParamsSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		id: { type: "string" },
	},
};

const PaymentIntentBodySchema = {
	type: "object",
	required: ["list", "user"],
	additionalProperties: false,
	properties: {
		list: { type: "array", items: { type: "string" } },
		user: { type: "object", properties: { name: { type: "string" }, email: { type: "string" } } },
	},
};

module.exports = { OrderSchema, OrderParamsSchema, PaymentIntentBodySchema };
