import css from './PrivatPage.module.css';
import { NavLink } from 'react-router-dom';

export default function PrivatPage() {
    return (
        <div className={css.container}>
            <h1>Hello! Privat page is under construction. Please, wait a little bit.</h1>
            <NavLink to="/" className={css.linkSignIn}>
                | Back Home |
            </NavLink>
        </div>
    );
}
