const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    const {email, password, ...others} = req.body;

    // check if email and password is provided
    if (!email || !password)
    {
        return res.send({message: "Please provide email and password"});
    }

    // check if email exist in the database
    const emailExist = await userModel.findOne({email});
    if (emailExist)
    {
        return res.send({message: "There's a user with this email. Please login or provide another email for registration"})
    }

    try {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save the details to the database
        const newUser = new userModel({email, password: hashedPassword, ...others});
        const savedUser = await newUser.save();

        return res.send(savedUser);
    } catch (error) {
        console.log(error.message);
        return res.send("unable to create user")
    };
}

const loginUser = async (req, res) => {
    // destructure the body
    const {email, password} = req.body;

    // check if email and password is provided
    if (!email || !password)
    {
        return res.send({message: "Please provide email and password"});
    }

    // Get user if email exist
    const user = await userModel.findOne({email});
    if (!user)
    {
        return res.send({message: "Invalid email address"});
    }

    // verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
    {
        return res.send({message: "Invalid email or password"});
    }

    return res.send({message: "Email and password successfully validated"});
}

const getUsers = async (req, res) => {
    try {
        // get all user from the database
        const getUsers = await userModel.find();

        return res.send(getUsers);
    } catch (error) {
        console.log(error.message);
        return res.send("unable to fetch all users");
    }
}

const getUser = async (req, res) => {
    // get the id of the user from the query
    const {id} = req.query;

    // check if id is present
    if (!id)
    {
        return res.send({message: "Please provide a user ID in the query."});
    }

    // get user from the database using id
    const user = await userModel.findById(id);
    if (!user)
    {
        return res.send({message: "User not found with the provided ID."});
    };

    return res.json(user);
}

const updateUser = async (req, res) => {
    // get the id of the user via query
    const {id} = req.query;

    const updateUserRequest = req.body;

    // check if id is present
    if (!id)
    {
        return res.send({message: "Please provide a user ID in the query."});
    }

    // check if the id provided is valid
    const isIdValid = await userModel.findOne({_id: id});
    if (!isIdValid)
    {
        return res.send({message: "Id Does Not Exist"});
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, {...updateUserRequest}, {new:true});
        return res.json(updatedUser);
    } catch (error) {
        console.log(error.message);
        return res.send({message: "unable to update user"});
    }
}

const deleteUser = async (req, res) => {
    // get the id of the user via params
    const {id} = req.params;

    // check if id is present
    if (!id)
    {
        return res.send({message: "Please provide a user ID in the params."});
    }

    // check if the id provided is valid
    const isIdValid = await userModel.findOne({_id: id});
    if (!isIdValid)
    {
        return res.send({message: "Id Does Not Exist"});
    }

    try {
        // remove the user from the database
        const deletedUser = await userModel.findByIdAndDelete(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error.message);
        return res.send({message: "unable to remove user"});
    }   
}

module.exports = {createUser, loginUser, getUsers, getUser, updateUser, deleteUser};