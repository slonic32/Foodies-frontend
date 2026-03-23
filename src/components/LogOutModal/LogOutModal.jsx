import Modal from '../Modal/Modal';
import css from './LogOutModal.module.css';

export default function LogOutModal({ onClose, onConfirm }) {
    return (
        <Modal onClose={onClose}>
            <div className={css.wrapper}>
                <h2 className={css.title}>Are you logging out?</h2>
                <p className={css.text}>You can always log back in at my time.</p>
                <div className={css.actions}>
                    <button type="button" className={css.logOutBtn} onClick={onConfirm}>
                        LOG OUT
                    </button>
                    <button type="button" className={css.cancelBtn} onClick={onClose}>
                        CANCEL
                    </button>
                </div>
            </div>
        </Modal>
    );
}
