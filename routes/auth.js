const { userLogin, adminLogin, staffLogin, verifyRFID } = require("../controllers/auth");
const { RFIDQuerySchema, LoginQuerySchema } = require("../schema/auth");
const { UserSchema } = require("../schema/users");

const userLoginOpts = {
	schema: {
		query: LoginQuerySchema,
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
	handler: userLogin,
};

const adminLoginOpts = {
	schema: {
		query: LoginQuerySchema,
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
	handler: adminLogin,
};

const staffLoginOpts = {
	schema: {
		query: LoginQuerySchema,
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
	handler: staffLogin,
};

const verifyRFIDOpts = {
	schema: {
		query: RFIDQuerySchema,
		response: {
			default: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: verifyRFID,
};

const authRoutes = (fastify, options, done) => {
	fastify.get("/userLogin", userLoginOpts);

	fastify.get("/adminLogin", adminLoginOpts);

	fastify.get("/staffLogin", staffLoginOpts);

	fastify.get("/verifyRFID", verifyRFIDOpts);

	done();
};

module.exports = authRoutes;
