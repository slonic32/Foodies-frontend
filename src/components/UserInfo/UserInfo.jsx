import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './UserInfo.module.css';
import { editUser } from '../../redux/auth/operations';
import { selectAuthLoading } from '../../redux/auth/selectors';
import { BACKEND_HOST } from '../../config/backend';
import defaultAvatar from '../../assets/avatar_default.svg';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

const DEFAULT_AVATAR = defaultAvatar;

function getAvatarSrc(avatar) {
    if (!avatar) return DEFAULT_AVATAR;
    if (avatar.startsWith('http')) return avatar;

    const normalizedAvatar = avatar.replace(/\\/g, '/');

    return normalizedAvatar.startsWith('/')
        ? `${BACKEND_HOST}${normalizedAvatar}`
        : `${BACKEND_HOST}/${normalizedAvatar}`;
}

export default function UserInfo({ user, isOwnProfile = false }) {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const isLoading = useSelector(selectAuthLoading);

    const preparedUser = {
        name: user?.name || 'User',
        email: user?.email || 'No email',
        avatar: getAvatarSrc(user?.avatar || ''),
        recipesCount: user?.recipesCount ?? 0,
        favoritesCount: user?.favoritesCount ?? 0,
        followersCount: user?.followersCount ?? 0,
        followingCount: user?.followingCount ?? 0,
    };

    const handleAvatarClick = () => {
        if (!isOwnProfile || isLoading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            await dispatch(editUser(formData)).unwrap();
            toast.success('Avatar updated successfully');
        } catch (error) {
            toast.error(error?.message || 'Failed to update avatar');
        } finally {
            e.target.value = '';
        }
    };

    return (
        <section className={css.card}>
            <div className={css.head}>
                <div className={css.avatarWrap}>
                    <img
                        className={`${css.avatar} ${isLoading ? css.avatarLoading : ''}`}
                        src={preparedUser.avatar}
                        alt={preparedUser.name}
                    />

                    {isLoading && (
                        <div className={css.loaderOverlay}>
                            <Loader />
                        </div>
                    )}

                    {isOwnProfile && (
                        <>
                            <input
                                ref={fileInputRef}
                                className={css.hiddenInput}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={css.addBtn}
                                onClick={handleAvatarClick}
                                aria-label="Upload avatar"
                                disabled={isLoading}
                            >
                                {isLoading ? '' : '+'}
                            </button>
                        </>
                    )}
                </div>

                <div className={css.meta}>
                    <h2 className={css.name}>{preparedUser.name}</h2>
                </div>
            </div>

            <ul className={css.infoList}>
                <li className={css.infoItem}>
                    <span className={css.label}>Email:</span>
                    <span className={css.value}>{preparedUser.email}</span>
                </li>

                <li className={css.infoItem}>
                    <span className={css.label}>Added recipes:</span>
                    <span className={css.value}>{preparedUser.recipesCount}</span>
                </li>

                {isOwnProfile && (
                    <li className={css.infoItem}>
                        <span className={css.label}>Favorites:</span>
                        <span className={css.value}>{preparedUser.favoritesCount}</span>
                    </li>
                )}

                <li className={css.infoItem}>
                    <span className={css.label}>Followers:</span>
                    <span className={css.value}>{preparedUser.followersCount}</span>
                </li>

                {isOwnProfile && (
                    <li className={css.infoItem}>
                        <span className={css.label}>Following:</span>
                        <span className={css.value}>{preparedUser.followingCount}</span>
                    </li>
                )}
            </ul>
        </section>
    );
}
