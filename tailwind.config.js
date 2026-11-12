/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#0D0D0D',
                'secondary': '#1A1A1A',
                'accent': '#C9A961',
                'accent-light': '#E5D5A8',
                'accent-dark': '#9B7E3C',
                'cream': '#F8F6F1',
            },
            fontFamily: {
                display: ['"Cormorant Garamond"', 'serif'],
                body: ['"Inter"', 'sans-serif'],
                arabic: ['"Kaman"', 'serif'],
            },
        },
    },
    plugins: [],
}
