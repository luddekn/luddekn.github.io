/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.html", "./js/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						h1: { color: "theme('colors.blue.500')" },
						h2: { color: "theme('colors.blue.500')", fontWeight: "theme('fontWeight.bold')" },
						h3: { color: "theme('colors.blue.500')", fontWeight: "theme('fontWeight.bold')" },
						h4: { color: "theme('colors.blue.500')", fontWeight: "theme('fontWeight.bold')" },
						h5: { color: "theme('colors.blue.500')", fontWeight: "theme('fontWeight.bold')" },
						h6: { color: "theme('colors.blue.500')", fontWeight: "theme('fontWeight.bold')" },
						color: "theme('colors.black')",
						strong: "theme('colors.black')",
						pre: { backgroundColor: "theme('colors.gray.200')", color: "theme('colors.black')" },
						code: { color: "theme('colors.black')" },
						a: { color: "theme('colors.blue.500')" },
					},
				},
				dark: {
					css: {
						h1: { color: "theme('colors.red.500')" },
						h2: { color: "theme('colors.red.500')", fontWeight: "theme('fontWeight.bold')" },
						h3: { color: "theme('colors.red.500')", fontWeight: "theme('fontWeight.bold')" },
						h4: { color: "theme('colors.red.500')", fontWeight: "theme('fontWeight.bold')" },
						h5: { color: "theme('colors.red.500')", fontWeight: "theme('fontWeight.bold')" },
						h6: { color: "theme('colors.red.500')", fontWeight: "theme('fontWeight.bold')" },
						color: "theme('colors.white')",
						strong: "theme('colors.white')",
						pre: { backgroundColor: "theme('colors.gray.900')", color: "theme('colors.white')" },
						code: { color: "theme('colors.white')" },
						a: { color: "theme('colors.red.500')" },
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
	darkMode: "class",
};
