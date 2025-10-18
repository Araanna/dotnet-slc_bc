// tailwind.config.js

import daisyui from 'daisyui'; // <-- Import the package

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Keep your font-family extension here
    extend: {
      fontFamily: {
        'italianno': ['Italianno', 'cursive'],
        'libertinus': ['Libertinus Serif Display', 'system-ui'],
        'dancing': ['Dancing Script', 'cursive'],
        // ... any other custom fonts
      },

      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
 
  plugins: [
    daisyui, 
  ],
  
 
  daisyui: {
  
    themes: ["light", "dark", "cupcake", "dracula"], 
  },
}