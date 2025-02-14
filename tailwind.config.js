/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            raleway: ['Raleway', 'sans-serif'],
            fira: ['Fira Code', 'Courier New', 'monospace']
        },
        colors: {
            purple: {
                300: '#8625df',
                600: '#321D47',
                700: '#25163C',
                800: '#120F26',
                900: '#02010A',
            },
            pink: {
                100: '#FAF5FF',
                700: '#ECA0FF',
                800: '#c392ef',
                900: '#9D75C0',
            },
            green: {
                800: '#50fa7b',
                900: '#6edc78b3',
            },
            red: {
                500: '#ff5555',
            },
            yellow: {
                500: '#DBF227',
            },
            blue: {
                500: '#234fff',
            },
        },
        extend: {
            spacing: {
                '3xl': '112rem',
                '4xl': '132rem',
            },
            screens: {
                xs: '400px',
                '3xl': '1920px',
                '4xl': '2560px',
            },
            keyframes: {
                floating: {
                    '0%': { transform: 'translateY(-5%)' },
                    '50%': { transform: 'translateY(5%)' },
                    '100%': { transform: 'translateY(-5%)' },
                },
                floatingDeeper: {
                    '0%': { transform: 'translateY(5%)' },
                    '50%': { transform: 'translateY(16%)' },
                    '100%': { transform: 'translateY(5%)' },
                },
            },
            animation: {
                floating: 'floating 3s ease-in-out infinite',
                floatingDeeper: 'floatingDeeper 3300ms ease-in-out infinite',
                'spin-delayed': 'spin 1s linear infinite 0.5s',
            },
            boxShadow: {
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            }        
        },
    },
    plugins: [
        import('@tailwindcss/typography')
    ],
}

