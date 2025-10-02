document.addEventListener("DOMContentLoaded", () => {
  lazyLoad();
  //add padding to the body with the height of header
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (header && footer) {
    const navbarHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight - 58;

    document.documentElement.style.setProperty(
      "--header-height",
      `${navbarHeight}px`
    );
  }

  const menuBar = document.querySelector(".menu-bar");
  menuBar?.addEventListener("click", () => {
    menuBar.classList.toggle("active");
    document.body.classList.toggle("active-menu");
  });

  //open search
  const searchButtons = document.querySelectorAll(".search-btn");
  const searchBox = document.querySelector(".search-box");
  const overlay = document.querySelector(".search-overlay");

  // Toggle search box and overlay on button click
  searchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchBox.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  });

  // Hide search box and overlay when clicking the overlay
  overlay.addEventListener("click", () => {
    searchBox.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Typewriter setup
  const typedText = document.querySelector(".typed-text");
  const cursor = document.querySelector(".cursor");

  if (typedText && cursor) {
    const textArray = ["IMPLEMENT", "DEVELOP", "Learner..."];
    let textArrayIndex = 0;
    let charIndex = 0;

    const erase = () => {
      if (charIndex > 0) {
        cursor.classList.remove("blink");
        typedText.textContent = textArray[textArrayIndex].slice(
          0,
          charIndex - 1
        );
        charIndex--;
        setTimeout(erase, 80);
      } else {
        cursor.classList.add("blink");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0;
        }
        setTimeout(type, 1000);
      }
    };

    const type = () => {
      if (charIndex <= textArray[textArrayIndex].length - 1) {
        cursor.classList.remove("blink");
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 120);
      } else {
        cursor.classList.add("blink");
        setTimeout(erase, 1000);
      }
    };

    type(); // Start the typewriter
  }

  // Initialize main select
  const mainSelectEl = document.querySelector("#main-select");
  if (mainSelectEl) {
    new SlimSelect({
      select: "#main-select",
      settings: {
        showSearch: false,
      },
    });
  }

  // Initialize dependent select
  const dependentSelectEl = document.querySelector("#dependent-select");
  if (dependentSelectEl) {
    new SlimSelect({
      select: "#dependent-select",
      settings: {
        showSearch: false,
      },
    });
  }

  // Data
  const dcData = [
    {
      html: '<span class="dcSelect-icon"><img src="../assets/images/dc-images/document-text.svg"></span> Documents',
      text: "Documents",
      value: "documents",
    },
    {
      html: '<span class="dcSelect-icon"><img src="../assets/images/dc-images/play-cricle.svg"></span> Videos',
      text: "Videos",
      value: "videos",
    },
    // etc...
  ];
  // Initialize dc select
  const dcSelectEl = document.querySelector("#dc-select");
  if (dcSelectEl) {
    new SlimSelect({
      select: "#dc-select",
      data: dcData,
      settings: {
        showSearch: false,
      },
    });
  }

  //initialize mixitup filter for document center
  const containerEl = document.querySelector(".dcFilter-results");
  if (containerEl) {
    mixitup(containerEl);
  }

  // Reusable drag-to-scroll function
  function enableDragScroll(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener("mousedown", (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener("mouseleave", () => {
      isDown = false;
      el.classList.remove("dragging");
    });

    el.addEventListener("mouseup", () => {
      isDown = false;
      el.classList.remove("dragging");
    });

    el.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // scroll speed
      el.scrollLeft = scrollLeft - walk;
    });
  }

  // Call for each section you want to make draggable
  enableDragScroll(".custom-tabs .navTabs");
  enableDragScroll(".dcFilter-controls");

  //add active for the current page link
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".footer-list li");

  navItems.forEach((li) => {
    const link = li.querySelector("a");
    if (
      link &&
      link.getAttribute("href") !== "#!" &&
      link.getAttribute("href") !== "#"
    ) {
      const linkPath = new URL(link.href, window.location.origin).pathname;

      const isHome =
        (currentPath === "/" || currentPath === "/index.html") &&
        (linkPath === "/" || linkPath === "/index.html");

      if (isHome || currentPath === linkPath) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    }
  });

  //side nav in small sizes
  const sideNav = document.querySelector(".side-nav");
  const toggleBtn = document.getElementById("toggleSideNav");

  if (!sideNav || !toggleBtn) return;

  if (window.innerWidth <= 1199) {
    sideNav.classList.add("visible");
    setTimeout(() => {
      sideNav.classList.remove("visible");
    }, 3000);
  }

  toggleBtn.addEventListener("click", () => {
    sideNav.classList.toggle("visible");
  });

  //clients slider
  var clientsSlider = new Swiper(".clients-slider .swiper", {
    autoplay: {
      delay: 3000,
    },
    grid: {
      rows: 3,
      fill: "row",
    },
    speed: 1000,
    preloadImages: true,
    // Navigation arrows
    navigation: {
      nextEl: ".clients-row .swiper-button-next",
      prevEl: ".clients-row .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    on: {
      init: function (swiper) {
        lazyLoad();
      },
    },
  });

  //solution slider
  var solutionSlider = new Swiper(".solution-slider .swiper", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 1000,
    preloadImages: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1199: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      init: function (swiper) {
        lazyLoad();
      },
    },
  });

  // Define the options for each main selection
  const dependentOptions = {
    Products: [
      { text: "Schoolna", value: "Schoolna" },
      { text: "Aqar", value: "Aqar" },
      { text: "Rawadah", value: "Rawadah" },
      { text: "Board.G", value: "Board.G" },
      { text: "Automate", value: "Automate" },
    ],
    "Implementation and Consultancy": [
      { text: "MS Dynamics 365 F&O", value: "MS Dynamics 365 F&O" },
      { text: "MS Dynamics 365 BC", value: "MS Dynamics 365 BC" },
      { text: "MS Dynamics 365 CRM", value: "MS Dynamics 365 CRM" },
      {
        text: "MS Dynamics 365 Contact Center",
        value: "MS Dynamics 365 Contact Center",
      },
    ],
    "AI & RPA Solutions": [
      {
        text: "AI Chatbots and Social Management",
        value: "AI Chatbots and Social Management",
      },
      {
        text: "AI Use cases development and Automation",
        value: "AI Use cases development and Automation",
      },
      {
        text: "RPA services and Development",
        value: "RPA services and Development",
      },
    ],
    "Risk & Compliance": [
      { text: "Advanced Risk Analytics", value: "Advanced Risk Analytics" },
      {
        text: "Integrated Risk Management",
        value: "Integrated Risk Management",
      },
      { text: "Compliance & GRC", value: "Compliance & GRC" },
      { text: "Code Revue", value: "Code Revue" },
    ],
    "Cybersecurity Solutions": [
      { text: "DLP", value: "DLP" },
      { text: "MDM", value: "MDM" },
      { text: "Network Security", value: "Network Security" },
      {
        text: "Advanced Threat Intelligence",
        value: "Advanced Threat Intelligence",
      },
      { text: "Software Security", value: "Software Security" },
    ],
    "Digital Marketing & Development": [
      {
        text: "Digital Identity & Branding",
        value: "Digital Identity & Branding",
      },
      {
        text: "Social Management & digital Marketing",
        value: "Social Management & digital Marketing",
      },
      {
        text: "Content Creation",
        value: "Content Creation",
      },
      {
        text: "App & Web development",
        value: "App & Web development",
      },
      {
        text: "SEO",
        value: "SEO",
      },
    ],
  };

  // Add event listener to main select
  document
    .querySelector("#main-select")
    .addEventListener("change", function () {
      const selectedValue = this.value;
      const dependentSelectElement =
        document.querySelector("#dependent-select");

      // Clear current options
      dependentSelect.setData([]);

      if (selectedValue && dependentOptions[selectedValue]) {
        // Add new options based on selection
        dependentSelect.setData(dependentOptions[selectedValue]);
        dependentSelect.setPlaceholder("Select an option");
      } else {
        dependentSelect.setPlaceholder("Select a Solution first");
      }
    });

  //lazy load setup
  function lazyLoad() {
    const images = document.querySelectorAll(".lazy-img");

    const imageObserver = new IntersectionObserver(function (enteries) {
      enteries.forEach(function (entery) {
        if (!entery.isIntersecting) {
          return;
        } else {
          preloadImage(entery.target);
          imageObserver.unobserve(entery.target);
        }
      });
    });

    images.forEach(function (image) {
      imageObserver.observe(image);
    });
  }

  function preloadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-img");
      img.parentElement.classList.add("loaded-img");
    };
  }
});
