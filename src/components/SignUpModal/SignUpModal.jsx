import Modal from '../Modal/Modal';
import SignUpFormModal from '../SignUpFormModal/SignUpFormModal';

export default function SignUpModal({ onClose, onSignIn }) {
    return (
        <Modal onClose={onClose}>
            <SignUpFormModal onClose={onClose} onSignIn={onSignIn} />
        </Modal>
    );
}
