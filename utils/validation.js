import {body} from 'express-validator';

export const forgotpasswordValidation=[
    body("Email","Email is required").not().isEmpty(),
];

export const resetPasswordValidation=[

    body("Password","Password is required").not().isEmpty(),
    body("Password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    body("confirmPassword","confirmPassword is required ").not().isEmpty()
];
export const otpValidation=[

    body("otp","otp is required").not().isEmpty()
];

export const signUpValidation=[
    body("Name","Name is required").not().isEmpty(),
    body("Email","Email is required").not().isEmpty(),
    body("Email","Invalid email").isEmail(),
    body("Password","password is required").not().isEmpty(),
    body("Password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    body("Address","Address is required").not().isEmpty(),
    body("PhoneNumber","PhoneNumber is required").not().isEmpty(),
  //  body("confirmpassword","confirmPassword  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
];

export const signInValidation=[
    
    body("Email","Email is required").not().isEmpty(),
    body("Email","Invalid email").isEmail(),
    body("Password","Password is required").not().isEmpty(),
    body("Password","Invalid password").isStrongPassword()
];
export const addnewMessageValidation = [
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("message", "message is required").not().isEmpty()
]
