document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const cancelIcon = document.getElementById("cancelIcon");

  function openMenu() {
    menuOverlay.style.right = "0";
    hamburgerMenu.style.display = "none";
    cancelIcon.style.display = "block";
  }

  function closeMenu() {
    menuOverlay.style.right = "-60%";
    cancelIcon.style.display = "none";
    hamburgerMenu.style.display = "block";
  }

  const isMobileScreen = window.matchMedia("(max-width: 700px)").matches;

  if (isMobileScreen) {
    hamburgerMenu.addEventListener("click", openMenu);
    cancelIcon.addEventListener("click", closeMenu);
  }
});
