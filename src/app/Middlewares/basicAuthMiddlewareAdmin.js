import basicAuth from 'express-basic-auth';

//! The admin username and password are hardcoded as it is mandatory guidance for the exercise proposed by the faculty.
const basicAuthMiddlewareAdmin = basicAuth({
    users: { 'admin': 'desafio-igti-nodejs' },
    challenge: true,
});

export default basicAuthMiddlewareAdmin;
