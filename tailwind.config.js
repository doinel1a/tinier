/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'b-primary-dark': 'rgb(30, 41, 59)',
                'b-primary-light': 'rgb(226, 232, 240)',
                'primary-dark': '#fff',
                'primary-light': '#333',
            },
        },
    },
    plugins: [],
};
