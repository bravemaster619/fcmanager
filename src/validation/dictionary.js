export const validationDictionary = {
    nickname: {
        presence: {
            allowEmpty: false,
            message: "^Nickname is required"
        },
        length: {
            minimum: 3,
            maximum: 20,
            message: "Input between 3 and 20 characters"
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: "^Password is required"
        },
        length: {
            minimum: 6,
            message: "^You must enter at least 6 characters"
        },
    },
    confirmPassword: {
        equality: "password",
        message: "^Confirm password required"
    },
    role: {
        presence: {
            allowEmpty: false,
            message: "^This is required"
        },
    }
}