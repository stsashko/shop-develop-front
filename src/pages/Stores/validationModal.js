import * as yup from "yup";

const schema = yup.object().shape({
    store_name: yup.string().required()
});

export default schema;