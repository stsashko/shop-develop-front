// https://github.com/jquense/yup
// number().label('age').positive().integer(),

import * as yup from "yup";

const schema = yup.object().shape({
    product_name: yup.string().required(),
    category_id: yup.string().required(),
    manufacturer_id: yup.string().required(),
    price: yup.number().min(1).required(),
    image: yup.mixed().test("fileType", "Unsupported file format [jpg, png]", (file) => {
        if(file.length > 0)
            return ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type);
        else
            return true;
    })
});

export default schema;
