import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import verifyToken from "../utils/verifyToken.js";


export const isLoggedIn = (req, res, next) => {

    // get token from header
    const token = getTokenFromHeader(req);

    // verify the token
    const decodedUser = verifyToken(token);

    
    if (!decodedUser) {
        throw new Error('Unauthorized access');
    }
    else {
        // save the user in req obj
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}

export default isLoggedIn;