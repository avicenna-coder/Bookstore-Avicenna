window.addEventListener("load", function() {
  const preloader = document.getElementById("loader-container");
  const content = document.getElementById("book-main-container");

  setTimeout(() => {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 4000); 
});



let searchForContainer = document.querySelector(".searchForContainer")
let searchInputContainer = document.querySelector(".search-input-container");

let userClick = document.querySelector(".user-click")
let form = document.querySelector(".form-section")
let mainContainer = document.querySelector(".book-main-container")
let cancelFormPage = document.querySelector(".icon-x")

userClick.addEventListener("click", ()=>{
  form.style.display = `flex`
  mainContainer.style.display = `none`
})

cancelFormPage.addEventListener("click", ()=>{
  form.style.display = `none`
  mainContainer.style.display = `flex`
})

searchForContainer.addEventListener("click", ()=>{
    searchInputContainer.classList.toggle("active");
})

var swiper = new Swiper(".myCube", {
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 9500, // Change slide every 3 seconds
    disableOnInteraction: false, // Keeps autoplay running even when user interacts
  },
});

var swiper = new Swiper(".books-slider", {
  loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
});

var swiper = new Swiper(".books-slider", {
  loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
});

var swiper = new Swiper(".featured-books-container", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});  

var swiper = new Swiper(".all-boxes-grandparent", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 15, // This replaces column-gap
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


var swiper = new Swiper(".client-review", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 15, // This replaces column-gap
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blog-container", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 15, // This replaces column-gap
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
