import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import css from './SignUpForm.module.css';
import { register as userRegister } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

const signUpValidationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required').min(7, 'Password must be at least 7 characters long'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

export default function SignUpForm() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(signUpValidationSchema),
    });

    const onSubmit = (data) => {
        const name = data.email.split('@')[0];
        const email = data.email;
        const password = data.password;
        dispatch(userRegister({ name, email, password }))
            .unwrap()
            .then(() => {
                toast.success('Sign up successful!', {
                    duration: 4000,
                });
                reset();
            })
            .catch((error) => {
                toast.error(error || 'Oops! Failed to sign up', { duration: 4000 });
            });
    };

    return (
        <div className={css.container}>
            <div className={css.section}>
                <h1 className={css.title}>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.field}>
                        <label className={css.email}>Email</label>
                        <input
                            className={errors.email ? css.errorInput : css.firstInput}
                            type="text"
                            placeholder="Enter your email"
                            {...register('email')}
                        />
                        {errors.email && <p className={css.error}>{errors.email.message}</p>}
                    </div>
                    <div className={css.field}>
                        <label className={css.password}>Password</label>
                        <div className={css.toggle}>
                            <input
                                className={errors.password ? css.errorIn : css.secondInput}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                {...register('password')}
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className={css.iconOne}>
                                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </div>
                        </div>
                        {errors.password && <p className={css.error}>{errors.password.message}</p>}
                    </div>
                    <div className={css.field}>
                        <label className={css.repeat}>Repeat Password</label>
                        <div className={css.toggle}>
                            <input
                                className={errors.repeatPassword ? css.errorIn : css.thirdInput}
                                type={showRepeatPassword ? 'text' : 'password'}
                                placeholder="Repeat password"
                                {...register('repeatPassword')}
                            />
                            <div onClick={() => setShowRepeatPassword(!showRepeatPassword)} className={css.iconTwo}>
                                {showRepeatPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </div>
                        </div>
                        {errors.repeatPassword && <p className={css.error}>{errors.repeatPassword.message}</p>}
                    </div>
                    <button type="submit" className={css.button}>
                        Sign Up
                    </button>
                    <p className={css.text}>
                        Already have an account?
                        <Link to="/signin" className={css.link}>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
