import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import youtubeIcon from '../../assets/youtube.svg';
import css from './Footer.module.css';
import Logo from '../Logo/Logo';

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.inner}>
                <div className={css.topRow}>
                    <Logo />

                    <ul className={css.socialLinks}>
                        <li>
                            <a
                                href="https://www.facebook.com/goITclub/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css.socialLink}
                                aria-label="Facebook"
                            >
                                <img src={facebookIcon} alt="Facebook" className={css.icon} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/goitclub/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css.socialLink}
                                aria-label="Instagram"
                            >
                                <img src={instagramIcon} alt="Instagram" className={css.icon} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/c/GoIT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css.socialLink}
                                aria-label="YouTube"
                            >
                                <img src={youtubeIcon} alt="YouTube" className={css.icon} />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={css.divider}></div>

                <p className={css.copyright}>&copy; 2024, Foodies. All rights reserved</p>
            </div>
        </footer>
    );
}