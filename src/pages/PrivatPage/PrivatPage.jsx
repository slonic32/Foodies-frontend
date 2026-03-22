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

export default function PrivatPage() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const [isLogOutOpen, setIsLogOutOpen] = useState(false);

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

    function LogOutModal({ onClose }) {
        const handleCancel = () => {
            if (onClose) {
                onClose();
            }
        };

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
                            onClick={handleCancel}
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

    useEffect(() => {
        if (!id || !token || !currentUserId) return;

        if (isOwnProfile) {
            dispatch(fetchOwnProfile(token));
        } else {
            dispatch(fetchOtherProfile({ id, token }));
        }
    }, [dispatch, id, token, currentUserId, isOwnProfile]);

    const handleFollowToggle = () => {
        if (!token || !id) return;

        if (isFollowing) {
            dispatch(unfollowUser({ id, token }));
        } else {
            dispatch(followUser({ id, token }));
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
                <UserInfo user={profileUser} isOwnProfile={isOwnProfile} />
            </div>

            {isOwnProfile ? (
                <button type="button" className={css.actionBtn} onClick={openLogOutModal}>
                    LOG OUT
                </button>
            ) : (
                <button type="button" className={css.actionBtn} onClick={handleFollowToggle}>
                    {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                </button>
            )}

            <NavLink to="/" className={css.linkSignIn}>
                Back Home
            </NavLink>

            {isLogOutOpen && <LogOutModal onClose={closeLogOutModal} />}
        </div>
    );
}
