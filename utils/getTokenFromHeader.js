export const getTokenFromHeader = (req) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

export default getTokenFromHeader;