import RecipeCard from '../RecipeCard/RecipeCard';
import Loader from '../Loader/Loader';
import css from './RecipeList.module.css';

import { fetchUserFavorites } from '../../redux/favorites/favoritesOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useEffect } from 'react';

function RecipeList({ recipes, isLoading, error, onOpenSignIn }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserFavorites());
        }
    }, [isLoggedIn, dispatch]);

    if (isLoading) {
        return <Loader />;
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
                    <RecipeCard recipe={recipe} onOpenSignIn={onOpenSignIn} />
                </li>
            ))}
        </ul>
    );
}

export default RecipeList;
