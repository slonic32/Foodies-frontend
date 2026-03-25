import RecipePreview from '../RecipePreview/RecipePreview';
import UserCard from '../UserCard/UserCard';
import css from './ListItems.module.css';

const EMPTY_MESSAGES = {
    own: {
        recipes:
            'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for any occasion in the future.',
        favorites:
            'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for any occasion in the future.',
        followers:
            'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.',
        following:
            'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.',
    },
    other: {
        recipes: 'This user has not added any recipes yet.',
        followers: 'This user currently has no followers.',
    },
};

function getEmptyMessage(activeTab, isOwnProfile) {
    if (isOwnProfile) {
        return EMPTY_MESSAGES.own[activeTab] || 'No items found.';
    }

    return EMPTY_MESSAGES.other[activeTab] || 'No items found.';
}

export default function ListItems({
    items = [],
    activeTab = 'recipes',
    isOwnProfile = false,
    isLoading = false,
    onDeleteRecipe,
    onFollowToggle,
    deletingRecipeId = null,
    togglingUserId = null,
    currentUserId,
    followingIds,
}) {
    if (isLoading) {
        return <p className={css.message}>Loading...</p>;
    }

    if (!items.length) {
        return <p className={css.message}>{getEmptyMessage(activeTab, isOwnProfile)}</p>;
    }

    const isRecipeTab = activeTab === 'recipes' || activeTab === 'favorites';
    const isUserTab = activeTab === 'followers' || activeTab === 'following';

    return (
        <ul className={css.list}>
            {isRecipeTab &&
                items.map((recipe) => {
                    const recipeId = recipe?.id || recipe?._id || recipe?.recipeId;

                    return (
                        <RecipePreview
                            key={recipeId}
                            recipe={recipe}
                            tab={activeTab}
                            isDeleting={deletingRecipeId === recipeId}
                            onDelete={onDeleteRecipe}
                        />
                    );
                })}

            {isUserTab &&
                items.map((user) => {
                    const userId = user?.id || user?._id || user?.userId;

                    return (
                        <li key={userId} className={css.userItem}>
                            <UserCard
                                user={user}
                                activeTab={activeTab}
                                isLoading={togglingUserId === userId}
                                onFollowToggle={onFollowToggle}
                                currentUserId={currentUserId}
                                followingIds={followingIds}
                            />
                        </li>
                    );
                })}
        </ul>
    );
}
