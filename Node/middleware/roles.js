const roleAuth = (roles) => {
    return (req, res, next) => {
        console.log("Checking role authorization");

        if (!req.user) {
            console.log("Unauthorized: No user found in request");

            return res.status(401).send('Unauthorized');
        }

        if (!roles.includes(req.user.role)) {
            console.log(`Access denied: User role ${req.user.role} is not in the allowed roles ${roles}`);

            return res.status(403).send('Access denied');
        }
        console.log(`Access granted: User role ${req.user.role} is authorized`);

        next();
    };
};

module.exports = roleAuth;