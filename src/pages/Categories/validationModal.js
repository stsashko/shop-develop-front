import * as yup from "yup";

const schema = yup.object().shape({
    category_name: yup.string().required()
});

export default schema;