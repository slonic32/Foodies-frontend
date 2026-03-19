export const selectRecipes = (state) => state.recipes.items;
export const selectSelectedRecipe = (state) => state.recipes.selectedRecipe;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectPopularRecipes = (state) => state.recipes.popularRecipes;
export const selectIsLoading = (state) => state.recipes.isLoading;
export const selectError = (state) => state.recipes.error;
