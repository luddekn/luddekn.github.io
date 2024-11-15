const button = document.getElementById("change-theme");
const currentTheme = document.getElementById("root");
const getThemeIcon = document.getElementById("theme-icon");

function changeTheme() {
	if (currentTheme.classList.contains("dark")) {
		currentTheme.classList.replace("dark", "light");
		getThemeIcon.innerHTML = "nightlight_round";
		localStorage.setItem("theme", "light");
	} else {
		currentTheme.classList.replace("light", "dark");
		getThemeIcon.innerHTML = "wb_sunny";
		localStorage.setItem("theme", "dark");
	}
}

function setLocalStorageTheme() {
	const getTheme = localStorage.getItem("theme");

	if (getTheme === "dark") {
		currentTheme.classList.remove("light");
		currentTheme.classList.add(getTheme);
		getThemeIcon.innerHTML = "wb_sunny";
	} else {
		currentTheme.classList.remove("dark");
		currentTheme.classList.add(getTheme);
		getThemeIcon.innerHTML = "nightlight_round";
	}
}

button.addEventListener("click", changeTheme);

window.addEventListener("DOMContentLoaded", setLocalStorageTheme);
