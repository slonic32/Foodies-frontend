import { Link } from 'react-router-dom';
import css from './RecipeCard.module.css';
import recipe_1 from '../../assets/recipe_1.png';
import recipe_2 from '../../assets/recipe_2.png';

import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/favorites/favoritesOperations';
import { selectFavoriteItems } from '../../redux/favorites/favoritesSelectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';

// Fallback images for recipe cards
const FALLBACK_IMAGES = {
    recipe_1,
    recipe_2,
};

function getRandomFallbackImage() {
    const recipeNum = Math.random() > 0.5 ? 'recipe_1' : 'recipe_2';
    return FALLBACK_IMAGES[recipeNum];
}

function RecipeCard({ recipe, onOpenSignIn }) {
    const { id, title, thumb, preview, description, owner } = recipe;

    const recipeId = id;
    const ownerName = owner?.name || 'Anonymous';
    const ownerAvatar = owner?.avatar || null;
    const recipeImage = thumb || preview || getRandomFallbackImage();

    const dispatch = useDispatch();
    const favoriteItems = useSelector(selectFavoriteItems);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const isFavorite = favoriteItems.includes(recipe.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(deleteFavorite(recipe.id));
        } else {
            dispatch(addFavorite(recipe.id));
        }
    };

    const handleAuthorClick = () => {
        if (isLoggedIn) {
            navigate(`/user/${owner.id}`);
        } else {
            onOpenSignIn();
        }
    };

    return (
        <div className={css.card}>
            <div className={css.imageWrapper}>
                <img src={recipeImage} alt={title} className={css.image} />
            </div>
            <div className={css.content}>
                <h3 className={css.title}>{title}</h3>
                {description && <p className={css.description}>{description}</p>}
                <div className={css.footer}>
                    <div className={css.author} onClick={handleAuthorClick}>
                        <div className={css.avatarWrapper}>
                            {ownerAvatar ? (
                                <img src={ownerAvatar} alt={ownerName} className={css.avatar} />
                            ) : (
                                <span className={css.avatarPlaceholder}>{ownerName.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <span className={css.authorName}>{ownerName}</span>
                    </div>
                    <div className={css.actions}>
                        <button
                            className={`${css.iconButton} ${isFavorite ? css.iconButtonFavorite : ''}`}
                            disabled={!isLoggedIn}
                            aria-label={`Add ${title} to favorites`}
                            onClick={handleFavoriteToggle}
                        >
                            {!isFavorite && (
                                <svg
                                    width="16"
                                    height="14"
                                    viewBox="0 0 16 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.5112 1.72445C13.1707 1.38379 12.7665 1.11355 12.3215 0.929175C11.8765 0.7448 11.3996 0.649902 10.9179 0.649902C10.4363 0.649902 9.95932 0.7448 9.51435 0.929175C9.06937 1.11355 8.66509 1.38379 8.32458 1.72445L7.61792 2.43112L6.91125 1.72445C6.22346 1.03666 5.29061 0.650259 4.31792 0.650259C3.34523 0.650259 2.41238 1.03666 1.72458 1.72445C1.03679 2.41225 0.650391 3.3451 0.650391 4.31779C0.650391 5.29047 1.03679 6.22332 1.72458 6.91112L2.43125 7.61779L7.61792 12.8045L12.8046 7.61779L13.5112 6.91112C13.8519 6.57062 14.1222 6.16633 14.3065 5.72136C14.4909 5.27638 14.5858 4.79944 14.5858 4.31779C14.5858 3.83613 14.4909 3.35919 14.3065 2.91422C14.1222 2.46924 13.8519 2.06496 13.5112 1.72445Z"
                                        stroke="#050505"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                            {isFavorite && (
                                <svg
                                    width="16"
                                    height="14"
                                    viewBox="0 0 16 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.5112 1.72445C13.1707 1.38379 12.7665 1.11355 12.3215 0.929175C11.8765 0.7448 11.3996 0.649902 10.9179 0.649902C10.4363 0.649902 9.95932 0.7448 9.51435 0.929175C9.06937 1.11355 8.66509 1.38379 8.32458 1.72445L7.61792 2.43112L6.91125 1.72445C6.22346 1.03666 5.29061 0.650259 4.31792 0.650259C3.34523 0.650259 2.41238 1.03666 1.72458 1.72445C1.03679 2.41225 0.650391 3.3451 0.650391 4.31779C0.650391 5.29047 1.03679 6.22332 1.72458 6.91112L2.43125 7.61779L7.61792 12.8045L12.8046 7.61779L13.5112 6.91112C13.8519 6.57062 14.1222 6.16633 14.3065 5.72136C14.4909 5.27638 14.5858 4.79944 14.5858 4.31779C14.5858 3.83613 14.4909 3.35919 14.3065 2.91422C14.1222 2.46924 13.8519 2.06496 13.5112 1.72445Z"
                                        stroke="white"
                                        fill="#050505"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                        <Link
                            to={`/recipe/${recipeId}`}
                            className={css.iconButton}
                            aria-label={`View recipe for ${title}`}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.66699 11.3334L11.3337 4.66675"
                                    stroke="#050505"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.66699 4.66675H11.3337V11.3334"
                                    stroke="#050505"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
