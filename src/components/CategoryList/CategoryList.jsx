import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories/operations';
import { selectCategories } from '../../redux/categories/selectors';
import css from './CategoryList.module.css';

// Import assets
import beefImg from '../../assets/Beef.jpg';
import breakfastImg from '../../assets/Breakfast.jpg';
import dessertsImg from '../../assets/Desserts.jpg';
import goatImg from '../../assets/Goat.jpg';
import lambImg from '../../assets/Lamb.jpg';
import miscellaneousImg from '../../assets/Miscellaneous.jpg';
import pastaImg from '../../assets/Pasta.jpg';
import porkImg from '../../assets/Pork.jpg';
import seafoodImg from '../../assets/Seafood.jpg';
import sideImg from '../../assets/Side.jpg';
import starterImg from '../../assets/Starter.jpg';

const imageMap = {
    Beef: beefImg,
    Breakfast: breakfastImg,
    Dessert: dessertsImg,
    Desserts: dessertsImg,
    Goat: goatImg,
    Lamb: lambImg,
    Miscellaneous: miscellaneousImg,
    Pasta: pastaImg,
    Pork: porkImg,
    Seafood: seafoodImg,
    Side: sideImg,
    Starter: starterImg,
};

function CategoryList() {
    const dispatch = useDispatch();
    const categoriesFromRedux = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Map images and filter out categories without an image
    const categories = categoriesFromRedux
        .map((cat) => ({
            ...cat,
            image: imageMap[cat.name],
        }))
        .filter((cat) => cat.image);

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
                <Link to={`/categories/all`} className={css.allCardLink}>
                    <div className={`${css.card} ${css.allCard}`}>
                        <span className={css.allLabel}>ALL CATEGORIES</span>
                    </div>
                </Link>
            </li>
        </ul>
    );
}

export default CategoryList;
