const LoginQuerySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		email: { type: "string" },
		password: { type: "string" },
	},
};

const RFIDQuerySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		RFID: { type: "number" },
	},
};

module.exports = { RFIDQuerySchema, LoginQuerySchema };
