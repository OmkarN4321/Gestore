const { addUser, getUser, updateUser, removeUser } = require("../controllers/users");
const {
	UserSchema,
	UserQuerySchema,
	UserParamsSchema,
	UserPostBodySchema,
	UserUpdateBodySchema,
} = require("../schema/users");

const addUserOpts = {
	schema: {
		body: UserPostBodySchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: addUser,
};

const getUserOpts = {
	schema: {
		query: UserQuerySchema,
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
					user: UserSchema,
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
	handler: getUser,
};

const updateUserOpts = {
	schema: {
		params: UserParamsSchema,
		body: UserUpdateBodySchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: updateUser,
};

const removeUserOpts = {
	schema: {
		params: UserParamsSchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: removeUser,
};

const userRoutes = (fastify, options, done) => {
	// User routes
	fastify.post("/user", { ...addUserOpts, onRequest: [fastify.verify] });

	fastify.get("/user", { ...getUserOpts, onRequest: [fastify.verify] });

	fastify.put("/user/:id", { ...updateUserOpts, onRequest: [fastify.verify] });

	fastify.delete("/user/:id", { ...removeUserOpts, onRequest: [fastify.verify] });

	done();
};

module.exports = userRoutes;
