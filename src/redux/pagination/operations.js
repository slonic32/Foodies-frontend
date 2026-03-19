import { setPagination, setCurrentPage } from './slice';

export const updatePaginationFromResponse = (paginationData) => (dispatch) => {
    dispatch(setPagination(paginationData));
};

export const updateCurrentPage = (page) => (dispatch) => {
    dispatch(setCurrentPage(page));
};
