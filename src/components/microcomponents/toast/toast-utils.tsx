export const showToast = (title: string, message: string, status: string, autoClose?: number, onClick?: () => void) => {
    const event = new CustomEvent('add-toast', { detail: { title, message, status, autoClose, onClick } });
    window.dispatchEvent(event);
};