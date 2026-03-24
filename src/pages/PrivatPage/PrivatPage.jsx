import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import css from './PrivatPage.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import SignInModal from '../../components/SignInModal/SignInModal';
import SignUpModal from '../../components/SignUpModal/SignUpModal';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import TabsList from '../../components/TabsList/TabsList.jsx';
import ListItems from '../../components/ListItems/ListItems.jsx';
import RecipePagination from '../../components/RecipePagination/RecipePagination.jsx';

import { selectUser, selectToken } from '../../redux/auth/selectors.js';
import {
    selectProfile,
    selectProfileLoading,
    selectProfileError,
    selectIsFollowing,
    selectFollowers,
    selectFollowing,
    selectRecipes,
    selectFavorites,
    selectTabLoading,
    selectMeta,
} from '../../redux/users/selectors.js';

import {
    fetchOwnProfile,
    fetchOtherProfile,
    followUser,
    unfollowUser,
    fetchFollowers,
    fetchFollowing,
    fetchOwnRecipes,
    fetchFavoriteRecipes,
    deleteOwnRecipe,
    removeFavoriteRecipe,
    fetchUserFollowers,
    fetchUserRecipes,
} from '../../redux/users/operations.js';

import { logout } from '../../redux/auth/operations.js';
import { showNotification } from '../../utils/notification.jsx';

const USER_ITEMS_PER_PAGE = 5;

export default function PrivatPage() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('recipes');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsersPage, setCurrentUsersPage] = useState(1);

    const dispatch = useDispatch();
    const { id } = useParams();

    const currentUser = useSelector(selectUser);
    const token = useSelector(selectToken);

    const profileUser = useSelector(selectProfile);
    const loading = useSelector(selectProfileLoading);
    const error = useSelector(selectProfileError);
    const isFollowing = useSelector(selectIsFollowing);

    const followers = useSelector(selectFollowers);
    const following = useSelector(selectFollowing);
    const recipes = useSelector(selectRecipes);
    const favorites = useSelector(selectFavorites);
    const tabLoading = useSelector(selectTabLoading);
    const meta = useSelector(selectMeta);

    const openSignInModal = () => {
        setIsLogOutOpen(false);
        setIsSignUpOpen(false);
        setIsSignInOpen(true);
    };

    const openSignUpModal = () => {
        setIsLogOutOpen(false);
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
    };

    const openLogOutModal = () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(false);
        setIsLogOutOpen(true);
    };

    const closeSignInModal = () => setIsSignInOpen(false);
    const closeSignUpModal = () => setIsSignUpOpen(false);
    const closeLogOutModal = () => setIsLogOutOpen(false);

    const handleConfirmLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            showNotification('You have been logged out successfully!', 'success');
        } catch (error) {
            showNotification('Failed to log out. Please try again.', 'error');
            console.error('Logout operation failed:', error);
        }

        closeLogOutModal();

        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    function LogOutModal({ onClose }) {
        return (
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '320px',
                        width: '100%',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>Log out</h2>
                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#555' }}>
                        Are you sure you want to log out?
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '8px',
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirmLogout}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#e74c3c',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentUserId = String(currentUser?.id || currentUser?._id || '');
    const profileId = String(id || '');
    const isOwnProfile = !profileId || currentUserId === profileId;
    const displayedUser = isOwnProfile ? profileUser || currentUser : profileUser;

    useEffect(() => {
        if (!token || !currentUserId) return;

        if (isOwnProfile) {
            dispatch(fetchOwnProfile(token));
        } else if (id) {
            dispatch(fetchOtherProfile({ id, token }));
        }
    }, [dispatch, id, token, currentUserId, isOwnProfile]);

    useEffect(() => {
        if (!token) return;
        dispatch(fetchFollowing(token));
    }, [dispatch, token]);

    useEffect(() => {
        setCurrentPage(1);
        setCurrentUsersPage(1);
    }, [activeTab, id]);

    useEffect(() => {
        if (!isOwnProfile && (activeTab === 'favorites' || activeTab === 'following')) {
            setActiveTab('recipes');
        }
    }, [isOwnProfile, activeTab]);

    useEffect(() => {
        if (!token) return;

        if (isOwnProfile) {
            if (activeTab === 'recipes') {
                dispatch(fetchOwnRecipes({ token, page: currentPage }));
            }

            if (activeTab === 'favorites') {
                dispatch(fetchFavoriteRecipes({ token, page: currentPage }));
            }

            if (activeTab === 'followers') {
                dispatch(fetchFollowers(token));
            }

            if (activeTab === 'following') {
                dispatch(fetchFollowing(token));
            }
        } else {
            if (activeTab === 'recipes') {
                dispatch(fetchUserRecipes({ id, token, page: currentPage }));
            }

            if (activeTab === 'followers') {
                dispatch(fetchUserFollowers({ id, token }));
            }
        }
    }, [dispatch, token, activeTab, isOwnProfile, id, currentPage]);

    const currentItems = useMemo(() => {
        if (activeTab === 'recipes') return recipes;
        if (activeTab === 'favorites') return isOwnProfile ? favorites : [];
        if (activeTab === 'followers') return followers;
        if (activeTab === 'following') return isOwnProfile ? following : [];
        return [];
    }, [activeTab, recipes, favorites, followers, following, isOwnProfile]);

    const isRecipeTab = activeTab === 'recipes' || activeTab === 'favorites';
    const isUserTab = activeTab === 'followers' || activeTab === 'following';

    const displayedItems = isUserTab
        ? currentItems.slice((currentUsersPage - 1) * USER_ITEMS_PER_PAGE, currentUsersPage * USER_ITEMS_PER_PAGE)
        : currentItems;

    const totalItems = meta?.total || meta?.totalItems || 0;

    const followingIds = useMemo(
        () => new Set((following || []).map((user) => String(user?.id || user?._id || user?.userId || ''))),
        [following],
    );

    const handleFollowToggle = async () => {
        if (!token || !id || isFollowLoading) return;

        setIsFollowLoading(true);

        try {
            if (isFollowing) {
                await dispatch(unfollowUser({ id, token })).unwrap();
            } else {
                await dispatch(followUser({ id, token })).unwrap();
            }

            await dispatch(fetchOtherProfile({ id, token })).unwrap();

            if (activeTab === 'followers') {
                await dispatch(fetchUserFollowers({ id, token })).unwrap();
            }

            await dispatch(fetchFollowing(token)).unwrap();
        } catch (error) {
            showNotification('Failed to update follow status.', 'error');
            console.error(error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    const handleDeleteRecipe = async (recipe, tab) => {
        const recipeId = recipe?.id || recipe?._id || recipe?.recipeId;
        if (!recipeId || !token) return;

        try {
            if (tab === 'recipes') {
                await dispatch(deleteOwnRecipe({ recipeId, token })).unwrap();
                showNotification('Recipe deleted successfully.', 'success');
            }

            if (tab === 'favorites') {
                await dispatch(removeFavoriteRecipe({ recipeId, token })).unwrap();
                showNotification('Recipe removed from favorites.', 'success');
            }
        } catch (error) {
            showNotification('Failed to update recipes.', 'error');
            console.error(error);
        }
    };

    const handleUserCardFollowToggle = async (user) => {
        const userId = user?.id || user?._id || user?.userId;
        if (!userId || !token) return;

        try {
            const shouldUnfollow =
                activeTab === 'following' || followingIds.has(String(userId)) || user?.isFollowing === true;

            if (shouldUnfollow) {
                await dispatch(unfollowUser({ id: userId, token })).unwrap();
                showNotification('User unfollowed successfully.', 'success');
            } else {
                await dispatch(followUser({ id: userId, token })).unwrap();
                showNotification('User followed successfully.', 'success');
            }

            await dispatch(fetchFollowing(token)).unwrap();

            if (activeTab === 'followers') {
                if (isOwnProfile) {
                    await dispatch(fetchFollowers(token)).unwrap();
                } else if (id) {
                    await dispatch(fetchUserFollowers({ id, token })).unwrap();
                }
            }

            if (activeTab === 'following' && isOwnProfile) {
                await dispatch(fetchFollowing(token)).unwrap();
            }
        } catch (error) {
            showNotification('Failed to update follow status.', 'error');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className={css.page}>
                <Header
                    theme="dark"
                    onSignInClick={openSignInModal}
                    onSignUpClick={openSignUpModal}
                    onLogOutClick={openLogOutModal}
                />
                <main className={css.main}>
                    <div className={css.container}>Loading profile...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className={css.page}>
                <Header
                    theme="dark"
                    onSignInClick={openSignInModal}
                    onSignUpClick={openSignUpModal}
                    onLogOutClick={openLogOutModal}
                />
                <main className={css.main}>
                    <div className={css.container}>{error}</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={css.page}>
            <Header
                theme="dark"
                onSignInClick={openSignInModal}
                onSignUpClick={openSignUpModal}
                onLogOutClick={openLogOutModal}
            />

            <main className={css.main}>
                <div className={css.container}>
                    <PathInfo pageTitle="PROFILE" />

                    <div className={css.titleSection}>
                        <MainTitle>PROFILE</MainTitle>
                        <Subtitle className={css.subtitle}>
                            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
                            with us.
                        </Subtitle>
                    </div>

                    <div className={css.profileLayout}>
                        <div className={css.leftColumn}>
                            <div className={css.userInfoWrap}>
                                <UserInfo user={displayedUser} isOwnProfile={isOwnProfile} />
                            </div>

                            {isOwnProfile ? (
                                <button type="button" className={css.actionBtn} onClick={openLogOutModal}>
                                    LOG OUT
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={css.actionBtn}
                                    onClick={handleFollowToggle}
                                    disabled={isFollowLoading}
                                >
                                    {isFollowLoading ? '...' : isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                                </button>
                            )}
                        </div>

                        <div className={css.rightColumn}>
                            <TabsList activeTab={activeTab} onChange={setActiveTab} isOwnProfile={isOwnProfile} />

                            <ListItems
                                items={displayedItems}
                                activeTab={activeTab}
                                isOwnProfile={isOwnProfile}
                                isLoading={tabLoading}
                                onDeleteRecipe={handleDeleteRecipe}
                                onFollowToggle={handleUserCardFollowToggle}
                                currentUserId={currentUserId}
                                followingIds={followingIds}
                            />

                            {isRecipeTab && (
                                <RecipePagination
                                    currentPage={currentPage}
                                    totalRecipes={totalItems}
                                    onPageChange={setCurrentPage}
                                />
                            )}

                            {isUserTab && (
                                <RecipePagination
                                    currentPage={currentUsersPage}
                                    totalRecipes={currentItems.length}
                                    onPageChange={setCurrentUsersPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {isSignInOpen && <SignInModal onClose={closeSignInModal} onCreateAccount={openSignUpModal} />}
            {isSignUpOpen && <SignUpModal onClose={closeSignUpModal} onSignIn={openSignInModal} />}
            {isLogOutOpen && <LogOutModal onClose={closeLogOutModal} />}
        </div>
    );
}
