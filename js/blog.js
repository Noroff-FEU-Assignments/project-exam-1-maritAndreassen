import { getPosts, getMedia } from "./getBlogPost.js";

const baseUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/posts";
const mediaUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/media/";
const blogpostContainer = document.querySelector(".blogpost-container");

let imgList = [];

async function getBlogpostAndMedia() {
  await getMedia(mediaUrl + "?per_page=30", imgList);
  await getPosts(baseUrl + "?per_page=20", createHTML);
}

function getBlogpostImg(mediaId) {
  const result = imgList.find((img) => img.id === mediaId);
  return result.media_details.sizes.large.source_url;
}

function createHTML(blogPost) {
  blogpostContainer.innerHTML += `
  <article class="img" style="background-image:url('${getBlogpostImg(blogPost.featured_media)}')">  
  <div class="content">
      <h2>${blogPost.title.rendered}</h2> 
      <a href="./blogPage.html?id=${blogPost.id}" class="secondary-button view-button">VIEW</a>
    </div>
  </article>`;
}

getBlogpostAndMedia();
