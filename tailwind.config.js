/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-dark': 'rgb(30, 41, 59)',
                'primary-light': 'rgb(148, 163, 184)',
                'secondary-dark': 'rgb(71, 85, 105)',
                'secondary-light': 'rgb(226, 232, 240)',
                'color-dark': '#fff',
                'color-light': '#333',
            },
        },
    },
    plugins: [],
};
