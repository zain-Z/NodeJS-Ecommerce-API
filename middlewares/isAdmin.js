import User from '../model/User.js';


const isAdmin = async (req, res, next) => {
    // find the login user by id
    const user = await User.findById(req.userAuthId);
    // check if the user exists and has the role of admin
    if (user && user.role === 'admin') {
        next();
    } else {
        next(new Error('You are not authorized to access this resource'));
    }
};

export default isAdmin;