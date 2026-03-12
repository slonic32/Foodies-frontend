import css from './HomePage.module.css';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return (
        <div className={css.container}>
            <h1>Hello! Home page is under construction. Please, wait a little bit.</h1>
            <NavLink to="/signup">| Try tracker |</NavLink>
            <NavLink to="/signin">| Sign In |</NavLink>
        </div>
    );
}
export default HomePage;
