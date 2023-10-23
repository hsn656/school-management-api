const bcrypt = require("bcryptjs");

module.exports = class UserManager {

    constructor({ utils, cache, config, cortex, managers, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.mongomodels = mongomodels;
        this.tokenManager = managers.token;
        this.usersCollection = "users";
        this.httpExposed = ['createUser', 'login', 'get=list'];
        this.responseDispatcher = managers.responseDispatcher;
    }

    async createUser({ __currentUser, username, password }) {
        const alreadyRegisteredUSer = await this.mongomodels.user
            .findOne({ username }, { _id: 1 })
            .lean();

        if (alreadyRegisteredUSer) throw new Error('username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        let createdUser = await this.mongomodels.user.create({
            username,
            password: hashedPassword,
            creator: __currentUser._id,
            role: this.config.auth.systemRoles.admin
        });

        return {
            user: createdUser,
        };
    }

    async login({ username, password }) {
        const user = await this.mongomodels.user
            .findOne({ username }, { password: 1 })
            .lean();

        if (!user) throw new Error('Invalid credentials');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        return {
            accessToken: this.tokenManager.genLongToken({ userId: user._id, userKey: username }),
        };
    }

    list({ __superAdmin }) {
        return this.mongomodels.user
            .find();
    }

    getUserById({ _id }) {
        return this.mongomodels.user
            .findOne({ _id })
            .lean();
    }
}
