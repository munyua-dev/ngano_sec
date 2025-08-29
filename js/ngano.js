// hide and show navigation links in mobile view

const navLinks = document.getElementById("navLinks");
const menuToggle = document.querySelector(".menu-toggle");

// If .menu-toggle doesn't exist, create it and insert in nav
if (!menuToggle) {
  const nav = document.querySelector("nav");
  const btn = document.createElement("span");
  btn.className = "menu-toggle fa fa-bars";
  btn.setAttribute("aria-label", "Toggle navigation menu");
  nav.appendChild(btn);
}

const menuBtn = document.querySelector(".menu-toggle");

function openMenu() {
  navLinks.style.right = "0";
  menuBtn.classList.remove("fa-bars");
  menuBtn.classList.add("fa-times");
}

function closeMenu() {
  navLinks.style.right = "-45vw";
  menuBtn.classList.remove("fa-times");
  menuBtn.classList.add("fa-bars");
}

// Initial state: bars
closeMenu();

menuBtn.onclick = function (e) {
  e.stopPropagation();
  if (navLinks.style.right === "0" || navLinks.style.right === "0px") {
    closeMenu();
  } else {
    openMenu();
  }
};

// Close menu when clicking outside navLinks or menuBtn
document.addEventListener("click", function (e) {
  const isMenuOpen =
    navLinks.style.right === "0" || navLinks.style.right === "0px";
  if (!isMenuOpen) return;
  // If click is outside navLinks and menuBtn
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
});

// Sticky nav on scroll
const nav = document.querySelector("nav");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const headerBottom = header.offsetTop + header.offsetHeight;
  if (window.scrollY > headerBottom) {
    nav.classList.add("sticky", "visible");
  } else {
    nav.classList.remove("sticky", "visible");
  }
});

// The scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > header.offsetHeight) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// The footer clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  now.getSeconds().toString().padStart(2, "0");
  const weekday = getWeekDay(now);
  const month = getMonthOfTheYear(now);
  const date = now.getDate();

  document.getElementById(
    "clock"
  ).textContent = `${weekday} ${date} ${month} ${hours}:${minutes}`;
}

function getWeekDay(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getMonthOfTheYear(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()];
}

// update the time immediately, and then after every second
updateClock();
setInterval(updateClock, 1000);

// Copyright year
const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;

//
// Carousel functionality
const heroSection = document.querySelector(".hero_section");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const heroTextBox = document.querySelector(".hero_text-box");
const dotsBox = document.querySelector(".hero-dots");

const images = [
  {
    image: "images/home-carousel/classes-1.jpg",
    text: "Education is the great equalizer of our time. It gives hope to the hopeless and creates chances for those without... - Kofi Annan",
  },
  {
    image: "images/home-carousel/admin-view.jpg",
    text: "Just as food eaten without appetite is a tedious nourishment, so does study without zeal damage the memory by not assimilating what it absorbs. - R.Q",
  },
  {
    image: "images/home-carousel/flag-square.jpg",
    text: "You'll find that education is just about the only thing lying around loose in this world, and it's about the only thing a fellow can have as much of as he's willing to haul away. - John Graham",
  },
  {
    image: "images/home-carousel/assembly.jpg",
    text: "Intense curiosity keeps you young. When we're green we grow, when we're ripe we rot. -R.Q",
  },
  {
    image: "images/home-carousel/plant-tree.jpeg",
    text: "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  },
];

let currentImageIndex = 0;

// Preload images
images.forEach((img) => {
  const image = new Image();
  image.src = img.image;
});

function updateBackground() {
  // Remove show class and clear text for animation reset
  heroTextBox.classList.remove("show");
  heroTextBox.textContent = "";

  // Change background image immediately
  heroSection.style.backgroundImage = `linear-gradient(rgba(4, 9, 30, 0.5), rgba(4, 9, 30, 0.5)), url(${images[currentImageIndex].image})`;

  heroSection.classList.add("ready"); // to fade in when JS loads

  updateDots();

  // Show text after 2 seconds
  setTimeout(() => {
    heroTextBox.textContent = images[currentImageIndex].text;
    heroTextBox.classList.add("show");
  }, 2000);
}

images.forEach(() => {
  const dot = document.createElement("span");
  dotsBox.append(dot);
});

function updateDots() {
  const allDots = dotsBox.querySelectorAll("span");
  allDots.forEach((dot) => dot.classList.remove("active"));
  allDots[currentImageIndex].classList.add("active");
}

// initialize the background with the first image
updateBackground();

// Then autoplay after every 15 seconds
let autoplayId;

const startAutoplay = () => {
  autoplayId = setInterval(() => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    updateBackground();
  }, 10000);
};

const stopAutoplay = () => {
  clearInterval(autoplayId);
};

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}
// call the startAutoplay function
startAutoplay();

// manual navigation
prevBtn.addEventListener("click", () => {
  currentImageIndex--;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  updateBackground();
  resetAutoplay();
});

nextBtn.addEventListener("click", () => {
  currentImageIndex++;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  updateBackground();
  resetAutoplay();
});

// Dots navigation
dotsBox.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    currentImageIndex = Array.from(dotsBox.children).indexOf(e.target);
    updateBackground();
    resetAutoplay();
  }
});

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

heroSection.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
  resetAutoplay();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    // Swipe left
    currentImageIndex++;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    updateBackground();
  } else if (touchEndX - touchStartX > 50) {
    // Swipe right
    currentImageIndex--;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    updateBackground();
  }
}
// End of carousel functionality

// Swiper for testimonials: Swiper Library
const swiperTestimonial = new Swiper(".testimonial__swiper", {
  loop: true,
  slidesPerView: "auto",
  centeredSlides: "auto",
  spaceBetween: 16,
  grabCursor: true,
  speed: 600,
  effect: "coverflow",
  coverflowEffect: {
    rotate: -90,
    depth: 600,
    modifier: 0.5,
    slideShadows: false,
  },

  // pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
