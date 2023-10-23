module.exports = class SchoolManager {

    constructor({ utils, cache, config, cortex, managers, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.mongomodels = mongomodels;
        this.httpExposed = ['createSchool', 'put=updateSchool', 'delete=deleteSchool'];
        this.responseDispatcher = managers.responseDispatcher;
    }

    async createSchool({ __superAdmin, name }) {
        let createdSchool = await this.mongomodels.school.create({
            name,
            creator: __superAdmin._id
        });

        return createdSchool;
    }

    async updateSchool({ __superAdmin, name, id }) {
        return this.mongomodels.school.findByIdAndUpdate(id, {
            $set: {
                name
            }
        }, { new: true });
    }

    async deleteSchool({ __superAdmin, id }) {
        return this.mongomodels.school.findByIdAndDelete(id);
    }
}
