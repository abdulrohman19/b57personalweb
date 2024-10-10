const testimonials = [
    {
      image:
      "https://imgix.ranker.com/user_node_img/4374/87467782/original/87467782-photo-u-1580407977?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
      content:"Self-conscious royal mage Noelle overcomes drilled-in notions unworthy of her noble Silva name that haunted her childhood.",
      author: "Noelle Silva",
      rating: 5,
    },
    {
      image:
      "https://imgix.ranker.com/user_node_img/4269/85376365/original/85376365-photo-u-1054687522?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
      content:"Loud magic knight Asta compensates for his lack of magical power through tenacious training and indomitable optimism represented by his messy silver hair.",
      author: "Asta",
      rating: 1,
    },
    {
        image:
        "https://imgix.ranker.com/user_node_img/4374/87467156/original/87467156-photo-u-252486966?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
        content: "A commoner blessed with astounding magical power, rose-haired orphan Yuno implicitly trusts childhood friend Asta to become the Clover Kingdom’s Wizard King.",
        author: "Yuno Grinberryall ",
        rating: 3,
    },
    {
      image:
      "https://imgix.ranker.com/user_node_img/4374/87467156/original/87467156-photo-u-252486966?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
      content: "A commoner blessed with astounding magical power, rose-haired orphan Yuno implicitly trusts childhood friend Asta to become the Clover Kingdom’s Wizard King.",
      author: "Yuno Grinberryall ",
      rating: 3,
    },
  ];
  
  function getAllTestimonials() {
    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
      <img src="${testimonial.image}" class="profile-testimonial" />
      <p class="quote">"${testimonial.content}"</p>
      <p class="author">- ${testimonial.author}</p>
      <p class="author">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
  </div>`;
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
  }
  
  function getTestimonialsByRating(rating) {
    const filteredTestimonials = testimonials.filter((testimonial) => {
      if (testimonial.rating === rating) {
        return true;
      }
    });
  
    const testimonialHTML = filteredTestimonials.map((testimonial) => {
      return `<div class="testimonial">
      <img src="${testimonial.image}" class="profile-testimonial" />
      <p class="quote">"${testimonial.content}"</p>
      <p class="author">- ${testimonial.author}</p>
      <p class="author">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
  </div>`;
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
  }
  
  getAllTestimonials();
  
  const buttonRatings = [
    {
      name: "All",
      rating: "all",
    },
    {
      name: "1",
      rating: 1,
    },
    {
      name: "2",
      rating: 2,
    },
    {
      name: "3",
      rating: 3,
    },
    {
      name: "4",
      rating: 4,
    },
    {
      name: "5",
      rating: 5,
    },
  ];
  
  function showButtonRatings() {
    const buttonRatingsHTML = buttonRatings.map((buttonRating) => {
      if (buttonRating.name === "All") {
        return `<button onclick="getAllTestimonials()" class="rating-btn">${buttonRating.name}</button>`;
      } else {
        return `<button onclick="getTestimonialsByRating(${buttonRating.rating})" class="rating-btn">
              ${buttonRating.name} <i class="fa-solid fa-star"></i>
            </button>`;
      }
    });
  
    document.getElementById("button-ratings").innerHTML =
      buttonRatingsHTML.join("");
  }
  
  showButtonRatings();
  