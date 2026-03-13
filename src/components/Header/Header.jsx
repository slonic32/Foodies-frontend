import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';

export default function Header({ onSignInClick, onSignUpClick }) {
    const { isLoggedIn, user } = useAuth();

    return (
        <header className={css.header}>
            <NavLink to="/" className={css.logo}>
                foodies
            </NavLink>

            <nav className={css.nav}>
                {isLoggedIn ? (
                    <NavLink to="/logout" className={css.userBtn}>
                        {user?.name || 'Profile'}
                    </NavLink>
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
