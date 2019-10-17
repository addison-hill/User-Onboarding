import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <label className="check-box-container">
                    Terms of Service
                    <Field 
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit!</button>
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name required"),
        email: Yup.string().required("Email required"),
        password: Yup.string().required("Password required")
    }),

    handleSubmit(values, {setStatus }) {
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(err => console.log(err.res));
    }
})(UserForm);
console.log("This is the HOC", FormikUserForm);
    
export default FormikUserForm