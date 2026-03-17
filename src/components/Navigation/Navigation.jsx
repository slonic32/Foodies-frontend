import { NavLink } from 'react-router-dom';
import { navItems } from './navItems';
import css from './Navigation.module.css';

export default function Navigation({ mobile = false, onNavigate }) {
    const navClass = mobile ? css.mobileNav : css.nav;

    const getLinkClass = ({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link);

    return (
        <nav className={navClass}>
            {navItems.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={onNavigate} className={getLinkClass}>
                    {label}
                </NavLink>
            ))}
        </nav>
    );
}