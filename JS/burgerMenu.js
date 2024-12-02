document.addEventListener('DOMContentLoaded', () => {
	const burgerMenu = document.getElementById('burger-menu');
	const headerLinks = document.getElementById('header-links');

	burgerMenu.addEventListener('click', () => {
		headerLinks.classList.toggle('hidden');
	});
});

