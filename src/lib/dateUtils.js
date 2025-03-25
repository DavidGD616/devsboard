export const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return '1 day ago';
    } else if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else {
        const months = Math.floor(diffDays / 30); // approx months
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
};