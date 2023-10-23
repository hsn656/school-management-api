# School Management API

## Description
a school management application that allows users to perform basic CRUD operations on three main entities: School, Classroom, and Student. The application should provide APIs that enable the management of these entities. Superadmins will have the ability to add schools, while school admins can manage classrooms and students within their respective schools.

## Technology Stack
- Node.js
- Mongodb

## Getting Started

To get started with this project, follow these steps:

- Clone this repository to your local machine.
- navigate to the project directory.

```bash 
cd school-management-api/
```
- copy the '.env.exmaple' to be '.env' and replace the main values (mongo-ui & redis-uri).

```bash 
cp .env-example .env
```

- start the app.

```bash 
npm start
```

## Notes
- By Default system has one super-admin user with username: 'hsn' and password: '12345678'
- you can change super admin credintial by updating the '.env' file following values: (SUPERADMIN_USERNAME - SUPERADMIN_PASSWORD)
- there is no another way to create super-admin user.

## Try API Using Postman
1. go to `<uri>/static` or visit https://school-management-api-7y93.onrender.com/static/


## Try API Using Postman
1. open postmain
2. press import and browser to the app
3. you will find it "documentaion/axion.postman_collection.json"
4. you are ready now, enjoy ^_^


## Contributing
If you're interested in contributing to this project, please follow these guidelines:
1. Fork the repository
2. Make your changes
3. Submit a pull request
