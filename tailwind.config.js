/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust if needed
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}', // Add this for ShadCN
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
