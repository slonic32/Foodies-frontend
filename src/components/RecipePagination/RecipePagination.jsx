import { useMemo } from 'react';
import css from './RecipePagination.module.css';

const ITEMS_PER_PAGE = 12;

function RecipePagination({ currentPage, totalRecipes, onPageChange }) {
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecipes / ITEMS_PER_PAGE);
    }, [totalRecipes]);

    if (totalPages <= 1) {
        return null;
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={css.pagination}>
            <button
                className={css.navBtn}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <div className={css.pageNumbers}>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`${css.pageBtn} ${currentPage === page ? css.active : ''}`}
                        onClick={() => onPageChange(page)}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={css.navBtn}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}

export default RecipePagination;