import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';

function RecipeList({ recipes, isLoading, error }) {
    if (isLoading) {
        return <div className={css.loading}>Loading recipes...</div>;
    }

    if (error) {
        return <div className={css.error}>Error loading recipes: {error}</div>;
    }

    if (!recipes || recipes.length === 0) {
        return <div className={css.empty}>No recipes found</div>;
    }

    return (
        <ul className={css.list}>
            {recipes.map((recipe) => (
                <li key={recipe.id || recipe._id} className={css.item}>
                    <RecipeCard recipe={recipe} />
                </li>
            ))}
        </ul>
    );
}

export default RecipeList;