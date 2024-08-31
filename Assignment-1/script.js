// This code provide functionality if one card is Expanded other should be closed.
// Select the container element that holds all the cards
const cardsContainer = document.querySelector(".container");

// Add a click event listener to the container
cardsContainer.addEventListener("click", (e) => {
  // Find the closest element with the class 'card' to the clicked target
  const target = e.target.closest(".card");

  // If no card was clicked, exit the function
  if (!target) return;

  // Remove the 'active' class from all cards
  cardsContainer.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("active");
  });

  // Add the 'active' class to the clicked card
  target.classList.add("active");
});
