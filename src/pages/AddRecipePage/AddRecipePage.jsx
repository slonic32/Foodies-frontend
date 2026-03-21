import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import css from './AddRecipePage.module.css';

function AddRecipePage() {
    return (
        <div className={css.page}>
            <Header />

            <main className={css.main}>
                <div className={css.container}>
                    <PathInfo current="ADD RECIPE" />

                    <div className={css.titleSection}>
                        <MainTitle>ADD RECIPE</MainTitle>
                        <Subtitle className={css.subtitle}>
                            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
                            with us.
                        </Subtitle>
                    </div>

                    <AddRecipeForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AddRecipePage;
