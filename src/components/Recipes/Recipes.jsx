import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByCategory } from '../../redux/recipes/operations';
import { selectRecipes, selectIsLoading, selectError } from '../../redux/recipes/selectors';
import { selectCurrentPage, selectTotalRecipes } from '../../redux/pagination/selectors';
import { setPagination } from '../../redux/pagination/slice';
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
    const currentPage = useSelector(selectCurrentPage);
    const totalRecipes = useSelector(selectTotalRecipes);

    const [activeFilters, setActiveFilters] = useState({ ingredients: '', area: '' });

    // Format category name (e.g., 'beef' -> 'Beef')
    const categoryDisplay = category
        ? typeof category === 'string' 
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : category.name
        : 'All Categories';

    const categoryId = category?.id || 'all';

    useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(fetchRecipesByCategory({ categoryId, page: 1, limit: 12 }));
            if (result.payload?.pagination) {
                dispatch(setPagination(result.payload.pagination));
            }
        };
        fetchData();
    }, [categoryId, dispatch]);

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
        const fetchData = async () => {
            const result = await dispatch(fetchRecipesByCategory({
                categoryId,
                area: filters.area || undefined,
                ingredient: filters.ingredients || undefined,
                page: 1,
                limit: 12,
            }));
            if (result.payload?.pagination) {
                dispatch(setPagination(result.payload.pagination));
            }
        };
        fetchData();
    };

    const handlePageChange = (page) => {
        const fetchData = async () => {
            const result = await dispatch(fetchRecipesByCategory({
                categoryId,
                area: activeFilters.area || undefined,
                ingredient: activeFilters.ingredients || undefined,
                page,
                limit: 12,
            }));
            if (result.payload?.pagination) {
                dispatch(setPagination(result.payload.pagination));
            }
        };
        fetchData();
    };

    return (
        <div className={css.container}>
            {/* Back Button */}
            <button 
                className={css.backBtn}
                onClick={onBack}
                aria-label="Back to categories"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7136 8.00058L3.28549 7.99956" stroke="#050505" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.99902 12.7141L3.28549 7.99956L8.00004 3.28602" stroke="#050505" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
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

            {/* Content layout: filters left, recipes right */}
            <div className={css.content}>
                <aside className={css.sidebar}>
                    <RecipeFilters onFilterChange={handleFilterChange} />
                </aside>
                <div className={css.main}>
                    {/* Recipe List */}
                    <RecipeList recipes={recipes} isLoading={isLoading} error={error} />

                    {/* Pagination */}
                    <RecipePagination 
                        currentPage={currentPage}
                        totalRecipes={totalRecipes}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Recipes;
