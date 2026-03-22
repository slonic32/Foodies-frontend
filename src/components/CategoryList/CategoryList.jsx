import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations';
import { selectCategories, selectIsLoading, selectError } from '../../redux/categories/selectors';
import css from './CategoryList.module.css';
import Loader from '../Loader/Loader';

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

const categoryOrder = [
    'Beef',
    'Breakfast',
    'Dessert',
    'Desserts',
    'Lamb',
    'Goat',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
];

function CategoryList({ onSelectCategory }) {
    const dispatch = useDispatch();
    const categoriesFromRedux = useSelector(selectCategories);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSelectCategory = (categoryId, categoryName) => {
        if (onSelectCategory) onSelectCategory({ id: categoryId, name: categoryName });
    };

    if (isLoading && categoriesFromRedux.length === 0) {
        return <Loader />;
    }

    if (error) {
        return <p>Something went wrong...</p>;
    }

    const categories = categoriesFromRedux
        .map((cat) => ({
            ...cat,
            image: imageMap[cat.name],
        }))
        .filter((cat) => cat.image)
        .sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

    return (
        <div className={css.wrapper}>
            <ul className={css.list}>
                {categories.map(({ id, name, image }) => (
                    <li key={id} className={css.item}>
                        <div className={css.card}>
                            <img src={image} alt={name} className={css.image} />
                            <div className={css.footer}>
                                <span className={css.name}>{name}</span>
                                <button
                                    className={css.arrowBtn}
                                    onClick={() => handleSelectCategory(id, name)}
                                    type="button"
                                    aria-label={`View recipes for ${name}`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}

                <li className={css.item}>
                    <button
                        className={`${css.card} ${css.allCard}`}
                        onClick={() => handleSelectCategory('all', 'All categories')}
                        type="button"
                        aria-label="View all recipes"
                    >
                        <span className={css.allLabel}>ALL CATEGORIES</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default CategoryList;
