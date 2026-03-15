import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';

export default function Header({ onSignInClick, onSignUpClick, onLogOutClick }) {
    const { isLoggedIn, user } = useAuth();

    return (
        <header className={css.header}>
            <NavLink to="/" className={css.logo}>
                foodies
            </NavLink>

            <nav className={css.nav}>
                {isLoggedIn ? (
                    <button
                        type="button"
                        className={css.userBtn}
                        onClick={onLogOutClick}
                    >
                        {user?.name || 'Profile'}
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className={css.signInBtn}
                            onClick={onSignInClick}
                        >
                            SIGN IN
                        </button>
                        <button
                            type="button"
                            className={css.signUpBtn}
                            onClick={onSignUpClick}
                        >
                            SIGN UP
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
