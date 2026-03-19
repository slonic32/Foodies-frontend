import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/favorites/favoritesOperations';
import { selectFavoriteItems } from '../../redux/favorites/favoritesSelectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './RecipePreparation.module.css';

function RecipePreparation({ recipe }) {
    const dispatch = useDispatch();
    const favoriteItems = useSelector(selectFavoriteItems);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const isFavorite = favoriteItems.includes(recipe.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(deleteFavorite(recipe.id));
        } else {
            dispatch(addFavorite(recipe.id));
        }
    };

    return (
        <section className={css.section}>
            <h2 className={css.title}>Recipe Preparation</h2>
            <div className={css.instructions}>
                {recipe.instructions.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                ))}
            </div>
            {isLoggedIn && (
                <button
                    type="button"
                    className={`${css.favoriteBtn} ${isFavorite ? css.active : ''}`}
                    onClick={handleFavoriteToggle}
                >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </button>
            )}
        </section>
    );
}

export default RecipePreparation;
