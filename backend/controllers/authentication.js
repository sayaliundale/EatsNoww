const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name, email, password: hashedPassword, role: "user"
        })
        await user.save();
        res.status(200).send("User created!")
    }
    catch (err) {
        res.status(400).send("Email might exist!")
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!user || !isMatch) {
            res.status(400).send("User might exists alredy!")
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'User login' , 
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },})
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };

module.exports = { signup, login, getMyProfile }