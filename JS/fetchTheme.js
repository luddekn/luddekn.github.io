function fetchTheme() {
	const getStoredTheme = localStorage.getItem("theme");
	const getThemeIcon = document.getElementById("theme-icon");
	if (getStoredTheme) {
		if (getStoredTheme === "dark") {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add("dark");
			getThemeIcon.innerHTML = "wb_sunny";
		} else {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add("light");
			getThemeIcon.innerHTML = "nightlight_round";
		}
	} else {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add("light");
		getThemeIcon.innerHTML = "nightlight_round";
	}
}

fetchTheme();
