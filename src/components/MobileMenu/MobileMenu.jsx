import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './MobileMenu.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Icon from '../Icon/Icon';

import imgMain from '../../assets/hero-main.png';
import imgSecondary from '../../assets/hero-secondary.png';




const modalRoot = document.body;

export default function MobileMenu({ onClose }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.menu}>
                <div className={css.topBar}>
                    <Logo variant="light" />

                    <button type="button" className={css.closeButton} onClick={onClose} aria-label="Close menu">
                        <Icon name="close" size={16} color="white" />
                    </button>
                </div>

                <div className={css.navWrapper}>
                    <Navigation mobile onNavigate={onClose} />
                </div>
                <div className={css.imagesBlock}>
                    <img src={imgSecondary} alt="Delicious dessert" className={css.imgSecondary} loading="lazy" />
                    <img src={imgMain} alt="Beef Wellington" className={css.imgMain} loading="lazy" />
                </div>
            </div>
        </div>,
        modalRoot,
    );
}
