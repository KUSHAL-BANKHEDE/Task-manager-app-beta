const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization denied, no token' });
    }

    const token = authHeader.split(" ")[1]; // Get the actual token
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, invalid token format' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;  // Attach user's ID to req.user for later use
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;

