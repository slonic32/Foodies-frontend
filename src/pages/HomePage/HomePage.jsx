import { useState } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import SignInModal from '../../components/SignInModal/SignInModal';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoryList from '../../components/CategoryList/CategoryList';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import css from './HomePage.module.css';

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

            {/* ── Categories section ──────────────────────── */}
            <section className={css.categoriesSection}>
                <MainTitle>Categories</MainTitle>
                <Subtitle className={css.categoriesSubtitle}>
                    Discover a limitless world of culinary possibilities and enjoy exquisite recipes
                    that combine taste, style and the warm atmosphere of the kitchen.
                </Subtitle>
                <CategoryList />
            </section>

            {/* ── Testimonials section ────────────────────── */}
            <Testimonials />

            {/* ── Footer ──────────────────────────────────── */}
            <Footer />

            {/* ── Modals ──────────────────────────────────── */}
            {isSignInOpen && (
                <SignInModal
                    onClose={closeSignInModal}
                    onCreateAccount={openSignUpModal}
                />
            )}
            {isSignUpOpen && (
                <SignUpModal
                    onClose={closeSignUpModal}
                    onSignIn={openSignInModal}
                />
            )}
            {isLogOutOpen && (
                <LogOutModal onClose={closeLogOutModal} />
            )}
        </div>
    );
}

export default HomePage;
