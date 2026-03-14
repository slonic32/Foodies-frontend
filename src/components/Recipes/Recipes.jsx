import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByCategory } from '../../redux/recipes/operations';
import { selectRecipes, selectIsLoading, selectError } from '../../redux/recipes/selectors';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import css from './Recipes.module.css';

function Recipes({ category, onBack }) {
    const dispatch = useDispatch();
    
    const recipes = useSelector(selectRecipes);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    
    const [currentPage, setCurrentPage] = useState(1);

    // Format category name (e.g., 'beef' -> 'Beef')
    const categoryDisplay = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'All Categories';

    useEffect(() => {
        if (category && category.toLowerCase() !== 'all') {
            dispatch(fetchRecipesByCategory(category));
        } else {
            dispatch(fetchRecipesByCategory(null));
        }
    }, [category, dispatch]);

    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={css.container}>
            {/* Back Button */}
            <button 
                className={css.backBtn}
                onClick={onBack}
                aria-label="Back to categories"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                        d="M15 18L9 12L15 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
                BACK
            </button>

            {/* Title */}
            <MainTitle className={css.title}>{categoryDisplay}</MainTitle>

            {/* Subtitle */}
            <Subtitle className={css.subtitle}>
                Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an
                expression of the most refined gastronomic desires.
            </Subtitle>

            {/* Filters */}
            <RecipeFilters onFilterChange={handleFilterChange} />

            {/* Recipe List */}
            <RecipeList recipes={recipes} isLoading={isLoading} error={error} />

            {/* Pagination */}
            <RecipePagination 
                currentPage={currentPage}
                totalRecipes={recipes.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Recipes;
