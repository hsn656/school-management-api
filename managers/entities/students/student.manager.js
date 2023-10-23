module.exports = class StudentManager {

    constructor({ utils, cache, config, cortex, managers, mongomodels } = {}) {
        this.config = config;
        this.cortex = cortex;
        this.mongomodels = mongomodels;
        this.httpExposed = ['get=list', 'create', 'put=update', 'delete=delete'];
        this.classRoomManager = managers.classRoom
    }

    async list({ __admin }) {
        const schoolIds = await this.mongomodels.school.distinct('_id', { admins: __admin._id })
        return this.mongomodels.student.find({ school: { $in: schoolIds } }).populate([
            {
                path: 'school',
                select: 'name'
            },
            {
                path: 'classRoom',
                select: 'name',
            }
        ]);
    }

    async create({ __admin, name, classRoom }) {
        const targetClassRoom = await this.classRoomManager.checkIfAllowed({ classRoomId: classRoom, admin: __admin });

        return this.mongomodels.student.create({
            name,
            creator: __admin._id,
            classRoom,
            school: targetClassRoom.school
        });
    }

    async update({ __admin, name, id }) {
        const { _id: classRoom, school } = await this.checkIfAllowed({ studentId: id, admin: __admin })
        return this.mongomodels.student.findByIdAndUpdate(id, {
            $set: {
                name,
                classRoom,
                school
            }
        }, { new: true });
    }

    async delete({ __admin, id }) {
        await this.checkIfAllowed({ studentId: id, admin: __admin })
        return this.mongomodels.student.findByIdAndDelete(id);
    }

    async checkIfAllowed({ studentId, admin }) {
        const student = await this.mongomodels.student.findById(studentId, { classRoom: 1 });
        if (!student)
            throw new Error('student not found');
        return this.classRoomManager.checkIfAllowed({ classRoomId: student.classRoom, admin });
    }
}
