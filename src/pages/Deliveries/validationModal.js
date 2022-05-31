// https://github.com/jquense/yup
// number().label('age').positive().integer(),

import * as yup from "yup";

const schema = yup.object().shape({
    product_id: yup.number().integer().required(),
    store_id: yup.number().integer().required(),
    delivery_date: yup.date().required(),
    product_count: yup.number().integer().required().min(1),
});

export default schema;
