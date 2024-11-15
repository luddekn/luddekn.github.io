const getYearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
getYearElement.innerHTML = `Copyright &copy; ${currentYear} Ludvik Kristoffersen. All rights reserved.`;
