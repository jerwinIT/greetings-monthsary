document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loading = document.getElementById("loading");
  const mainContent = document.getElementById("main-content");
  const carousel = document.getElementById("carousel");
  const indicators = document.getElementById("indicators");
  const messageButton = document.getElementById("message-button");
  const message = document.getElementById("message");
  const backgroundMusic = document.getElementById("background-music");
  let isPlaying = false;

  // Function to play music
  function playMusic() {
    backgroundMusic.volume = 0.5; // Set volume to 50%
    backgroundMusic
      .play()
      .then(() => {
        isPlaying = true;
      })
      .catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
  }

  // Show loading animation for 3 seconds
  setTimeout(() => {
    loading.style.opacity = "0";
    mainContent.style.opacity = "1";
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 3000);

  // Carousel functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentSlide = 0;
  let slideInterval;

  // Create indicators
  carouselItems.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
    indicators.appendChild(indicator);
  });

  // Function to go to a specific slide
  function goToSlide(slideIndex) {
    if (slideIndex >= carouselItems.length) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = carouselItems.length - 1;
    }

    carousel.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update indicators
    document.querySelectorAll(".indicator").forEach((ind, index) => {
      if (index === slideIndex) {
        ind.classList.add("active");
      } else {
        ind.classList.remove("active");
      }
    });

    currentSlide = slideIndex;
  }

  // Function to go to the next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Function to reset the interval
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }

  // Start the carousel
  resetInterval();

  // Button click event - Show message AND play music
  messageButton.addEventListener("click", () => {
    // Show the message
    message.classList.add("show");

    // Play the music if it's not already playing
    if (!isPlaying) {
      playMusic();
    }
  });

  // Close message when clicking outside
  message.addEventListener("click", (e) => {
    if (e.target === message) {
      message.classList.remove("show");
    }
  });

  // Add keyboard support to close message with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && message.classList.contains("show")) {
      message.classList.remove("show");
    }
  });
});
