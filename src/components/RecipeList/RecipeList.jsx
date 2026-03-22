import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';

import { fetchUserFavorites } from '../../redux/favorites/favoritesOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useEffect } from 'react';

function RecipeList({ recipes, isLoading, error }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserFavorites());
        }
    }, [isLoggedIn, dispatch]);

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
