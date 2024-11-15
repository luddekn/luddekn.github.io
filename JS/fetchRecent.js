document.addEventListener("DOMContentLoaded", () => {
	const container = document.querySelector("#recent-post-container");

	fetch("./posts/posts.json")
		.then((response) => {
			return response.json();
		})
		.then((posts) => {
			const recentPost = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
			if (recentPost.length > 0) {
				recentPost.forEach((post) => {
					let postLink = post.title.split(" ");
					postLink = postLink.join("-");
					postLink = postLink.toLowerCase();
					const listElement = document.createElement("li");
					listElement.innerHTML = `<a href="post.html?name=${postLink}" class="hover:underline">${post.title}</a>`;
					container.appendChild(listElement);
				});
			} else {
				const emptyArray = document.createElement("li");
				emptyArray.innerHTML = "Nothing to see here!";
				container.appendChild(emptyArray);
			}
		})
		.catch((error) => {
			const errorElement = document.createElement("li");
			pElement.innerHTML = "<span class='font-bold'>Oops!</span> Something went wrong.";
			container.appendChild(errorElement);
			console.error(`An error occurred while trying to fetch data: ${error}`);
		});
});
