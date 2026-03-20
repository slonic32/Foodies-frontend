import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, fetchPopularRecipes } from '../../redux/recipes/recipePageOperations';
import { clearCurrentRecipe } from '../../redux/recipes/slice';
import { fetchUserFavorites } from '../../redux/favorites/favoritesOperations';
import { selectCurrentRecipe, selectIsLoading } from '../../redux/recipes/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import PopularRecipes from '../PopularRecipes/PopularRecipes';
import PathInfo from '../PathInfo/PathInfo';
import css from './RecipePage.module.css';

function RecipePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(selectCurrentRecipe);
    const isLoading = useSelector(selectIsLoading);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRecipeById(id));
        dispatch(fetchPopularRecipes());
        return () => {
            dispatch(clearCurrentRecipe());
        };
    }, [id, dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserFavorites());
        }
    }, [isLoggedIn, dispatch]);

    return (
        <div className={css.page}>
            <Header
                onSignInClick={() => setIsSignInOpen(true)}
                onSignUpClick={() => setIsSignUpOpen(true)}
                onLogOutClick={() => {}}
            />
            <main className={css.main}>
                <PathInfo pageTitle={recipe?.title || 'Recipe'} />
                {isLoading && <div className={css.loading}>Loading...</div>}
                {recipe && (
                    <>
                        <div className={css.recipeLayout}>
                            <RecipeMainInfo recipe={recipe} onOpenSignIn={() => setIsSignInOpen(true)} />
                            <div className={css.recipeRight}>
                                <RecipeIngredients ingredients={recipe.ingredients} />
                                <RecipePreparation recipe={recipe} />
                            </div>
                        </div>
                        <div className={css.popularWrapper}>
                            <PopularRecipes />
                        </div>
                    </>
                )}
            </main>
            <Footer />

            {isSignInOpen && (
                <SignInModal
                    onClose={() => setIsSignInOpen(false)}
                    onCreateAccount={() => {
                        setIsSignInOpen(false);
                        setIsSignUpOpen(true);
                    }}
                />
            )}
            {isSignUpOpen && (
                <SignUpModal
                    onClose={() => setIsSignUpOpen(false)}
                    onSignIn={() => {
                        setIsSignUpOpen(false);
                        setIsSignInOpen(true);
                    }}
                />
            )}
        </div>
    );
}

export default RecipePage;
