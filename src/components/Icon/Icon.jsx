import MenuIcon from '../../assets/icons/menu';
import ChevronDownIcon from '../../assets/icons/chevronDown';
import CloseIcon from '../../assets/icons/close';

import css from './Icon.module.css';
import ArrowUpIcon from '../../assets/icons/arrowUp';

const icons = {
    menu: MenuIcon,
    chevron: ChevronDownIcon,
    close: CloseIcon,
    logout: ArrowUpIcon,
};

export default function Icon({ name, size = 24, color = 'white', className = '' }) {
    const Component = icons[name];

    if (!Component) return null;

    const classes = `
    ${css.icon}
    ${color === 'white' ? css.white : css.black}
    ${className}
  `;

    return <Component width={size} height={size} className={classes} />;
}
