import jwt from 'jsonwebtoken';
import { UnauthorizedError} from '../error/index.js'; // Assuming these errors are defined in your project

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(new UnauthorizedError('No token provided'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(new UnauthorizedError('Invalid token'));
    }
};

export const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(new ForbiddenError('You do not have permission to perform this action'));
        }
        next();
    };
};

//export { authenticate, authorize };

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.id, Role:decoded.Role} // Assuming the JWT contains the user's ID
        next();
        console.log(req.user)
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

