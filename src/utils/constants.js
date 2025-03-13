export const DICEBEAR_URL = (username) => `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}?mood=happy`;

export const regexPatterns = {
  email: /\S+@\S+\.\S+/,
  website: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export const errorMessages = {
  required: (field) => `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
  emailInvalid: 'Email is invalid',
  websiteInvalid: 'Website URL is invalid',
  deleteConfirmation: 'Are you sure you want to delete this user?'
};
