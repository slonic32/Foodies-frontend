import { useState } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import SignInModal from '../../components/SignInModal/SignInModal';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoryList from '../../components/CategoryList/CategoryList';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import css from './HomePage.module.css';

import { showNotification } from '../../utils/notification.jsx';

import { logout } from '../../redux/auth/operations.js';

import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const [isLogOutOpen, setIsLogOutOpen] = useState(false);

    const openSignInModal = () => {
        setIsLogOutOpen(false);
        setIsSignUpOpen(false);
        setIsSignInOpen(true);
    };

    const openSignUpModal = () => {
        setIsLogOutOpen(false);
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
    };

    const openLogOutModal = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(false);
        setIsLogOutOpen(true);
    };

    const closeSignInModal = () => setIsSignInOpen(false);
    const closeSignUpModal = () => setIsSignUpOpen(false);
    const closeLogOutModal = () => setIsLogOutOpen(false);

    const dispatch = useDispatch();

    const handleConfirmLogout = async () => {
        try {
            await dispatch(logout()).unwrap();

            showNotification('You have been logged out successfully!', 'success');
        } catch (error) {
            showNotification('Failed to log out. Please try again.', 'error');
            console.error('Logout operation failed:', error);
        }

        closeLogOutModal();

        if (typeof window !== 'undefined') {
            // Reload the page to ensure UI reflects logged-out state.
            window.location.reload();
        }
    };

    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className={css.page}>
            {/* ── Black hero block ────────────────────────── */}
            <div className={css.heroBlock}>
                <Header
                    onSignInClick={openSignInModal}
                    onSignUpClick={openSignUpModal}
                    onLogOutClick={openLogOutModal}
                />
                <Hero onAddRecipeClick={openSignInModal} />
            </div>

            {/* ── Categories or Recipes section ──────────────────────── */}
            <section className={css.categoriesSection}>
                <div className={css.container}>
                    {!selectedCategory ? (
                        <>
                            <MainTitle>Categories</MainTitle>
                            <Subtitle className={css.categoriesSubtitle}>
                                Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
                                combine taste, style and the warm atmosphere of the kitchen.
                            </Subtitle>
                            <CategoryList onSelectCategory={setSelectedCategory} />
                        </>
                    ) : (
                        <Recipes category={selectedCategory} onBack={() => setSelectedCategory(null)} />
                    )}
                </div>
            </section>

            {/* ── Testimonials section ────────────────────── */}
            {/* {!selectedCategory && <Testimonials />} */}
            <Testimonials />

            {/* ── Footer ──────────────────────────────────── */}
            <Footer />

            {/* ── Modals ──────────────────────────────────── */}
            {isSignInOpen && <SignInModal onClose={closeSignInModal} onCreateAccount={openSignUpModal} />}
            {isSignUpOpen && <SignUpModal onClose={closeSignUpModal} onSignIn={openSignInModal} />}
            {isLogOutOpen && <LogOutModal onClose={closeLogOutModal} onConfirm={handleConfirmLogout} />}
        </div>
    );
}

export default HomePage;
