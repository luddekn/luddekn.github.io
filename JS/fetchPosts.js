document.addEventListener("DOMContentLoaded", () => {
	fetch("posts/posts.json")
		.then((response) => response.json())
		.then((posts) => {
			posts.sort((a, b) => new Date(b.date) - new Date(a.date));

			const articleContainer = document.querySelector("#main-content");
			const searchForm = document.querySelector("#search-form");
			const searchInput = document.querySelector("#search-input");

			function displayPosts(filteredPosts) {
				articleContainer.innerHTML = "";
				if (posts.length > 0) {
					if (filteredPosts.length === 0) {
						articleContainer.innerHTML = "<h2 class='text-center mb-8 text-2xl font-bold'>No matching search results.</h2>";
						return;
					}
					filteredPosts.forEach((post) => {
						const article = document.createElement("article");
						article.classList.add("bg-gray-100", "shadow-md", "rounded-lg", "p-6", "mb-8", "dark:bg-gray-900", "transition-background", "duration-200", "ease-linear");
						let postTitle = post.title.split(" ").join("-").toLowerCase();
						article.innerHTML = `
							<header class="mb-4">
								<h2 class="text-2xl font-bold mb-2 text-blue-500 dark:text-red-500">${post.title}</h2>
							</header>
							<p class="mb-4">
								${post.summary}
							</p>
							<footer class="text-sm flex gap-9">
								<span class="flex items-center">
									<span class="material-icons mr-1">person</span>
									<a href="#" class="hover:text-blue-500 dark:hover:text-red-500">${post.author}</a>
								</span>
								<span class="flex items-center">
									<span class="material-icons mr-1">date_range</span>
									${post.displayDate}
								</span>
								<span class="flex items-center">
									<span class="material-icons mr-1">folder</span>
									${post.category}
								</span>
							</footer>
							<a href="post.html?name=${postTitle}" class="text-blue-500 hover:underline font-medium mt-4 inline-block dark:text-red-500">Read More</a>
						`;
						articleContainer.appendChild(article);
					});
				} else {
					const pElement = document.createElement("p");
					pElement.innerHTML = "Nothing to see here! Come back later.";
					articleContainer.appendChild(pElement);
				}
			}

			displayPosts(posts);

			searchForm.addEventListener("submit", (e) => {
				e.preventDefault();

				const searchTerm = searchInput.value.toLowerCase();

				const filteredPosts = posts.filter((post) => {
					const titleMatch = post.title.toLowerCase().includes(searchTerm);
					const categoryMatch = post.category.toLowerCase().includes(searchTerm);
					const dateMatch = post.date.toLowerCase().includes(searchTerm);

					return titleMatch || categoryMatch || dateMatch;
				});
				displayPosts(filteredPosts);
			});
		})
		.catch((error) => console.log(error));
});
