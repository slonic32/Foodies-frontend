import css from './MainTitle.module.css';

function MainTitle({ children, className = '' }) {
    return (
        <h2 className={`${css.title} ${className}`}>
            {children}
        </h2>
    );
}

export default MainTitle;
