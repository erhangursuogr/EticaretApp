const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const secretKey = 'MySecretKey1234567890MySecretKey';

router.post('/register', async (req, res) => {    
    try {
        const user = new User(req.body);
        user._id = uuidv4();
        user.isAdmin = false;
        user.createdDate = new Date();
        const checkEmailUser = await User.findOne({ email: user.email });
        if (checkEmailUser != null) {
            res.status(400).json({ message: 'Bu e-posta adresi ile daha önce kayıt olunmuş.' });
            return;
        }else{
            const newUser = await user.save();
            const token = jwt.sign({}, secretKey, { expiresIn: '1d' });
            let model = {token: token, user: newUser};
            res.json(model);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (user == null) {
            res.status(400).json({ message: 'Kullanıcı Bulunamadı!!!' });
            return;
        }else{
            if (user.password != password) {
                res.status(400).json({ message: 'Şifre Hatalı!!!' });
                return;
            }else{
                const token = jwt.sign({}, secretKey, { expiresIn: '1d' });
                let model = {token: token, user: user};
                res.json(model);
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;