import * as jwt from 'jsonwebtoken';
import jwtObj from '../../config/jwt';

export const makeToken = (tokenType, id) => {
    let expiresIn = '24h';
    // let expiresIn = '10m';
    if (tokenType == 'refresh') {
        expiresIn = '30 days';
    }

    let token = jwt.sign(
        {
            id: id,
        },
        jwtObj.secret,
        { expiresIn: expiresIn },
    );

    return token;
}