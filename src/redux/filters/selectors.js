export const selectIngredients = (state) => state.filters.ingredients.items;
export const selectIngredientsLoading = (state) => state.filters.ingredients.isLoading;
export const selectIngredientsError = (state) => state.filters.ingredients.error;

export const selectAreas = (state) => state.filters.areas.items;
export const selectAreasLoading = (state) => state.filters.areas.isLoading;
export const selectAreasError = (state) => state.filters.areas.error;
