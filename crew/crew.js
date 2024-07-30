// Function to update the page content based on the selected crew member
function updateCrewContent(crew) {
  document.getElementById("crewName").textContent = crew.name;
  document.getElementById("crewBio").textContent = crew.bio;
  document.getElementById("crewRole").textContent = crew.role;

  // Update the image
  const crewImage = document.getElementById("crewImage");
  crewImage.src = crew.images.webp;
  crewImage.alt = "Image of " + crew.role;
}

// Function to handle the click event and update the content
function handleCrewClick(crewIndex) {
  const selectedCrew = crewsData[crewIndex];
  updateCrewContent(selectedCrew);

  // Remove the 'current_crew' class from all links
  const crewLinks = document.querySelectorAll(".crew_navigations a");
  crewLinks.forEach((link) => {
    link.classList.remove("current_crew");
  });

  // Add the 'current_crew' class to the clicked link
  const clickedLink = crewLinks[crewIndex];
  clickedLink.classList.add("current_crew");
}

let crewsData; // Declare crewsData variable outside the scope

// Load initial crew data (Commander) when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch the data from the JSON file
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the fetched data and store it in the crewsData variable
      crewsData = data.crew;
      const initialCrewIndex = 0; // Index of the "Commander" crew in the crew array
      const initialCrew = crewsData[initialCrewIndex];
      updateCrewContent(initialCrew);

      const crewLinks = document.querySelectorAll(".crew_navigations a");
      crewLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handleCrewClick(index);
        });
      });

      // Add the 'current_crew' class to the first navigation link (Commander)
      crewLinks[initialCrewIndex].classList.add("current_crew");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
