/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          mono: ['var(--font-mono)', 'JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        },
        colors: {
          'terminal-black': '#0a0a0a',
          'terminal-dark': '#1a1a1a',
          'terminal-green': '#00ff41',
          'terminal-cyan': '#00d4ff',
          'terminal-white': '#f0f0f0',
          'terminal-gray': '#a0a0a0',
        },
        animation: {
          'typing': 'typing 3.5s steps(40, end)',
          'blink-caret': 'blink-caret 0.75s step-end infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'scanlines': 'scanlines 0.1s linear infinite',
        },
        keyframes: {
          typing: {
            'from': { width: '0' },
            'to': { width: '100%' }
          },
          'blink-caret': {
            'from, to': { 'border-color': 'transparent' },
            '50%': { 'border-color': 'currentColor' }
          },
          glow: {
            '0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 255, 65, 0.3)' },
            '50%': { 'box-shadow': '0 0 30px rgba(0, 255, 65, 0.6)' }
          },
          scanlines: {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100vh)' }
          }
        },
        backgroundImage: {
          'gradient-terminal': 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 100%)',
        }
      },
    },
    plugins: [],
  }