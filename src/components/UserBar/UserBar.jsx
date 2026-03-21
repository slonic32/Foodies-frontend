import { useState } from 'react';
import css from './UserBar.module.css';
import UserDropdown from '../UserDropdown/UserDropdown';
import Icon from '../Icon/Icon';




export default function UserBar({ user, onLogOutClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const avatar = user?.avatar || 'https://i.pravatar.cc/100?img=32';

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className={css.wrapper}>
            <button
                type="button"
                className={css.userBtn}
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <img src={avatar} alt="" className={css.avatar} />

                <span className={css.userName}>{user?.name || 'Profile'}</span>

                <Icon
                    name="chevron"
                    size={18}
                    color="white"
                    className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
                />
            </button>

            {isOpen && <UserDropdown user={user} onLogOutClick={onLogOutClick} onClose={closeDropdown} />}
        </div>
    );
}