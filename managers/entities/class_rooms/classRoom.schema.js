

module.exports = {
    create: [
        {
            path: 'name',
            type: 'string',
            length: { min: 3, max: 100 },
            required: true,
        },
        {
            path: 'school',
            type: 'string',
            required: true,
        }
    ],
    update: [
        {
            path: 'name',
            type: 'string',
            length: { min: 3, max: 100 },
            required: true,
        },
        {
            path: 'id',
            type: 'string',
            required: true,
        },
    ],
    delete: [
        {
            path: 'id',
            type: 'string',
            required: true,
        },
    ],
}


