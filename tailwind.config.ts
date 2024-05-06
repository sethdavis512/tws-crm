import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.purple
            }
        }
    },
    plugins: [require('flowbite/plugin')]
} satisfies Config;
