import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './SignInFormModal.module.css';

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
});

export default function SignInFormModal({ onClose }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        dispatch(login(data))
            .unwrap()
            .then(() => {
                toast.success('Welcome back!', { duration: 2000 });
                onClose?.();
            })
            .catch((error) => {
                toast.error(error || 'Incorrect email or password', { duration: 4000 });
            });
    };

    return (
        <div className={css.wrapper}>
            <h2 className={css.title}>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
                <div className={css.field}>
                    <label className={css.label}>Email</label>
                    <input
                        className={errors.email ? `${css.input} ${css.inputError}` : css.input}
                        type="email"
                        placeholder="Enter your email"
                        {...register('email')}
                    />
                    {errors.email && <p className={css.error}>{errors.email.message}</p>}
                </div>

                <div className={css.field}>
                    <label className={css.label}>Password</label>
                    <div className={css.passwordWrap}>
                        <input
                            className={errors.password ? `${css.input} ${css.inputError}` : css.input}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...register('password')}
                        />
                        <button
                            type="button"
                            className={css.eyeBtn}
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className={css.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={css.submitBtn}>
                    Sign In
                </button>
            </form>
        </div>
    );
}
