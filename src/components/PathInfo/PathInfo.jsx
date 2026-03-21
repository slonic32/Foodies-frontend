import { Link } from 'react-router-dom';
import css from './PathInfo.module.css';

function PathInfo({ pageTitle }) {
    return (
        <nav className={css.breadcrumb} aria-label="breadcrumb">
            <Link to="/" className={css.homeLink}>
                Home
            </Link>
            <span className={css.separator}>/</span>
            <span className={css.current}>{pageTitle}</span>
        </nav>
    );
}

export default PathInfo;
