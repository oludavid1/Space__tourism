// Function to update the page content based on the selected technology
function updateTechnologyContent(technology) {
  document.getElementById("technologyName").textContent = technology.name;
  document.getElementById("technologyDescription").textContent =
    technology.description;

  // Update the image
  const technologyImage = document.getElementById("technologyImage");
  if (window.innerWidth <= 1024) {
    technologyImage.src = technology.images.landscape;
  } else {
    technologyImage.src = technology.images.portrait;
  }
  technologyImage.alt = "Image of " + technology.name;
}

// Function to handle the click event and update the content
function handleTechnologyClick(technologyIndex) {
  const selectedTechnology = technologyData[technologyIndex];
  updateTechnologyContent(selectedTechnology);

  // Remove the 'current_technology' class from all links
  const technologyLinks = document.querySelectorAll(".technology_nav a");
  technologyLinks.forEach((link) => {
    link.classList.remove("current_technology");
  });

  // Add the 'current_technology' class to the clicked link
  const clickedLink = technologyLinks[technologyIndex];
  clickedLink.classList.add("current_technology");
}

let technologyData; // Declare technologyData variable outside the scope

// Load initial technology data (Vehicle) when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch the data from the JSON file
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the fetched data and store it in the technologyData variable
      technologyData = data.technology;
      const initialTechnologyIndex = 0; // Index of the "Vehicle" technology in the technology array
      const initialTechnology = technologyData[initialTechnologyIndex];
      updateTechnologyContent(initialTechnology);

      const technologyLinks = document.querySelectorAll(".technology_nav a");
      technologyLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handleTechnologyClick(index);
        });
      });

      // Add the 'current_technology' class to the first navigation link (Moon)
      technologyLinks[initialTechnologyIndex].classList.add(
        "current_technology"
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Event listener for window resize to handle responsive image updates
window.addEventListener("resize", () => {
  // Get the current selected technology index
  const currentTechnologyIndex = Array.from(
    document.querySelectorAll(".technology_nav a")
  ).findIndex((link) => link.classList.contains("current_technology"));
  // Get the corresponding technology object from the data
  const currentTechnology = technologyData[currentTechnologyIndex];
  // Update the content with the appropriate image source
  updateTechnologyContent(currentTechnology);
});
