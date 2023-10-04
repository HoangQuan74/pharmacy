import * as crypto from 'crypto';

export const hashPass = (pass) => {
    let hash = crypto.createHash('sha256');
    return hash.update(pass).digest('hex');
}