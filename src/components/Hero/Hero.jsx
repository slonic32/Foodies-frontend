import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import heroMain from '../../assets/hero-main.png';
import heroSecondary from '../../assets/hero-secondary.png';
import css from './Hero.module.css';

function Hero({ onAddRecipeClick }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

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
                    src={heroSecondary}
                    alt="Delicious dessert"
                    className={css.imgSecondary}
                    loading="lazy"
                />
                <img
                    src={heroMain}
                    alt="Beef Wellington"
                    className={css.imgMain}
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export default Hero;
