import { useSelector } from 'react-redux';
import { selectPopularRecipes } from '../../redux/recipes/selectors';
import RecipeCard from '../RecipeCard/RecipeCard';
import css from './PopularRecipes.module.css';

function PopularRecipes() {
    const popularRecipes = useSelector(selectPopularRecipes);

    if (!popularRecipes?.length) return null;

    return (
        <section className={css.section}>
            <h2 className={css.title}>Popular recipes</h2>
            <ul className={css.list}>
                {popularRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeCard
                            recipe={{
                                id: recipe.id,
                                strMeal: recipe.title,
                                strMealThumb: recipe.thumb,
                                strInstructions: recipe.description || recipe.instructions,
                                owner: recipe.owner,
                            }}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default PopularRecipes;
