import * as dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;
const jwtObj = {
    secret: JWT_SECRET,
};


export default jwtObj