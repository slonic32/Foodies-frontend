import { useState } from 'react';
import css from './RecipeFilters.module.css';

function RecipeFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        ingredients: '',
        area: '',
    });

    const handleIngredientChange = (e) => {
        const newFilters = { ...filters, ingredients: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleAreaChange = (e) => {
        const newFilters = { ...filters, area: e.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className={css.filtersContainer}>
            <select
                className={css.select}
                value={filters.ingredients}
                onChange={handleIngredientChange}
                aria-label="Filter by ingredients"
            >
                <option value="">Ingredients</option>
                {/* Options will be populated from API */}
            </select>

            <select
                className={css.select}
                value={filters.area}
                onChange={handleAreaChange}
                aria-label="Filter by area"
            >
                <option value="">Area</option>
                {/* Options will be populated from API */}
            </select>
        </div>
    );
}

export default RecipeFilters;