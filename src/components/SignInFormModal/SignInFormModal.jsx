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
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function SignInFormModal({ onClose, onCreateAccount }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

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
            <h2 className={css.title}>SIGN IN</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
                <div className={css.fieldWrap}>
                    <input
                        className={errors.email ? `${css.input} ${css.inputError}` : css.input}
                        type="email"
                        placeholder="Email*"
                        {...register('email')}
                    />
                    {errors.email && <p className={css.error}>{errors.email.message}</p>}
                </div>

                <div className={css.fieldWrap}>
                    <input
                        className={errors.password ? `${css.input} ${css.inputError}` : css.input}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        className={css.eyeBtn}
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <FiEye size={24} /> : <FiEyeOff size={24} />}
                    </button>
                    {errors.password && <p className={css.error}>{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className={css.submitBtn}
                    disabled={!isValid || isSubmitting}
                >
                    SIGN IN
                </button>
            </form>
            <p className={css.metaText}>
                Don&apos;t have an account?
                <button
                    type="button"
                    className={css.switchBtn}
                    onClick={onCreateAccount}
                >
                    Create an account
                </button>
            </p>
        </div>
    );
}
