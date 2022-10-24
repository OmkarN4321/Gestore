const UserPostBodySchema = {
	type: "object",
	required: ["name", "RFID", "email", "userType"],
	additionalProperties: false,
	properties: {
		name: { type: "string" },
		RFID: { type: "number" },
		email: { type: "string" },
		userType: {
			type: "object",
			properties: { role: { type: "string" } },
		},
	},
};

const UserSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		RFID: { type: "number" },
		email: { type: "string" },
		userType: {
			type: "object",
			properties: { role: { type: "string" } },
		},
	},
};

const UserUpdateBodySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		name: { type: "string" },
		RFID: { type: "number" },
		email: { type: "string" },
	},
};

const UserParamsSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		id: { type: "string" },
	},
};

const UserQuerySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		email: { type: "string" },
	},
};

module.exports = {
	UserSchema,
	UserQuerySchema,
	UserParamsSchema,
	UserPostBodySchema,
	UserUpdateBodySchema,
};
