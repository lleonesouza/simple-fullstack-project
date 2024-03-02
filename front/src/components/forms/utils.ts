const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

export const validateField = (name: string, value: any) => {
    switch (name) {
        case 'name':
            return value.length < 3 ? 'Name must be at least 3 characters' : '';
        case 'age':
            return isNaN(value) || value <= 0 ? 'Age must be a number greater than 0' : '';
        case 'email':
            return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
        case 'avatar':
            return isValidImageUrl(value) ? '' : 'Invalid avatar URL';
        default:
            return '';
    }
};