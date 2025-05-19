import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded;
    } catch (error) {
        throw new Error('Token verification failed');
    }
};

export default verifyToken;