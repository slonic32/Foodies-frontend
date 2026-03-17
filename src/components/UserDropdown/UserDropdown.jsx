import { NavLink } from 'react-router-dom';
import css from './UserDropdown.module.css';
import Icon from '../Icon/Icon';


export default function UserDropdown({ user, onLogOutClick, onClose }) {
    const profileLink = `/user/${user?._id || user?.id}`;

    const handleLogout = () => {
        onClose();
        onLogOutClick();
    };

    return (
        <div className={css.dropdown}>
            <NavLink to={profileLink} className={css.link} onClick={onClose}>
                PROFILE
            </NavLink>

            <button type="button" className={css.logoutBtn} onClick={handleLogout}>
                <span>LOG OUT</span>

                <Icon name="logout" size={16} color="white" className={css.logoutIcon} />
            </button>
        </div>
    );
}
