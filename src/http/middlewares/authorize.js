// Middleware for authorization
export const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Unauthorized: You do not have permission to access this resource' });
        }
        next();
    };
};
