module.exports = class ClassRoomManager {

    constructor({ utils, cache, config, cortex, managers, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.mongomodels = mongomodels;
        this.httpExposed = ['get=list', 'create', 'put=update', 'delete=delete'];
        this.responseDispatcher = managers.responseDispatcher;
    }

    async list({ __admin }) {
        const schoolIds = await this.mongomodels.school.distinct('_id', { admins: __admin._id })
        return this.mongomodels.classRoom.find({ school: { $in: schoolIds } }).populate({
            path: 'school',
            select: 'name'
        });
    }

    async create({ __admin, name, school }) {
        const targetSchool = await this.mongomodels.school.findById(school, {
            admins: 1
        });

        if (!targetSchool?.admins?.includes(__admin._id))
            throw new Error('not authorized');

        return this.mongomodels.classRoom.create({
            name,
            creator: __admin._id,
            school
        });
    }

    async update({ __admin, name, id }) {
        await this.checkIfAllowed({ classRoomId: id, admin: __admin })

        return this.mongomodels.classRoom.findByIdAndUpdate(id, {
            $set: {
                name,
            }
        }, { new: true });
    }

    async delete({ __admin, id }) {
        await this.checkIfAllowed({ classRoomId: id, admin: __admin })

        return this.mongomodels.classRoom.findByIdAndDelete(id);
    }

    async checkIfAllowed({ classRoomId, admin }) {
        const classRoom = await this.mongomodels.classRoom.findById(classRoomId, {
            school: 1
        });
        if (!classRoom)
            throw new Error('class room not found');
        const school = await this.mongomodels.school.findById(classRoom.school, { admins: 1 });
        if (!school?.admins?.includes(admin._id))
            throw new Error('not authorized');

        return classRoom;
    }
}
