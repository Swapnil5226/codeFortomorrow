import { check } from "express-validator"

const validate = (method: string) => {
    switch (method) {
        case 'login': {
            return [
                check('email').not().isEmpty().withMessage('The email field is required.'),
                check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            ]
        }
        case 'register': {
            return [
                check('email').not().isEmpty().withMessage('Email field is required'),
                check('email').isEmail().withMessage('Email is invalid format'),
                check('first_name').not().isEmpty().withMessage('The first_name field is required.'),
                check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            ]
        }

    }
}

export default validate