document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    const expanded =
      menuBtn.getAttribute("aria-expanded") === "true" ? "false" : "true";
    menuBtn.setAttribute("aria-expanded", expanded);
    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("slide-down");
    } else {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("slide-down");
    }
  });

  // Animate fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Adjust this to make it appear sooner/later
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.style.animationPlayState = "running";
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    fader.style.animationPlayState = "paused"; // Pause initially
    appearOnScroll.observe(fader);
  });

  // Optional: Close mobile menu when a link inside it is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("slide-down");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
});

// script.js (Ini tetap sama seperti sebelumnya)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card-hover").forEach((card) => {
    const fullDescriptionSpan = card.querySelector(".full-description");
    const readMoreBtn = card.querySelector(".read-more-btn");
    const readLessBtn = card.querySelector(".read-less-btn");

    if (readMoreBtn && readLessBtn && fullDescriptionSpan) {
      readMoreBtn.addEventListener("click", () => {
        fullDescriptionSpan.classList.remove("hidden");
        readMoreBtn.classList.add("hidden");
        readLessBtn.classList.remove("hidden");
      });

      readLessBtn.addEventListener("click", () => {
        fullDescriptionSpan.classList.add("hidden");
        readMoreBtn.classList.remove("hidden");
        readLessBtn.classList.add("hidden");
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const certificateImages = document.querySelectorAll("#certificate .grid img");

  certificateImages.forEach((img) => {
    img.style.cursor = "pointer"; // Mengubah kursor menjadi pointer saat diarahkan ke gambar
    img.addEventListener("click", function () {
      const imageUrl = this.getAttribute("src");
      createAndDisplayPopup(imageUrl);
    });
  });

  function createAndDisplayPopup(imageUrl) {
    const popupOverlay = document.createElement("div");
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = "0";
    popupOverlay.style.left = "0";
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popupOverlay.style.zIndex = "1000";
    popupOverlay.style.display = "flex";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";

    const popupImage = document.createElement("img");
    popupImage.src = imageUrl;
    popupImage.style.maxWidth = "90%";
    popupImage.style.maxHeight = "90%";
    popupImage.style.objectFit = "contain";
    popupImage.style.borderRadius = "8px"; // Sedikit lengkungan pada sudut gambar popup
    popupImage.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.5)"; // Efek bayangan pada gambar popup

    popupOverlay.appendChild(popupImage);
    document.body.appendChild(popupOverlay);

    // Menutup popup saat overlay atau gambar diklik
    popupOverlay.addEventListener("click", function () {
      document.body.removeChild(popupOverlay);
    });
  }
});

function typeWriter(text, element, delay = 100) {
  let displayText = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      displayText += text.charAt(i);
      element.textContent = displayText;
      i++;
      setTimeout(type, delay);
    } else {
      // Reset and start again after a pause
      setTimeout(() => {
        displayText = "";
        i = 0;
        type();
      }, 2000);
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("typing-text");
  const text = "Hi, I'm Ari Purnomo";
  typeWriter(text, textElement);
});

function handleDownload(event) {
  const link = event.currentTarget;
  const filePath = link.href;
  
  // Check if file exists
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        event.preventDefault();
        alert('Sorry, the CV file is not available at the moment.');
      }
    })
    .catch(() => {
      event.preventDefault();
      alert('Sorry, there was an error downloading the CV.');
    });
}