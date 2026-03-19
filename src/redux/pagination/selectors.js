export const selectPagination = (state) => state.pagination;
export const selectCurrentPage = (state) => state.pagination.page;
export const selectTotalRecipes = (state) => state.pagination.total;
export const selectTotalPages = (state) => state.pagination.totalPages;
export const selectLimit = (state) => state.pagination.limit;
