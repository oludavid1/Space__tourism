// Function to update the page content based on the selected destination
function updateDestinationContent(destination) {
  document.getElementById("destinationName").textContent = destination.name;
  document.getElementById("destinationDescription").textContent =
    destination.description;
  document.getElementById("destinationDistance").textContent =
    destination.distance;
  document.getElementById("destinationTravelTime").textContent =
    destination.travel;

  // Update the image
  const destinationImage = document.getElementById("destinationImage");
  destinationImage.src = destination.images.webp;
  destinationImage.alt = "Image of " + destination.name;
}

// Function to handle the click event and update the content
function handleDestinationClick(destinationIndex) {
  const selectedDestination = destinationsData[destinationIndex];
  updateDestinationContent(selectedDestination);

  // Remove the 'current_nav' class from all links
  const destinationLinks = document.querySelectorAll(
    ".destination_navigations a"
  );
  destinationLinks.forEach((link) => {
    link.classList.remove("current_nav");
  });

  // Add the 'current_nav' class to the clicked link
  const clickedLink = destinationLinks[destinationIndex];
  clickedLink.classList.add("current_nav");
}

let destinationsData; // Declare destinationsData variable outside the scope

// Load initial destination data (Moon) when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch the data from the JSON file
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the fetched data and store it in the destinationsData variable
      destinationsData = data.destinations;
      const initialDestinationIndex = 0; // Index of the "Moon" destination in the destinations array
      const initialDestination = destinationsData[initialDestinationIndex];
      updateDestinationContent(initialDestination);

      const destinationLinks = document.querySelectorAll(
        ".destination_navigations a"
      );
      destinationLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handleDestinationClick(index);
        });
      });

      // Add the 'current_nav' class to the first navigation link (Moon)
      destinationLinks[initialDestinationIndex].classList.add("current_nav");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
