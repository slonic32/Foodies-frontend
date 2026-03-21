import { Link } from 'react-router-dom';
import css from './PathInfo.module.css';

function PathInfo({ current }) {
    return (
        <nav className={css.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={css.link}>
                HOME
            </Link>
            <span className={css.separator}>/</span>
            <span className={css.current}>{current}</span>
        </nav>
    );
}

export default PathInfo;
