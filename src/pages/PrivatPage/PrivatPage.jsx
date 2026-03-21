import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import css from './PrivatPage.module.css';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import { selectUser, selectToken } from '../../redux/auth/selectors.js';
import {
    selectProfile,
    selectProfileLoading,
    selectProfileError,
    selectIsFollowing,
} from '../../redux/users/selectors.js';
import { fetchOwnProfile, fetchOtherProfile, followUser, unfollowUser } from '../../redux/users/operations.js';

export default function PrivatPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

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
                <button type="button" className={css.actionBtn}>
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
        </div>
    );
}
