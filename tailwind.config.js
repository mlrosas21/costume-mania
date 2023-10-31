/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        '5vw': '5vw'
      }
    },
    colors:{
      'purple-1': '#110633',
      'purple-2': '#710A8B',
      'purple-3': '#B71FD0',
      'orange-1': '#FF941A',
      'orange-2': '#F25F29',
      'white': 'white'
    },
  },
  plugins: [],
}