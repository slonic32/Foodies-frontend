import { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
import Navigation from '../Navigation/Navigation';
import UserBar from '../UserBar/UserBar';
import BurgerButton from '../BurgerButton/BurgerButton';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Header({ onSignInClick, onSignUpClick, onLogOutClick }) {
    // const { isLoggedIn, user } = useAuth();
    const isLoggedIn = true;
    const user = {
        _id: '123',
        name: 'Victoria',
        email: 'test@example.com',
        avatar: '',
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={css.header}>
            <div className={css.container}>
                <div className={css.logo}>
                    <Logo variant="light" />
                </div>

                {!isLoggedIn ? (
                    <div className={css.actions}>
                        <AuthBar onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
                    </div>
                ) : (
                    <>
                        <div className={css.nav}>
                            <div className={css.desktopNav}>
                                <Navigation />
                            </div>
                        </div>

                        <div className={css.actions}>
                            <div className={css.mobileActions}>
                                <UserBar user={user} onLogOutClick={onLogOutClick} />

                                <div className={css.burgerWrapper}>
                                    <BurgerButton onOpen={() => setIsMenuOpen(true)} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {isLoggedIn && isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
        </header>
    );
}