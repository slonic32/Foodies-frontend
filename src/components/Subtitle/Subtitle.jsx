import css from './Subtitle.module.css';

function Subtitle({ children, className = '' }) {
    return (
        <p className={`${css.subtitle} ${className}`}>
            {children}
        </p>
    );
}

export default Subtitle;
