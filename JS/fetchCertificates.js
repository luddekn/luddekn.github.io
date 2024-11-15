const container = document.querySelector("#main-content");

function fetchCerts() {
	fetch("./data/certifications.json")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.certifications.length > 0) {
				data.certifications.forEach((cert) => {
					const divElement = document.createElement("div");
					divElement.classList.add("bg-gray-100", "shadow-md", "rounded-lg", "p-6", "mb-8", "dark:bg-gray-900", "transition-background", "duration-200", "ease-linear");

					divElement.innerHTML = `
            <header class="mb-4">
              <h2 class="text-2xl font-bold mb-2 text-blue-500 dark:text-red-500">${cert.title}</h2>
            </header>
            <div class="flex justify-between items-start">
              <!-- Main content on the left -->
              <div class="flex-1">
                <p class="mb-4">
                  Issuer: ${cert.issuer}
                </p>
                <p class="mb-4">
                  Date: ${cert.date}
                </p>
                <p class="mb-4">
                  Verify: <a class="text-blue-500 hover:underline font-medium mt-4 inline-block dark:text-red-500" href="${cert.link}" target="_blank">${cert.verifySite}</a>
                </p>
              </div>
              <!-- Image on the right, resized -->
              <img style="width: 100px; height: 100px;" src="${cert.image}" alt="Cert Badge"/>
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

fetchCerts();
