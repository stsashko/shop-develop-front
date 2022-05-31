import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    // password: yup.string().min(6),
});

export default schema;
