import { Link } from 'react-router-dom';
import css from './CategoryList.module.css';
import beefImg from '../../assets/category-beef.jpg';
import porkImg from '../../assets/category-pork.jpg';

const categories = [
    { id: 1, name: 'Beef', image: beefImg },
    { id: 2, name: 'Pork', image: porkImg },
];

function CategoryList() {
    return (
        <ul className={css.list}>
            {categories.map(({ id, name, image }) => (
                <li key={id} className={css.item}>
                    <div className={css.card}>
                        <img src={image} alt={name} className={css.image} />
                        <div className={css.footer}>
                            <span className={css.name}>{name}</span>
                            <Link to={`/categories/${name.toLowerCase()}`} className={css.arrowBtn} aria-label={`Go to ${name}`}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </li>
            ))}
            <li className={css.item}>
                <div className={`${css.card} ${css.allCard}`}>
                    <span className={css.allLabel}>ALL CATEGORIES</span>
                </div>
            </li>
        </ul>
    );
}

export default CategoryList;
