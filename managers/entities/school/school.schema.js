module.exports = {
    createSchool: [
        {
            path: 'name',
            type: 'string',
            length: { min: 3, max: 100 },
            required: true,
        },
        {
            path: 'admins',
            type: 'Array',
            items: {
                type: 'String',
            }
        }
    ],
    updateSchool: [
        {
            path: 'id',
            type: 'string',
            required: true,
        },
        {
            path: 'name',
            type: 'string',
            length: { min: 3, max: 100 },
            required: true,
        },
        {
            path: 'admins',
            type: 'Array',
            items: {
                type: 'String',
            }
        }
    ],
    deleteSchool: [
        {
            path: 'id',
            type: 'string',
            required: true,
        },
    ],
}