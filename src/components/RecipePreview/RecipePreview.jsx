import { Link } from 'react-router-dom';
import css from './RecipePreview.module.css';

import defaultRecipeImage from '../../assets/recipe_1.png';
import { BACKEND_HOST } from '../../config/backend';

function getRecipeImage(imagePath) {
    if (!imagePath) return defaultRecipeImage;
    if (imagePath.startsWith('http')) return imagePath;

    const normalized = imagePath.replace(/\\/g, '/');

    return normalized.startsWith('/') ? `${BACKEND_HOST}${normalized}` : `${BACKEND_HOST}/${normalized}`;
}

function getRecipeId(recipe) {
    return recipe?.id || recipe?._id || recipe?.recipeId || '';
}

export default function RecipePreview({
    recipe,
    tab = 'recipes',
    onDelete,
    isDeleting = false,
    hideDeleteButton = false,
}) {
    const recipeId = getRecipeId(recipe);

    const title = recipe?.title || 'Untitled recipe';
    const description = recipe?.description || 'No description yet.';
    const image = getRecipeImage(recipe?.thumb || recipe?.preview || recipe?.image || recipe?.photo || '');

    const handleDelete = () => {
        if (!recipeId || isDeleting) return;
        onDelete?.(recipe, tab);
    };

    return (
        <li className={css.item}>
            <article className={css.card}>
                <img className={css.image} src={image} alt={title} />

                <div className={css.content}>
                    <h3 className={css.title}>{title}</h3>
                    <p className={css.description}>{description}</p>
                </div>

                <div className={css.actions}>
                    {!hideDeleteButton && (
                        <button
                            type="button"
                            className={css.iconBtn}
                            onClick={handleDelete}
                            disabled={isDeleting}
                            aria-label={tab === 'favorites' ? `Remove ${title} from favorites` : `Delete ${title}`}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.66699 4H13.3337"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.66699 7V11"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.33301 7V11"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3.33301 4L3.99967 12.6667C4.05128 13.338 4.6111 13.8572 5.28434 13.8572H10.7153C11.3886 13.8572 11.9484 13.338 12 12.6667L12.6663 4"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 4V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}

                    <Link
                        to={recipeId ? `/recipe/${recipeId}` : '#'}
                        className={css.iconBtn}
                        aria-label={`Open recipe ${title}`}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.66699 11.3333L11.3337 4.66667"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.66699 4.66667H11.3337V11.3333"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </article>
        </li>
    );
}
