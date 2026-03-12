import SignInForm from '../../components/SignInForm/SignInForm';

import css from './SignInPage.module.css';

export default function SignInPage() {
    return (
        <div className={css.container}>
            <div className={css.page}>
                <SignInForm />
            </div>
        </div>
    );
}
