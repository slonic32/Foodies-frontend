import { BACKEND_HOST } from '../../config/backend';
import ingredientPlaceholder from '../../assets/recipe_1.png';
import css from './RecipeIngredients.module.css';

function RecipeIngredients({ ingredients }) {
    if (!ingredients?.length) return null;

    return (
        <section className={css.section}>
            <h2 className={css.title}>Ingredients</h2>
            <ul className={css.list}>
                {ingredients.map((ingredient) => {
                    const measure = ingredient.RecipeIngredient?.measure;
                    const imgSrc = ingredient.img
                        ? ingredient.img.startsWith('http')
                            ? ingredient.img
                            : `${BACKEND_HOST}/${ingredient.img}`
                        : ingredientPlaceholder;

                    return (
                        <li key={ingredient.id} className={css.item}>
                            <img src={imgSrc} alt={ingredient.name} className={css.image} />
                            <div className={css.info}>
                                <span className={css.name}>{ingredient.name}</span>
                                {measure && <span className={css.measure}>{measure}</span>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default RecipeIngredients;
