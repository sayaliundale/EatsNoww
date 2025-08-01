const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name, email, password: hashedPassword,
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
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)

        if (!user || !isMatch) {
            res.status(400).send("User might exists alredy!")
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        console.log(" Token - ", token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({message : 'User login'})
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }

}

module.exports = { signup, login }