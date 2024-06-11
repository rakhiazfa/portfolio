import type { Config } from 'tailwindcss';

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                dark: '#010101',
                'semi-dark': '#333333',
                light: '#F7F7F7',
                'semi-light': '#888888'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite'
            },
            keyframes: {
                spin: {
                    '0%, ': { rotate: '0deg' },
                    '50%': { scale: '1 1.5' },
                    '100%': { rotate: '360deg' }
                }
            },
            boxShadow: {
                input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`
            }
        }
    },
    plugins: [addVariablesForColors]
};

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

    addBase({
        ':root': newVars
    });
}

export default config;
