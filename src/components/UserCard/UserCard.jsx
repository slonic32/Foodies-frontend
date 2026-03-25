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

function getRecipeImage(recipe) {
    const image = recipe?.thumb || recipe?.preview || recipe?.image || recipe?.photo || '';
    if (!image) return '';

    if (image.startsWith('http')) return image;

    const normalizedImage = image.replace(/\\/g, '/');

    return normalizedImage.startsWith('/') ? `${BACKEND_HOST}${normalizedImage}` : `${BACKEND_HOST}/${normalizedImage}`;
}

export default function UserCard({
    user,
    activeTab = 'followers',
    isLoading = false,
    onFollowToggle,
    currentUserId,
    followingIds,
}) {
    const userId = user?.id || user?._id || user?.userId || '';
    const isOwnCard = String(currentUserId) === String(userId);
    const userName = user?.name || 'User';
    const avatarSrc = getAvatarSrc(user?.avatar || '');
    const recipesCount = user?.recipesCount ?? user?.ownRecipesCount ?? 0;

    const recipesPreview = Array.isArray(user?.recipesPreview)
        ? user.recipesPreview
        : Array.isArray(user?.recipes)
          ? user.recipes
          : [];

    const isFollowing =
        activeTab === 'following' ||
        followingIds?.has(String(userId)) ||
        user?.isFollowing === true ||
        user?.following === true;

    const shouldShowFollowButton = !isOwnCard && (activeTab === 'followers' || activeTab === 'following');

    const buttonLabel = isFollowing ? 'UNFOLLOW' : 'FOLLOW';

    const handleToggleFollow = () => {
        if (isLoading || !userId) return;
        onFollowToggle?.(user);
    };

    return (
        <div className={css.item}>
            <div className={css.main}>
                <div className={css.left}>
                    <img className={css.avatar} src={avatarSrc} alt={`${userName} avatar`} />

                    <div className={css.meta}>
                        <h3 className={css.name}>{userName}</h3>
                        <p className={css.count}>Own recipes: {recipesCount}</p>

                        {shouldShowFollowButton && (
                            <button
                                type="button"
                                className={css.followBtn}
                                onClick={handleToggleFollow}
                                disabled={isLoading}
                            >
                                {isLoading ? '...' : buttonLabel}
                            </button>
                        )}
                    </div>
                </div>

                <div className={css.right}>
                    {!!recipesPreview.length && (
                        <div className={css.previewList}>
                            {recipesPreview.slice(0, 4).map((recipe) => {
                                const recipeId = recipe?.id || recipe?._id || recipe?.recipeId;
                                const recipeImage = getRecipeImage(recipe);
                                const recipeTitle = recipe?.title || 'Recipe';

                                if (!recipeImage) return null;

                                return (
                                    <img
                                        key={recipeId || recipeTitle}
                                        className={css.previewImg}
                                        src={recipeImage}
                                        alt={recipeTitle}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <Link to={`/user/${userId}`} className={css.arrowLink} aria-label={`Open ${userName} profile`}>
                        ↗
                    </Link>
                </div>
            </div>
        </div>
    );
}
