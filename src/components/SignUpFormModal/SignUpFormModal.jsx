import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { register as userRegister, login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './SignUpFormModal.module.css';

const schema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(32, 'Name must be at most 32 characters')
        .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(7, 'Password must be at least 7 characters')
        .required('Password is required'),
});

export default function SignUpFormModal({ onClose, onSignIn }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={css.wrapper}>
            <h2 className={css.title}>SIGN UP</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={schema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await dispatch(
                            userRegister({
                                name: values.name.trim(),
                                email: values.email.trim(),
                                password: values.password,
                            })
                        ).unwrap();

                        await dispatch(
                            login({
                                email: values.email.trim(),
                                password: values.password,
                            })
                        ).unwrap();

                        toast.success('Account created successfully!', { duration: 3000 });
                        onClose?.();
                    } catch (error) {
                        toast.error(error || 'Oops! Failed to create account', { duration: 4000 });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, submitCount, isSubmitting, values }) => {
                    const isFilled =
                        values.name.trim() &&
                        values.email.trim() &&
                        values.password.trim();

                    return (
                        <Form className={css.form} noValidate>
                            <div className={css.fieldWrap}>
                                <label htmlFor="signup-name" className={css.srOnly}>
                                    Name
                                </label>
                                <Field
                                    id="signup-name"
                                    name="name"
                                    type="text"
                                    className={submitCount > 0 && errors.name ? `${css.input} ${css.inputError}` : css.input}
                                    placeholder="Name*"
                                />
                                {submitCount > 0 && errors.name && <p className={css.error}>{errors.name}</p>}
                            </div>

                            <div className={css.fieldWrap}>
                                <label htmlFor="signup-email" className={css.srOnly}>
                                    Email
                                </label>
                                <Field
                                    id="signup-email"
                                    name="email"
                                    type="email"
                                    className={submitCount > 0 && errors.email ? `${css.input} ${css.inputError}` : css.input}
                                    placeholder="Email*"
                                />
                                {submitCount > 0 && errors.email && <p className={css.error}>{errors.email}</p>}
                            </div>

                            <div className={`${css.fieldWrap} ${css.passwordField}`}>
                                <label htmlFor="signup-password" className={css.srOnly}>
                                    Password
                                </label>
                                <Field
                                    id="signup-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={submitCount > 0 && errors.password ? `${css.input} ${css.inputError}` : css.input}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className={css.eyeBtn}
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                    tabIndex={-1}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <FiEye size={24} /> : <FiEyeOff size={24} />}
                                </button>
                                {submitCount > 0 && errors.password && <p className={css.error}>{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                className={css.submitBtn}
                                disabled={!isFilled || isSubmitting}
                            >
                                CREATE
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            <p className={css.metaText}>
                I already have an account?
                <button
                    type="button"
                    className={css.switchBtn}
                    onClick={onSignIn}
                >
                    Sign in
                </button>
            </p>
        </div>
    );
}
