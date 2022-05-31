import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6),
    file: yup.mixed().test('required', 'avatar is a required field', file => file.length > 0).test("fileType", "Unsupported file format [jpg, png]", (file) => {
        if(file.length > 0)
            return ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type);
    })
});

export default schema;
