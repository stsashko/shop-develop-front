// https://github.com/jquense/yup
// number().label('age').positive().integer(),

import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    // password: yup.string().min(6).required(),
    password: yup.string().test(
        'empty-or-6',
        'Password must be at least 6 characters',
        password => !password || password.length >= 6,
    ),
    role: yup.number().min(0).max(1).required(),
    avatar: yup.mixed().test("fileType", "Unsupported file format [jpg, png]", (file) => {
        if(file.length > 0)
            return ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type);
        else
            return true;
    })
});

export default schema;
