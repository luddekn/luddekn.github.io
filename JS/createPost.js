document.addEventListener("DOMContentLoaded", () => {
	const urlParameter = new URLSearchParams(window.location.search);
	const postName = urlParameter.get("name");

	if (postName) {
		history.pushState(null, "", `${postName}`);

		fetch(`./posts/${postName}.md`)
			.then((response) => {
				return response.text();
			})
			.then((markdownContent) => {
				// Parse markdown to HTML
				const content = marked.parse(markdownContent);

				// Select the container and set its inner HTML
				const container = document.querySelector("#post-content");
				container.innerHTML = `
               ${content}
            `;
			})
			.catch((error) => {
				console.error("Error fetching or parsing the markdown content:", error);
			});
	}
});
