const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        let user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        user = new User({ email,firstName,
            lastName, password });
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user with password
        const user = await User.findOne({ email }).select('password email _id').exec();
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.allUsers = async(req, res)=>{
    try {
         const users = await User.find({} , 'firstName');
         res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error' });
    }
}
