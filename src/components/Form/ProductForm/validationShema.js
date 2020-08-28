import { string, object } from 'yup';

const SignupSchema = object().shape({
    title: string()
        .min(3, 'Min length 3 characters!')
        .max(20, 'Max length 20 characters!')
        .required('This field is required!'),
    description: string()
        .min(3, 'Min length 3 characters!')
        .max(200, 'Max length 200 characters!')
        .required('This field is required!'),
    category: string()
        .required('This field is required!'),
    price: string()
        .matches(/^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/, {
            message: 'The value must be a number!',
            excludeEmptyString: true
        })
        .required('This field is required!')
});

export default SignupSchema;
