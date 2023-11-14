import type { Config } from 'tailwindcss';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
    darkMode: 'class',
    theme: {
        extend: {}
    },
    plugins: [require('flowbite/plugin')]
} satisfies Config;
