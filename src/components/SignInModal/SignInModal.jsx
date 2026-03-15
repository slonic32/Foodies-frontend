import Modal from '../Modal/Modal';
import SignInFormModal from '../SignInFormModal/SignInFormModal';

export default function SignInModal({ onClose, onCreateAccount }) {
    return (
        <Modal onClose={onClose}>
            <SignInFormModal onClose={onClose} onCreateAccount={onCreateAccount} />
        </Modal>
    );
}
