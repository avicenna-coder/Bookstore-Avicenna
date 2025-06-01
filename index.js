let featuredSwiper;
let arrivalSwiper;
let arrivalTwoSwiper;
let blogsSwiper;

window.addEventListener("load", function() {
  const preloader = document.getElementById("loader-container");
  const content = document.getElementById("book-main-container");

  setTimeout(() => {
    preloader.style.display = "none";
    content.style.display = "block";
  }, 4000); 
});

function fetchBooks(){
  let bookInput = document.getElementById("search");
  let clickSearch = document.getElementById("click-search");

  clickSearch.addEventListener("click", (event) => {
    let bookResult = bookInput.value.trim();
    if(bookResult.length === 0){
      alert(`Search for books`);
      return;
    }
    connectToApi(bookResult);
  });
}

fetchBooks() 

let cart = document.querySelector(".cart")
let cartIcon = document.getElementById("cart-icon")
let closeIcon = document.getElementById("close-cart")

cartIcon.addEventListener("click", ()=>{
  cart.classList.add("active")
})

closeIcon.addEventListener("click", ()=>{
  cart.classList.remove("active")
})


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

function connectToApi(bookResult) {
  console.log("Fetching books for:", bookResult);
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookResult)}&maxResults=30`)
    .then((response) => response.json())
    .then((newData) => {
      const slidesContainer = document.querySelector('#books-slides .swiper-wrapper');
      slidesContainer.innerHTML = ""; // Clear existing slides

      let bookItems = newData.items;
      featuredBooks(bookItems)
      bookItems.forEach((itemofBook) => {
        const info = itemofBook.volumeInfo;
        // console.log(info)
        const imageShow = info.imageLinks?.thumbnail || "https://via.placeholder.com/150";
        const links = info.previewLink
        

        const slide = document.createElement('a');
        slide.href = `${links}`;
        slide.target = "_blank"
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${imageShow}" alt="${info.title}">
        `;

        slidesContainer.appendChild(slide);
      });

      

      swiper.destroy(true, true);
      swiper = new Swiper(".books-slider", {
        loop: true,
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
    })
    .catch((error) => console.error("Error loading books:", error));
}


featuredSwiper = new Swiper(".featured-books-container", {
    spaceBetween: 10,
    loop: true,
    centeredSlides: false,
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

function featuredBooks(data) {
  const slidesContainer = document.querySelector('.featured-books-container .swiper-wrapper');
  slidesContainer.innerHTML = "";
  arrivalBooksAPI(data)

  data.forEach((itemofBook) => {
  const info = itemofBook.volumeInfo;
  const imageShow = info.imageLinks?.thumbnail || "https://via.placeholder.com/150";
  const links = info.previewLink;

  const saleInfo = itemofBook.saleInfo;
  const saleability = saleInfo.saleability;
  
  let priceText = '';
  if (saleability === "FOR_SALE" && saleInfo.listPrice) {
      const amount = saleInfo.listPrice.amount;
      const currency = saleInfo.listPrice.currencyCode;
      priceText = `Price: ${amount} ${currency}`;
  } else {
      priceText = 'Not For Sale';
  }

  const slide = document.createElement('div');
  slide.className = "box swiper-slide";
  slide.innerHTML = `
    <div class="icons">
      <a href="${links}" target="_blank" class="searchForContainer"><i class="fa-solid fa-search"></i></a>
      <a href="#"><i class="fa-solid fa-heart"></i></a>
      <a href="#"><i class="fa-solid fa-eye"></i></a>
    </div>
    <div class="image-featured">
      <a href="${links}" target="_blank"><img src="${imageShow}" alt="${info.title}"></a>
    </div>
    <div class="featured-content">
      <h3 class="title">${info.title}</h3>
      <div class="bookamount-btn">
        <div class="book-amount">
          <p>${priceText}</p>
          <small>${priceText}</small>
        </div>
        <a href="#" class="btn">Add To Cart</a>
      </div>
    </div>
  `;

  const btn = slide.querySelectorAll(".btn");
  btn.forEach(button =>{
    button.addEventListener("click", (event)=>{
      let bookBox = event.target.closest(".box.swiper-slide")
      addToCart(bookBox)
    })
  })

  slidesContainer.appendChild(slide);
});


  if (featuredSwiper) {
    featuredSwiper.destroy(true, true);
  }

  // Reinitialize swiper
  featuredSwiper = new Swiper(".featured-books-container", {
    spaceBetween: 10,
    loop: true,
    centeredSlides: false,
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
}

let bookCount = document.querySelector(".cart-item-count")
let bookNumber = parseInt(bookCount.textContent)

let cartContent = document.querySelector(".cart-content")

function addToCart(bookBox) {
   let bookImage = bookBox.querySelector("img").src;
   let bookTitle = bookBox.querySelector(".title").textContent;

   // Check if the item already exists in the cart
   const cartItems = cartContent.querySelectorAll(".cart-product-title");
   for (let item of cartItems) {
       if (item.textContent.trim() === bookTitle.trim()) {
           alert("This item is already in the cart.");
           return;
       }
   }

   const cartBox = document.createElement('div');
   cartBox.className = "cart-box";
   cartBox.innerHTML = `
        <img src="${bookImage}" alt="" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${bookTitle}</h2>
            <div class="cart-price-free-container">
                <span class="cart-price">$100</span>
                <p>Free</p>
            </div>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>
   `;
   cartContent.appendChild(cartBox);

   let cartItemCount = document.querySelector(".cart-item-count");
   let cartCount = parseInt(cartItemCount.textContent) || 0;
   cartCount++; // increment first
   cartItemCount.textContent = cartCount; // then update the text

  //  Increment and Decrement Buttons
   let increment = cartBox.querySelector(".increment")
   let decrement = cartBox.querySelector(".decrement")
   let number = cartBox.querySelector(".number")
   let cartNumber = parseInt(number.textContent)

   increment.addEventListener("click", ()=>{
    cartNumber++
    number.textContent = cartNumber
   })

   decrement.addEventListener("click", () => {
    if (cartNumber > 0) {
        cartNumber--;
        number.textContent = cartNumber;
    }
    });

    // Delete Cart Item 

    let deleteCart = cartBox.querySelector(".cart-remove");
    deleteCart.addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1)
    });

    updateCartCount(1)

}

let addCount = 0

const updateCartCount = change =>{
    let cartItemCount = document.querySelector(".cart-item-count")
    addCount += change
    if(addCount > 0){
        cartItemCount.style.visibility = `visible`
        cartItemCount.textContent = addCount
    }else{
        cartItemCount.style.visibility = `hidden`
        cartItemCount.textContent = ``;
    }
}

arrivalSwiper = new Swiper(".all-boxes-grandparent", {
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

function arrivalBooksAPI(itemsDetails){
  const slidesContainer = document.querySelector('.all-boxes-grandparent .swiper-wrapper');
  slidesContainer.innerHTML = "";
  arrivalBooksTwo(itemsDetails)

  itemsDetails.forEach((bookItem)=>{
    const info = bookItem.volumeInfo;
    const imageShow = info.imageLinks?.thumbnail || "https://via.placeholder.com/150";
    const links = info.previewLink;

    const slide = document.createElement('div');
    slide.className = "swiper-slide box";
    slide.innerHTML = `
            <div class="img-container"><a href="${links}" target="_blank" ><img src="${imageShow}" alt="${info.title}"></a>
            </div>
                  <div class="text-icons-container">
                      <h3>${info.title}</h3>
                      <div class="book-amount">
                        <p>$15.99</p>
                        <small>$20.99</small>
                      </div>
                      <div class="arrivals-icons">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                      </div>
                  </div>`;
    slidesContainer.appendChild(slide);
  })
  
  if (arrivalSwiper && typeof arrivalSwiper.destroy === "function") {
  arrivalSwiper.destroy(true, true); // true to cleanup styles & detach observers
}
  
  arrivalSwiper = new Swiper(".all-boxes-grandparent", {
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
}

function arrivalBooksTwo(detailsItem){
  const slidesContainer = document.querySelector('.all-boxes-two .swiper-wrapper');
  slidesContainer.innerHTML = "";
  blogsShow(detailsItem)

  detailsItem.forEach((bookItem)=>{
    const info = bookItem.volumeInfo;
    const imageShow = info.imageLinks?.thumbnail || "https://via.placeholder.com/150";
    const links = info.previewLink;

    const slide = document.createElement('div');
    slide.className = "swiper-slide box";
    slide.innerHTML = `
    <a href="${links}" target="_blank" ><img src="${imageShow}" alt="${info.title}"></a>
                  <div class="text-icons-container">
                      <h3>${info.title}</h3>
                      <div class="book-amount">
                        <p>$15.99</p>
                        <small>$20.99</small>
                      </div>
                      <div class="arrivals-icons">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                      </div>
                  </div>`;
    slidesContainer.appendChild(slide);
  })

  if (arrivalTwoSwiper) {
    arrivalTwoSwiper.destroy(true, true);
  }
  
  arrivalTwoSwiper = new Swiper(".all-boxes-two", {
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
}

function blogsShow(blogsItems){
  const slidesContainer = document.querySelector('.blog-container .swiper-wrapper');
  slidesContainer.innerHTML = "";

  blogsItems.forEach((bookItem)=>{
    const info = bookItem.volumeInfo;
    const imageShow = info.imageLinks?.thumbnail || "https://via.placeholder.com/150";
    const links = info.previewLink;
    const description = info.description 
            ? info.description.slice(0, 100) + '...' 
            : 'No description available';

    const slide = document.createElement('div');
    slide.className = "swiper-slide box";
    slide.innerHTML = `
                  <div class="blog-img-container">
                    <a href="${links}" target="_blank" ><img src="${imageShow}" alt="${info.title}"></a>
                  </div>
                  <div class="blog-content-wrapper">
                    <h2>${info.title}</h2>
                    <p>${description}</p>
                   <a href="${links}" target="_blank" class="btn">Read More</a>
                  </div>
                </div>`
    slidesContainer.appendChild(slide);
    // Also call on initialization to set the heights
    equalizeSwiperSlideHeight();
  })

  if (blogsSwiper) {
    blogsSwiper.destroy(true, true);
  }
  
  blogsSwiper = new Swiper(".blog-container", {
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

  const slides = document.querySelectorAll('.box');

slides.forEach((slide, index) => {
  const realHeight = slide.getBoundingClientRect().height;
});

// This script makes sure all swiper slides have the same height
function equalizeSwiperSlideHeight() {
  const swiperSlides = document.querySelectorAll('.blog-swiper-wrapper .box');
  let maxHeight = 0;

  // First, find the tallest slide
  swiperSlides.forEach(slide => {
    slide.style.height = 'auto'; // Reset any inline height to get the natural height
    if (slide.offsetHeight > maxHeight) {
      maxHeight = slide.offsetHeight;
    }
  });

  // Set all slides to the max height
  swiperSlides.forEach(slide => {
    slide.style.height = `${maxHeight}px`;
  });
}

// Call the function after Swiper.js has initialized
blogsSwiper.on('slideChange', equalizeSwiperSlideHeight);

}

let searchForContainer = document.querySelector(".searchForContainer")
let searchInputContainer = document.querySelector(".search-input-container");

let userClick = document.querySelector(".user-click")
let form = document.querySelector(".form-section")
let mainContainer = document.querySelector(".book-main-container")
let cancelFormPage = document.querySelector(".icon-x")
let navContainer = document.querySelector(".nav-menu")

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
    navContainer.style.marginTop = `5rem`

    if(!searchInputContainer.classList.contains("active")){
      navContainer.style.marginTop = `0`
    }
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

const profilePic = document.getElementById("profile-pic");
const inputField = document.getElementById("input-field");

let selectedFile = null;


inputField.onchange = function () {
  const file = inputField.files[0];
  if (file && file.type.startsWith("image/")) {
    profilePic.src = URL.createObjectURL(file);
    selectedFile = file;
  } else {
    alert("Please select a valid image file.");
  } 
};

const love = document.querySelector(".love-icon");
  love.addEventListener("click", () => {
    if (love.classList.contains("love-icon")) {
      love.style.color = "#ef233c";
      love.classList.remove("love-icon");
    } else {
      love.style.color = "";
      love.classList.add("love-icon");
    }
  });

// Backend

// const formData = new FormData();
//   formData.append("profileImage", selectedFile); // key name 'profileImage' must match your backend handler

//   fetch("https://your-backend.com/upload", {
//     method: "POST",
//     body: formData
//   })
//     .then(response => {
//       if (!response.ok) throw new Error("Upload failed.");
//       return response.json();
//     })
//     .then(data => {
//       alert("Upload successful!");
//       console.log("Server response:", data);
//     })
//     .catch(error => {
//       console.error(error);
//       alert("There was an error uploading the image.");
//     });

// Form Collection
let inputFieldPic = document.getElementById("input-field")
let signUpForm = document.getElementById("sign-up-form")
let username = document.getElementById("username")
let password = document.getElementById("password")
let reviewShare = document.getElementById("review-share")

let userArray = []

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let userName = username.value.trim();
  let userPassword = password.value.trim();
  let userReview = reviewShare.value.trim();
  let picUrl = profilePic.src;

  // Validation: Check if any field is empty
  if (!userName || !userPassword || !userReview || picUrl.includes("default-img.jpg")) {
    alert("Please fill in all fields and upload a profile picture.");
    return; // Stop form submission
  }

  // Validation: Check if username contains only letters (no digits)
  if (!/^[a-zA-Z\s']+$/.test(userName)) {
  alert("Username should only contain letters, spaces, or apostrophes.");
  return;
}

  let userObj = {
    nameOfUser: userName,
    passwordOfUser: userPassword,
    picOfUser: picUrl,
    reviewUser: userReview
  };

  userArray.push(userObj);
  signUpForm.reset();
  profilePic.src = "./default-img.jpg";
  printOnUi();
});



function printOnUi(){
  userArray.forEach((item)=>{
    let pic = item.picOfUser
    let userNAME = item.nameOfUser
    let userDescription = item.reviewUser

    let profile = document.querySelector(".profile-image")
    let review = document.querySelector(".client-words")
    review.innerHTML = `
    <img src="${pic}" alt="">
    `
    profile.innerHTML = `
    <img src="${pic}" alt="">
    `

    let clientName = document.getElementById("client-name")
    clientName.textContent = userNAME

    let describeSite = document.getElementById("user-review")
    describeSite.textContent = userDescription
  })
  resize()
}

let particlesContainer = document.getElementById("particles-js");
let contentBox = document.querySelector(".home .row .content");

function resize() {
  if (!particlesContainer && contentBox) {
    contentBox.style.marginTop = "15rem";
  }
}

// Call the function once on load
resize();

// Optional: Also respond to screen resizing
window.addEventListener("resize", resize);
