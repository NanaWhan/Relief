// Real-time donation counter functionality
function initDonationCounter() {
  // Initial donation values
  let totalDonations = 148765; // Starting at GHS 148,765
  let totalDonors = 324;
  let donationGoal = 300000; // Goal: GHS 300,000

  // Elements
  const donationAmountElement = document.getElementById("donation-amount");
  const donorsCountElement = document.getElementById("donors-count");
  const donationProgressElement = document.getElementById("donation-progress");

  // Update the DOM
  function updateDonationDisplay() {
    if (donationAmountElement) {
      donationAmountElement.textContent = `GHS ${totalDonations.toLocaleString()}`;
    }

    if (donorsCountElement) {
      donorsCountElement.textContent = totalDonors;
    }

    if (donationProgressElement) {
      const progressPercentage = Math.min(
        100,
        Math.round((totalDonations / donationGoal) * 100)
      );
      donationProgressElement.style.width = `${progressPercentage}%`;
      donationProgressElement.setAttribute("aria-valuenow", progressPercentage);
    }
  }

  // Simulate occasional donations coming in
  function simulateNewDonations() {
    // Random donation between GHS 50 and GHS 2000
    const randomAmount = Math.floor(Math.random() * 1950) + 50;

    // Increase counters
    totalDonations += randomAmount;
    totalDonors += 1;

    // Update display
    updateDonationDisplay();

    // Show notification of new donation
    showDonationNotification(randomAmount);
  }

  // Show a temporary notification for new donations
  function showDonationNotification(amount) {
    const notificationContainer = document.getElementById(
      "donation-notification"
    );

    if (notificationContainer) {
      notificationContainer.textContent = `New donation: GHS ${amount.toLocaleString()}`;
      notificationContainer.classList.add("show");

      // Hide after 3 seconds
      setTimeout(() => {
        notificationContainer.classList.remove("show");
      }, 3000);
    }
  }

  // Set initial display
  updateDonationDisplay();

  // Simulate donations every 30-120 seconds
  setInterval(() => {
    if (Math.random() > 0.5) {
      // 50% chance of donation in each interval
      simulateNewDonations();
    }
  }, Math.floor(Math.random() * 90000) + 30000);

  // Add manual donation handler for the donate buttons
  const donateButtons = document.querySelectorAll(".donate-button");
  donateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // We'll just open the modal here as actual payment processing would be handled separately
      // But for demo purposes, let's simulate an immediate donation when they click "Donate"
      if (this.getAttribute("data-amount")) {
        const amount = parseInt(this.getAttribute("data-amount"));
        if (!isNaN(amount)) {
          totalDonations += amount;
          totalDonors += 1;
          updateDonationDisplay();
          showDonationNotification(amount);
        }
      }
    });
  });
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initDonationCounter();
});
