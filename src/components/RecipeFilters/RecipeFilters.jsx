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

    const handleReset = () => {
        const resetFilters = { ingredients: '', area: '' };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className={css.filtersContainer}>
            <div className={css.filterGroup}>
                <select
                    className={css.select}
                    value={filters.ingredients}
                    onChange={handleIngredientChange}
                    aria-label="Filter by ingredients"
                >
                    <option value="">Ingredients</option>
                    {/* Options will be populated from API */}
                </select>
            </div>

            <div className={css.filterGroup}>
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

            <button
                className={css.resetBtn}
                onClick={handleReset}
                aria-label="Reset filters"
            >
                Reset
            </button>
        </div>
    );
}

export default RecipeFilters;