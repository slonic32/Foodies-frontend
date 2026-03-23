import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import css from './PrivatPage.module.css';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
// import UserCard from '../../components/UserCard/UserCard.jsx';
import { selectUser, selectToken } from '../../redux/auth/selectors.js';
import {
    selectProfile,
    selectProfileLoading,
    selectProfileError,
    selectIsFollowing,
} from '../../redux/users/selectors.js';
import { fetchOwnProfile, fetchOtherProfile, followUser, unfollowUser } from '../../redux/users/operations.js';

import { showNotification } from '../../utils/notification.jsx';

import { logout } from '../../redux/auth/operations.js';

import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';

export default function PrivatPage() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

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

    const dispatch = useDispatch();

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
            // Reload the page to ensure UI reflects logged-out state.
            window.location.reload();
        }
    };

    const { id } = useParams();

    const currentUser = useSelector(selectUser);
    const token = useSelector(selectToken);

    const profileUser = useSelector(selectProfile);
    const loading = useSelector(selectProfileLoading);
    const error = useSelector(selectProfileError);
    const isFollowing = useSelector(selectIsFollowing);

    const currentUserId = String(currentUser?.id || currentUser?._id || '');
    const profileId = String(id || '');
    const isOwnProfile = currentUserId === profileId;
    const displayedUser = isOwnProfile ? currentUser : profileUser;

    useEffect(() => {
        if (!id || !token || !currentUserId) return;

        if (isOwnProfile) {
            dispatch(fetchOwnProfile(token));
        } else {
            dispatch(fetchOtherProfile({ id, token }));
        }
    }, [dispatch, id, token, currentUserId, isOwnProfile]);

    const handleFollowToggle = async () => {
        if (!token || !id || isFollowLoading) return;

        setIsFollowLoading(true);

        try {
            if (isFollowing) {
                await dispatch(unfollowUser({ id, token })).unwrap();
            } else {
                await dispatch(followUser({ id, token })).unwrap();
            }
        } catch (error) {
            showNotification('Failed to update follow status.', 'error');
            console.error(error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    if (loading) {
        return <div className={css.container}>Loading profile...</div>;
    }

    if (error) {
        return <div className={css.container}>{error}</div>;
    }

    return (
        <div className={css.container}>
            <h1 className={css.title}>PROFILE</h1>

            <p className={css.text}>
                Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
            </p>

            <div className={css.userInfoWrap}>
                <UserInfo user={displayedUser} isOwnProfile={isOwnProfile} />
            </div>

            {isOwnProfile ? (
                <button type="button" className={css.actionBtn} onClick={openLogOutModal}>
                    LOG OUT
                </button>
            ) : (
                <button type="button" className={css.actionBtn} onClick={handleFollowToggle} disabled={isFollowLoading}>
                    {isFollowLoading ? '...' : isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                </button>
            )}

            <NavLink to="/" className={css.linkSignIn}>
                Back Home
            </NavLink>

            {isLogOutOpen && <LogOutModal onClose={closeLogOutModal} onConfirm={handleConfirmLogout} />}
        </div>
    );
}
