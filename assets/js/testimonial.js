class Testimonial {
    image = "";
    content = "";
    author = "";
    rating = 0;
  
    constructor(image, content, author, rating) {
      this.image = image;
      this.content = content;
      this.author = author;
      this.rating = rating;
    }
  
    getHTML() {
      return `<div class="testimonial">
          <img src="${this.image}" class="profile-testimonial" />
          <p class="quote">"${this.content}"</p>
          <p class="author">- ${this.author}</p>
          <p class="author">${this.rating}$</p>
      </div>`;
    }
  }
  
  const testimonial1 = new Testimonial(
    "https://imgix.ranker.com/user_node_img/4374/87467782/original/87467782-photo-u-1580407977?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
    "Self-conscious royal mage Noelle overcomes drilled-in notions unworthy of her noble Silva name that haunted her childhood.",
    "Noelle Silva",
    5
  );
  
  const testimonial2 = new Testimonial(
    "https://imgix.ranker.com/user_node_img/4269/85376365/original/85376365-photo-u-1054687522?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
    "Loud magic knight Asta compensates for his lack of magical power through tenacious training and indomitable optimism represented by his messy silver hair.",
    "Asta",
    1
  );
  
  const testimonial3 = new Testimonial(
    "https://imgix.ranker.com/user_node_img/4374/87467156/original/87467156-photo-u-252486966?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=200&w=200",
    "A commoner blessed with astounding magical power, rose-haired orphan Yuno implicitly trusts childhood friend Asta to become the Clover Kingdom’s Wizard King.",
    "Yuno Grinberryall ",
    3
  );
  
  const testimonials = [testimonial1, testimonial2, testimonial3]
  
  let testimonialHTML = ``
  
  for(let index = 0; index < testimonials.length; index++) {
      testimonialHTML += testimonials[index].getHTML()
  }
  
  document.getElementById("testimonials").innerHTML = testimonialHTML