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
        </div>
    );
}

export default RecipePagination;