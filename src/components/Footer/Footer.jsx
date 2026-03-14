import { NavLink } from 'react-router-dom';
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import youtubeIcon from '../../assets/youtube.svg';
import css from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                {/* ── Logo ────────────────────────────────── */}
                <NavLink to="/" className={css.logo}>
                    foodies
                </NavLink>

                {/* ── Social links ────────────────────────── */}
                <div className={css.socialLinks}>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.socialLink}
                        aria-label="Facebook"
                    >
                        <img src={facebookIcon} alt="Facebook" className={css.icon} />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.socialLink}
                        aria-label="Instagram"
                    >
                        <img src={instagramIcon} alt="Instagram" className={css.icon} />
                    </a>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.socialLink}
                        aria-label="YouTube"
                    >
                        <img src={youtubeIcon} alt="YouTube" className={css.icon} />
                    </a>
                </div>
            </div>

            {/* ── Divider ─────────────────────────────── */}
            <div className={css.divider}></div>

            {/* ── Copyright text ──────────────────────── */}
            <div className={css.container}>
                <p className={css.copyright}>
                    @2024, Foodies. All rights reserved
                </p>
            </div>
        </footer>
    );
}
