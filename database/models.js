module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true },
        nametitle: { type: String, required: true },
        gender: { type: String },
        mobile: { type: String },
        email: { type: String, required: true }
    }
};
