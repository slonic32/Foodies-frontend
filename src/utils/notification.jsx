import toast from 'react-hot-toast';

export function showNotification(message, type = 'success') {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'error') {
        toast.error(message);
    } else {
        toast(message);
    }
}
