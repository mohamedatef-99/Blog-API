const User = require('../models/Users');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
        return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if (existingUser) {
        return res.status(200).json({message: "User Already exists!. Login Instead"})
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    })

    try {
        await user.save()
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({ user });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Not Found. SignUp Instead" });
    }
    const isPasswordCorrect =  bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Successful" });
};


module.exports = {
    getAllUser,
    signup,
    login,
};
