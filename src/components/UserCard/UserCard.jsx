import { Link } from 'react-router-dom';
import css from './UserCard.module.css';
import { BACKEND_HOST } from '../../config/backend';
import defaultAvatar from '../../assets/avatar_default.svg';

function getAvatarSrc(avatar) {
    if (!avatar) return defaultAvatar;
    if (avatar.startsWith('http')) return avatar;

    const normalizedAvatar = avatar.replace(/\\/g, '/');

    return normalizedAvatar.startsWith('/')
        ? `${BACKEND_HOST}${normalizedAvatar}`
        : `${BACKEND_HOST}/${normalizedAvatar}`;
}

export default function UserCard({ user, isFollowing = false, isLoading = false, onToggleFollow }) {
    const userId = user?.id || user?._id;
    const userName = user?.name || 'User';
    const avatarSrc = getAvatarSrc(user?.avatar || '');
    const recipesCount = user?.recipesCount ?? 0;

    const recipesPreview = Array.isArray(user?.recipesPreview)
        ? user.recipesPreview
        : Array.isArray(user?.recipes)
          ? user.recipes
          : [];

    const handleToggleFollow = () => {
        if (isLoading || !userId) return;
        onToggleFollow?.(user);
    };

    return (
        <li className={css.item}>
            <div className={css.main}>
                <div className={css.left}>
                    <img className={css.avatar} src={avatarSrc} alt={`${userName} avatar`} />

                    <div className={css.meta}>
                        <h3 className={css.name}>{userName}</h3>
                        <p className={css.count}>Own recipes: {recipesCount}</p>

                        <button
                            type="button"
                            className={css.followBtn}
                            onClick={handleToggleFollow}
                            disabled={isLoading}
                        >
                            {isLoading ? 'LOADING...' : isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                        </button>
                    </div>
                </div>

                <div className={css.right}>
                    <div className={css.previewList}>
                        {recipesPreview.map((recipe) => {
                            const recipeId = recipe?.id || recipe?._id;
                            const recipeThumb = recipe?.thumb || recipe?.preview || recipe?.image || '';
                            const recipeTitle = recipe?.title || 'Recipe';

                            if (!recipeThumb) return null;

                            return (
                                <img key={recipeId} className={css.previewImg} src={recipeThumb} alt={recipeTitle} />
                            );
                        })}
                    </div>

                    <Link to={`/user/${userId}`} className={css.arrowLink} aria-label="Open user profile">
                        ↗
                    </Link>
                </div>
            </div>
        </li>
    );
}
