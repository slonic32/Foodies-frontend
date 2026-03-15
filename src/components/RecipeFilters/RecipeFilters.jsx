import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, fetchAreas } from '../../redux/filters/operations';
import { selectIngredients, selectAreas } from '../../redux/filters/selectors';
import css from './RecipeFilters.module.css';

function RecipeFilters({ onFilterChange }) {
    const dispatch = useDispatch();
    const ingredientsList = useSelector(selectIngredients);
    const areasList = useSelector(selectAreas);

    const [filters, setFilters] = useState({
        ingredients: '',
        area: '',
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    const ingredientsRef = useRef(null);
    const areaRef = useRef(null);

    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(fetchAreas());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                ingredientsRef.current &&
                !ingredientsRef.current.contains(e.target) &&
                areaRef.current &&
                !areaRef.current.contains(e.target)
            ) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (name) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    const handleSelect = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
        setOpenDropdown(null);
    };

    const getIngredientLabel = () => {
        if (!filters.ingredients) return 'Ingredients';
        const found = ingredientsList.find(
            (item) => String(item.id) === String(filters.ingredients)
        );
        return found ? found.name : 'Ingredients';
    };

    const getAreaLabel = () => {
        if (!filters.area) return 'Area';
        const found = areasList.find(
            (item) => String(item.id) === String(filters.area)
        );
        return found ? found.name : 'Area';
    };

    return (
        <div className={css.filtersContainer}>
            {/* Ingredients Dropdown */}
            <div className={css.dropdown} ref={ingredientsRef}>
                <button
                    type="button"
                    className={`${css.dropdownToggle} ${openDropdown === 'ingredients' ? css.open : ''} ${filters.ingredients ? css.hasValue : ''}`}
                    onClick={() => toggleDropdown('ingredients')}
                    aria-label="Filter by ingredients"
                    aria-expanded={openDropdown === 'ingredients'}
                >
                    <span className={css.dropdownLabel}>{getIngredientLabel()}</span>
                    <svg
                        className={`${css.chevron} ${openDropdown === 'ingredients' ? css.chevronOpen : ''}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {openDropdown === 'ingredients' && (
                    <ul className={css.dropdownMenu}>
                        <li>
                            <button
                                type="button"
                                className={`${css.dropdownItem} ${filters.ingredients === '' ? css.activeItem : ''}`}
                                onClick={() => handleSelect('ingredients', '')}
                            >
                                All Ingredients
                            </button>
                        </li>
                        {ingredientsList.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    className={`${css.dropdownItem} ${String(filters.ingredients) === String(item.id) ? css.activeItem : ''}`}
                                    onClick={() => handleSelect('ingredients', item.id)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Area Dropdown */}
            <div className={css.dropdown} ref={areaRef}>
                <button
                    type="button"
                    className={`${css.dropdownToggle} ${openDropdown === 'area' ? css.open : ''} ${filters.area ? css.hasValue : ''}`}
                    onClick={() => toggleDropdown('area')}
                    aria-label="Filter by area"
                    aria-expanded={openDropdown === 'area'}
                >
                    <span className={css.dropdownLabel}>{getAreaLabel()}</span>
                    <svg
                        className={`${css.chevron} ${openDropdown === 'area' ? css.chevronOpen : ''}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                {openDropdown === 'area' && (
                    <ul className={css.dropdownMenu}>
                        <li>
                            <button
                                type="button"
                                className={`${css.dropdownItem} ${filters.area === '' ? css.activeItem : ''}`}
                                onClick={() => handleSelect('area', '')}
                            >
                                All Areas
                            </button>
                        </li>
                        {areasList.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    className={`${css.dropdownItem} ${String(filters.area) === String(item.id) ? css.activeItem : ''}`}
                                    onClick={() => handleSelect('area', item.id)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default RecipeFilters;