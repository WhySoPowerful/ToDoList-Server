const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user) {
            return res
                .status(401)
                .send({ error: 'Invalid username or password' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
