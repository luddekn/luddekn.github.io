const container = document.querySelector("#main-content");

function fetchProject() {
	fetch("./data/projects.json")
		.then((response) => response.json())
		.then((data) => {
			if (data.projects.length > 0) {
				data.projects.forEach((project) => {
					const divElement = document.createElement("div");
					divElement.classList.add("bg-gray-100", "shadow-md", "rounded-lg", "p-6", "mb-8", "dark:bg-gray-900", "transition-background", "duration-200", "ease-linear");
					divElement.innerHTML = `
						<p class="mb-4 rounded-md transition-background duration-200 ease-linear">${project.underEmbed} ${project.readmore}</p>
						<div class="bg-white dark:bg-gray-800 p-4 rounded-md transition-background duration-200 ease-linear">
							<a href="${project.url}" target="_blank">
								<div>
									<h3 class="text-blue-500 font-semibold text-2xl dark:text-red-500">${project.author} - ${project.title}</h3>
									<br/>
									<p>${project.description}</p>
									<br/>
									<p class="font-semibold">Created with: ${project.languages}</p>
								</div>
							</a>
						</div>
					`;
					container.appendChild(divElement);
				});
			} else {
				const pElement = document.createElement("p");
				pElement.innerHTML = "Nothing to see here! Come back later.";
				container.appendChild(pElement);
			}
		})
		.catch((error) => {
			const pElement = document.createElement("p");
			pElement.innerHTML = "<span class='font-bold'>Oops!</span> Something went wrong, try again later.";
			container.appendChild(pElement);
			console.error(`An error occurred while trying to fetch data: ${error}`);
		});
}

fetchProject();
