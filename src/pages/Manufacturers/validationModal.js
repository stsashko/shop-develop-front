import * as yup from "yup";

const schema = yup.object().shape({
    manufacturer_name: yup.string().required()
});

export default schema;
