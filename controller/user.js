const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const registeredUser = await User.findOne({ email });
        if(!registeredUser) {
            return res.status(404).json({
                message: "User doesn't exist."
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, registeredUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ 
                message: "Wrong password entered." 
            });
        }
        //second argument is to set the secret for jwt.
        const token = jwt.sign({ email: registeredUser.email, id: registeredUser._id, name: registeredUser.lastname}, 'demo', { expiresIn: "24h"});
        res.status(200).json({ result: registeredUser, token })
    } catch (error) {
        res.status(500).json({ 
            message: "Oops, something went wrong."
        });
    }
}

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, userType, schoolID } = req.body;
    try {
        const registeredUser = await User.findOne({ email });
        if(registeredUser){
            return res.status(400).json({
                message: "User already exists."
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Password don't match"
            });
        }
        //the second argument for bcrypt hash is "salt".
        const hashPassword = await bcrypt.hash(password, 12);
        // const userProfile = {
        //     school: 'UTS',
        //     major: 'FEIT',
        //     selfintro: 'About me',
        //     skills: ['React', 'JavaScript']
        // };

        const result = await User.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
            userType,
            schoolID
        });
        //const token = {};
        const token = jwt.sign({ email: result.email, id: result._id, name: result.lastname}, 'demo', { expiresIn: "24h"});
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ 
            message: error.message
        });
    }
}

const findUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message:error.message });
    }
}

const uploadProfileImage = async (req, res) => {
    res.status(200).json('Good');
    const fs = require('fs');
    fs.writeFileSync('/tmp/test-sync', 'Hey there!');
    res.status(200).json(req);
}

module.exports = { signin, signup, findUser, uploadProfileImage };