import css from './AuthBar.module.css';

export default function AuthBar({ onSignInClick, onSignUpClick }) {
    return (
        <div className={css.authBar}>
            <button type="button" className={css.signInBtn} onClick={onSignInClick}>
                sign in
            </button>

            <button type="button" className={css.signUpBtn} onClick={onSignUpClick}>
                sign up
            </button>
        </div>
    );
}