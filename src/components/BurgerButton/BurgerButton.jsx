import css from './BurgerButton.module.css';
import Icon from '../Icon/Icon';

export default function BurgerButton({ onOpen, theme = 'light' }) {
    return (
        <button type="button" className={css.burgerBtn} onClick={onOpen} aria-label="Open menu">
            <Icon name="menu" size={28} color={theme === 'dark' ? '#1a1a1a' : 'white'} />
        </button>
    );
}
