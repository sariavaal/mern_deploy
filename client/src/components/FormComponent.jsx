import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const UserForm = ({formType}) => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email address"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"  
          ),
          ...(formType === 'registro' && {
            firstName: Yup.string()
            .required("First name is required")
            .min(3, "First name must be at least 3 characters"),
          lastName: Yup.string()
            .required("Last name is required")
            .min(3, "Last name must be at least 3 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),

    });

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        console.log('formType',formType);
        if (formType === "registro") {
            registerUser(values, setErrors);
        } else {
            loginUser(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    };

    const registerUser = async (values, setErrors) => {
        try {
            await axios.post("http://localhost:8000/api/user/register", values,
            { withCredentials: true });
            loginUser(values, setErrors);
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({general: err.response.data.msg});
        }
    };

    const loginUser = async (values, setErrors) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/login", values,
            { withCredentials: true });
            console.log(response.data);
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/pirate/new");
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({general: err.response.data.msg});
        }
    };


    return (
        <Formik
        initialValues={
            formType === "register"
                ? {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
                : {
                    email: "",
                    password: ""
                }
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => (
            <Form>
                {formType === "register" && (
                    <>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                type="text"
                                name="firstName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                type="text"
                                name="lastName"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                        type="email"
                        name="email"
                        className="form-control"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        Submit    {formType}
                    </button>
                </div>
                <div className="form-group">
                    <ErrorMessage
                        name="general"
                        component="div"
                        className="alert alert-danger"
                    />
                </div>
            </Form>
        )}
    </Formik>

    );

}
UserForm.propTypes = {
    formType: PropTypes.string.isRequired
}
export default UserForm;


