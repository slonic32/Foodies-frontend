import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { BACKEND_HOST } from '../../config/backend';
import css from './RecipeMainInfo.module.css';

function RecipeMainInfo({ recipe, onOpenSignIn }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const { title, thumb, description, category, time, owner } = recipe;

    const thumbUrl = thumb
        ? thumb.startsWith('http')
            ? thumb
            : `${BACKEND_HOST}/${thumb}`
        : null;

    const avatarUrl = owner?.avatar
        ? owner.avatar.startsWith('http')
            ? owner.avatar
            : `${BACKEND_HOST}/${owner.avatar}`
        : null;

    const handleAuthorClick = () => {
        if (isLoggedIn) {
            navigate(`/user/${owner.id}`);
        } else {
            onOpenSignIn();
        }
    };

    return (
        <div className={css.wrapper}>
            {thumbUrl && (
                <div className={css.imageWrapper}>
                    <img src={thumbUrl} alt={title} className={css.image} />
                </div>
            )}
            <div className={css.info}>
                <h1 className={css.title}>{title}</h1>
                {(category || time) && (
                    <div className={css.tags}>
                        {category && <span className={css.category}>{category.name}</span>}
                        {time && <span className={css.time}>{time} min</span>}
                    </div>
                )}
                {description && <p className={css.description}>{description}</p>}
                {owner && (
                    <button type="button" className={css.authorBtn} onClick={handleAuthorClick}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={owner.name} className={css.authorAvatar} />
                        ) : (
                            <span className={css.avatarPlaceholder}>
                                {owner.name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <span className={css.authorInfo}>
                            <span className={css.authorLabel}>Created by:</span>
                            <span className={css.authorName}>{owner.name}</span>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecipeMainInfo;
