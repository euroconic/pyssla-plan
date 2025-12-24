/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pyssla-red': '#E11A2B',
                'pyssla-blue': '#005CB9',
                'pyssla-green': '#00904A',
                'pyssla-yellow': '#F9D529',
                'pyssla-black': '#1D1D1B',
                'pyssla-white': '#FFFFFF',
                'pyssla-brown': '#794528',
                'pyssla-orange': '#F28020',
                'pyssla-purple': '#972D7F',
                'pyssla-pink': '#E65F8E',
            }
        },
    },
    plugins: [],
}
