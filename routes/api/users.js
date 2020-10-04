const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler, handleValidationErrors } = require('../utils/utils');

const { Op } = require('sequelize');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { getUserToken, requireAuth } = require('../../auth');

// const jwt = require('jsonwebtoken');
// const { expiresIn } = require('../../config').jwtConfig;
const expiresIn = process.env.JWT_EXPIRES_IN;

const { userCreationValidators, loginValidators } = require('../utils/userValidators');
const { validationResult, check } = require('express-validator');

// router.use(requireAuth);



/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/token', asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email }
    });
    if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        const err = new Error('Invalid username/password combination');
        err.status = 401;
        err.title = "Unauthorized";
        throw err;
    }
    const token = await getUserToken(user);
    console.log("Token:", token);
    res.cookie('token', token, { maxAge: process.env.JWT_EXPIRES_IN * 1000 });
    res.json({ id: user.id, token });

}))

router.get('/sign-up', csrfProtection, (req, res) => {
    res.render('sign-up', { csrfToken: req.csrfToken() });
});

router.post(
    '/signup',
    // userCreationValidators,
    // handleValidationErrors, // temporarily REMOVED csrfProtection
    asyncHandler(async (req, res, next) => {
        // res.status(401).json({ errors: ["NOPE"] })
        console.log('signing up...')
        const { firstName, email, password, confirmPassword, leaning } = req.body;

        console.log(firstName, email, password, confirmPassword, leaning);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            firstName,
            lastName,
            hashedPassword,
            leaning
        });
        const token = await getUserToken(user);
        res.cookie('token', token, { maxAge: expiresIn * 1000 });
        res.json({ id: user.id, token });
    })
);

router.put(
    '/login',
    loginValidators,
    asyncHandler(async (req, res) => {
        if (!req.user) {
            const token = await getUserToken(user);
            res.cookie('token', token, { maxAge: expiresIn * 1000 });
        }

        res.redirect('/');
    })
);

router.post(
    '/login',
    loginValidators,
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        let errors = [];
        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            // Attempt to get the user by their email address.
            const user = await User.findOne({ where: { email: email } });
            console.log(user)

            const token = await getUserToken(user);
            res.cookie('token', token);
            res.json({ id: user.id, email: user.email });
            // if (user !== null) {
            //     // If the user exists then compare their password
            //     // to the provided password.
            //     const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

            //     if (passwordMatch) {
            //         // loginUser(req, res, user);
            //         res.render('home', { firstName: user.firstName });
            //     }
            // }
            // errors.push('Login failed for the provided email address and password');
        } else {
            errors = validatorErrors.array().map(error => error.msg);
            console.log('Error: password incorrect');
        }
    })
);




router.delete('/', asyncHandler(async (req, res) => {
    req.body.user = null;
    // await req.player.save();
    res.clearCookie('token');
    res.json({ message: 'user logged out' });
}));

router.get('/get', asyncHandler(async (req, res) => {
    const id = req.user.id;
    res.json(id);
}))


module.exports = router;
