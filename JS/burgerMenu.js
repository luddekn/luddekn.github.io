const burgerMenu = document.querySelector("#burger-menu");
const headerLinks = document.querySelector("#header-links");

burgerMenu.addEventListener("click", () => {
	headerLinks.classList.toggle("hidden");
});
