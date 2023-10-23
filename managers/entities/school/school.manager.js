const userMongoModel = require("../user/user.mongoModel");

module.exports = class SchoolManager {

    constructor({ utils, cache, config, cortex, managers, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.mongomodels = mongomodels;
        this.httpExposed = ['get=list', 'createSchool', 'put=updateSchool', 'delete=deleteSchool'];
        this.responseDispatcher = managers.responseDispatcher;
    }

    list({ __superAdmin }) {
        return this.mongomodels.school.find().populate({
            path: 'creator',
            select: 'username'
        });
    }

    async createSchool({ __superAdmin, name, admins }) {
        let createdSchool = await this.mongomodels.school.create({
            name,
            creator: __superAdmin._id,
            admins
        });

        return createdSchool;
    }

    async updateSchool({ __superAdmin, name, admins, id }) {
        return this.mongomodels.school.findByIdAndUpdate(id, {
            $set: {
                name,
                admins
            }
        }, { new: true });
    }

    async deleteSchool({ __superAdmin, id }) {
        return this.mongomodels.school.findByIdAndDelete(id);
    }
}
