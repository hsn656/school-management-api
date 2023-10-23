

module.exports = {
    createUser: [
        {
            model: 'username',
            required: true,
        },
        {
            model: 'password',
            required: true,
        },
    ],
    login: [
        {
            model: 'username',
            required: true,
        },
        {
            model: 'password',
            required: true,
        },
    ],
}


