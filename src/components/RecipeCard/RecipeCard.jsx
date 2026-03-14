import { Link } from 'react-router-dom';
import css from './RecipeCard.module.css';

function RecipeCard({ recipe }) {
    const { id, _id, strMeal, strMealThumb, strCategory } = recipe;

    const recipeId = id || _id;

    return (
        <div className={css.card}>
            <div className={css.imageWrapper}>
                <img src={strMealThumb} alt={strMeal} className={css.image} />
            </div>
            <div className={css.content}>
                <h3 className={css.title}>{strMeal}</h3>
                {strCategory && <p className={css.category}>{strCategory}</p>}
                <Link to={`/recipe/${recipeId}`} className={css.link}>
                    <button className={css.button} aria-label={`View recipe for ${strMeal}`}>
                        See recipe
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default RecipeCard;