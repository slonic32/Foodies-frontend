import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import heroMain from '../../assets/hero-main.png';
import heroSecondary from '../../assets/hero-secondary.png';
import recipe1 from '../../assets/recipe_1.png';
import recipe2 from '../../assets/recipe_2.png';
import css from './Hero.module.css';

const mainImages = [heroMain, recipe1];
const secondaryImages = [heroSecondary, recipe2];

function Hero({ onAddRecipeClick }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [imgMain] = useState(
        () => mainImages[Math.floor(Math.random() * mainImages.length)]
    );
    const [imgSecondary] = useState(
        () => secondaryImages[Math.floor(Math.random() * secondaryImages.length)]
    );

    const handleAddRecipe = () => {
        if (isLoggedIn) {
            navigate('/add');
        } else {
            onAddRecipeClick();
        }
    };

    return (
        <section className={css.hero}>
            <div className={css.content}>
                <h1 className={css.title}>
                    Improve Your<br />Culinary Talents
                </h1>
                <p className={css.subtitle}>
                    Amazing recipes for beginners in the world of cooking,
                    enveloping you in the aromas and tastes of various cuisines.
                </p>
                <button
                    type="button"
                    className={css.addRecipeBtn}
                    onClick={handleAddRecipe}
                >
                    ADD RECIPE
                </button>
            </div>

            <div className={css.imagesBlock}>
                <img
                    src={imgSecondary}
                    alt="Delicious dessert"
                    className={css.imgSecondary}
                    loading="lazy"
                />
                <img
                    src={imgMain}
                    alt="Beef Wellington"
                    className={css.imgMain}
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export default Hero;
