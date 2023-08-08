(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_uspdl7l";
  const templateID = "template_fc9151b";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message sent successfully!!");
    })
    .catch((err) => console.log(err));
}

window.onload = function () {
  var popularFood = document.getElementById("most-popular-food");
  var popularDrink = document.getElementById("most-popular-drink");
  if (popularFood || popularDrink) {
    new Swiper(".popular-carousel", {
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  /**
   * Reviews slider
   */
  var customerReviews = document.getElementById("customer-reviews");
  if (customerReviews) {
    new Swiper(".testimonials-carousel", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  }
};

function loadCSS(url) {
  var linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = url;
  document.head.appendChild(linkElement);
}

// Memuat semua CSS yang diperlukan
loadCSS("assets/img/favicon.png");
loadCSS("assets/img/apple-touch-icon.png");
loadCSS(
  "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i&display=swap"
);
loadCSS("assets/vendor/animate.css/animate.min.css");
loadCSS("assets/vendor/aos/aos.css");
loadCSS("assets/vendor/bootstrap/css/bootstrap.min.css");
loadCSS("assets/vendor/bootstrap-icons/bootstrap-icons.css");
loadCSS("assets/vendor/boxicons/css/boxicons.min.css");
loadCSS("assets/vendor/swiper/swiper-bundle.min.css");
loadCSS("assets/css/style.css");

// Fungsi untuk memuat konten header dan mengatur class active
function loadHeader() {
  const headerContainer = document.getElementById("header");

  // Memuat konten header dari header.html
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;

      // Mengatur class active pada elemen navigasi
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = headerContainer.querySelectorAll("#navbar ul li a");
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    })
    .catch((error) => console.error("Error loading header:", error));
}

function loadFooter() {
  const footerContainer = document.getElementById("footer");

  // Memuat konten footer dari footer.html
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;

      // Mengatur class active pada elemen navigasi
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = footerContainer.querySelectorAll("#navbar ul li a");
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    })
    .catch((error) => console.error("Error loading footer:", error));
}

// Memanggil fungsi loadHeader saat dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", loadHeader, loadFooter);
