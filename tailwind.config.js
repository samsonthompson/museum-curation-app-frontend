module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: "rgb(64, 61, 57)",  // Accent text color
        background: "rgb(249, 247, 241)",  // Off-white background
        highlight: "rgb(175, 150, 125)",  // Hover color
        softGray: "rgb(212, 206, 196)",  // Soft gray for subtle text
      },
    },
  },
  plugins: [],
};
