module.exports = {
    prefix: '',
    enabled: process.env.NODE_ENV === 'production',
    content: [
        './src/**/*.{html,ts}',
    ],
    fontFamily: {
        sans: ['Impact', 'Haettenschweiler', 'Franklin Gothic Bold', 'Charcoal',
            'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', 'sans serif'],
        serif: ['Merriweather', 'serif'],
    },
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};