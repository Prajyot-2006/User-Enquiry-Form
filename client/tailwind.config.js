/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}", // include Flowbite React
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // use the official Flowbite plugin
  ],
};

// ask gpt about this line  flowbite.content(), flowbite.plugin() // we copied this line from flowbite-react website 

// we copied this code from tailwind website's guide 