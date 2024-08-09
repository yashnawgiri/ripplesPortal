const tailwindcss = require('tailwindcss');
export default {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ]
};
