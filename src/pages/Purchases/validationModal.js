import * as yup from "yup";

const schema = yup.object().shape({
    customer_id: yup.number().integer().required(),
    store_id: yup.number().integer().required(),
    purchase_date: yup.date().required(),
});

export default schema;
