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
    },
  },
  // ADD DAISYUI PLUGIN HERE
  plugins: [
    daisyui, // <-- Add it to the plugins array
  ],
  
  // OPTIONAL: DaisyUI Configuration
  daisyui: {
    // Add any themes you want to include to reduce CSS size
    // Default is all themes, but listing them is faster for the build
    themes: ["light", "dark", "cupcake", "dracula"], 
  },
}