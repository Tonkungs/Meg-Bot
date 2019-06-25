import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        password: Yup.string().required('Pass is required!'),
    }),
    mapPropsToValues: props => ({
        email: props.email || '',
        password: props.password || ''
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values
        };
        // console.log('payload', payload);
        //   console.log('setSubmitting',setSubmitting)
        setSubmitting(false);
        setTimeout(() => {

            // eslint-disable-next-line no-alert
            alert(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'MyForm',
});

const MyForm = props => {
    const {
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        //   setFieldValue,
        //   setFieldTouched,
        isSubmitting,
    } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input fluid
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {errors.email &&
                    touched.email && (
                        <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.email}</div>
                    )}
                <Form.Input fluid
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {errors.password &&
                    touched.password && (
                        <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.password}</div>
                    )}
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Button onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</Form.Button>
                <Form.Button type="submit" disabled={isSubmitting}>Submit</Form.Button>
            </Form.Group>
        </Form>
    );
};

MyForm.propTypes = {
    values: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    touched: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    // setFieldValue:PropTypes.func.isRequired,
    // setFieldTouched:PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    // selectedSubreddit: PropTypes.string.isRequired,
    // posts: PropTypes.array.isRequired,
    // isFetching: PropTypes.bool.isRequired,
    // lastUpdated: PropTypes.number,
};

export default formikEnhancer(MyForm);