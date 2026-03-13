import { useState } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import SignInModal from '../../components/SignInModal/SignInModal';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoryList from '../../components/CategoryList/CategoryList';
import css from './HomePage.module.css';

function HomePage() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    return (
        <div className={css.page}>
            {/* ── Black hero block ────────────────────────── */}
            <div className={css.heroBlock}>
                <Header
                    onSignInClick={() => setIsSignInOpen(true)}
                    onSignUpClick={() => setIsSignUpOpen(true)}
                />
                <Hero onAddRecipeClick={() => setIsSignInOpen(true)} />
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

            {/* ── Modals ──────────────────────────────────── */}
            {isSignInOpen && (
                <SignInModal onClose={() => setIsSignInOpen(false)} />
            )}
            {isSignUpOpen && (
                <SignInModal onClose={() => setIsSignUpOpen(false)} />
            )}
        </div>
    );
}

export default HomePage;
