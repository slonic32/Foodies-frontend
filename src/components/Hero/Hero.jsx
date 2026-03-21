import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import css from './Hero.module.css';

import heroMain from '../../assets/hero-main.png';
import heroSecondary from '../../assets/hero-secondary.png';

export default function Hero({ onAddRecipeClick }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleAddRecipe = () => {
        if (isLoggedIn) {
            navigate('/recipe/add');
            return;
        }

        onAddRecipeClick?.();
    };

    return (
        <section className={css.hero}>
            <div className={css.content}>
                <h1 className={css.title}>
                    improve your
                    <br />
                    culinary talents
                </h1>

                <p className={css.subtitle}>
                    Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of
                    various cuisines.
                </p>

                <button type="button" className={css.addRecipeBtn} onClick={handleAddRecipe}>
                    add recipe 
                </button>
            </div>

            <div className={css.imagesBlock}>
                <img src={heroSecondary} alt="Dessert dish" className={css.imgSecondary} />

                <img src={heroMain} alt="Prepared meat dish" className={css.imgMain} />
            </div>
        </section>
    );
}
