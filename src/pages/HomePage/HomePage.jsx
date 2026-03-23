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

    function LogOutModal({ onClose }) {
        const handleCancel = () => {
            if (onClose) {
                onClose();
            }
        };

        return (
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '320px',
                        width: '100%',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>Log out</h2>
                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#555' }}>
                        Are you sure you want to log out?
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '8px',
                        }}
                    >
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirmLogout}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#e74c3c',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
            {isLogOutOpen && <LogOutModal onClose={closeLogOutModal} />}
        </div>
    );
}

export default HomePage;
