const baseUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/posts";
const mediaUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/media/";
const blogpostContainer = document.querySelector(".blogpost-container");

let imgList = [];

async function getPosts(url, html) {
  try {
    const response = await fetch(url);
    const blogPosts = await response.json();
    blogPosts.forEach((blogPost) => {
      html(blogPost);
    });
  } catch (error) {
    console.log("An error occured", error);
  }
}

async function getMedia(url, list) {
  try {
    const response = await fetch(url);
    const blogPosts = await response.json();
    blogPosts.forEach((item) => {
      list.push(item);
    });
  } catch (error) {
    console.log("An error occured", error);
  }
}

async function getBlogpostAndMedia() {
  getMedia(mediaUrl + "?per_page=20", imgList);
  await getPosts(baseUrl + "?per_page=20", createHTML);
}

getBlogpostAndMedia();

function getBlogpostImg(mediaId) {
  const result = imgList.find((img) => img.id === mediaId);
  console.log(result, "JUHUUUU");
  return result.media_details.sizes.large.source_url;
}

function createHTML(blogPost) {
  blogpostContainer.innerHTML += `
  <article class="img" style="background-image:url('${getBlogpostImg(blogPost.featured_media)}')">
    <div class="content">
      <h2>${blogPost.title.rendered}</h2> 
      <a href="" class="secondary-button view-button">VIEW</a>
    </div>
    
  </article>`;
}
