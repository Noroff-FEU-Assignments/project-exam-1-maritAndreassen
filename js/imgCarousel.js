import { getPosts, getMedia } from "./getBlogPost.js";

const baseUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/posts";
const mediaUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/media/";
const blogPostCarousel = document.querySelector(".carousel");
const carousel = document.querySelector(".carousel");
const img = document.querySelector(".img");

let imgList = [];

async function getBlogpostAndMedia() {
  getMedia(mediaUrl + "?per_page=30", imgList);
  await getPosts(baseUrl + "?per_page=8", createHTML);
}

function getBlogpostImg(mediaId) {
  const result = imgList.find((img) => img.id === mediaId);
  return result.media_details.sizes.large.source_url;
}

function createHTML(blogPost) {
  blogPostCarousel.innerHTML += `

  
  <article class="img" style="background-image:url('${getBlogpostImg(blogPost.featured_media)}')">  
  <div class="title">
      <h2>${blogPost.title.rendered}</h2> 
    </div>
  </article>
  
  `;
}

getBlogpostAndMedia();

let firstImg = document.querySelectorAll(".img");
let arrowIcons = document.querySelectorAll(".wrapper i");
let firstImgWidth = 300 + 14;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

/*const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.scrollWidth) return;
  let positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;
  let prevScrollLeft;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : positionDiff);
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
};*/

/*
<article class="img" style="background-image:url('${getBlogpostImg(blogPost.featured_media)}')">  
  <div class="content">
      <h2>${blogPost.title.rendered}</h2> 
    </div>
  </article>
*/
