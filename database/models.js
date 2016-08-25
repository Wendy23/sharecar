module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String },
        nametitle: { type: String, default:"name" },
        gender: { type: String, default:"gender" },
        mobile: { type: String, default:0 },
        email: { type: String,default:0 }
    }
};
