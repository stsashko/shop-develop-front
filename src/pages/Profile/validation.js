import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
});

export default schema;