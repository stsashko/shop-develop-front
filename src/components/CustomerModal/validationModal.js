import * as yup from "yup";

const schema = yup.object().shape({
    customer_fname: yup.string().required(),
    customer_lname: yup.string().required(),
});

export default schema;