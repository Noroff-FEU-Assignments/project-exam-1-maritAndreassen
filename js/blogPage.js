const baseUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/posts";
const mediaUrl = "https://myblog.maritstuderer.one/wp-json/wp/v2/media/";
const blogpostPage = document.querySelector(".blogpostPage");
const title = document.querySelector("title");

async function getBlogPost(url) {
  try {
    const response = await fetch(url);
    const blogPost = await response.json();

    await createHTML(blogPost);
  } catch (error) {
    console.log("An error occured", error);
  }
}

async function getImg(mediaID) {
  const response = await fetch(mediaUrl + mediaID);
  const result = await response.json();
  return result.media_details.sizes.large.source_url;
}

function getBlogPostPage() {
  const id = window.location.href.split("=")[1];
  const blogPageUrl = `${baseUrl}/${id}`;
  console.log(id);
  getBlogPost(blogPageUrl);
}

getBlogPostPage();

async function createHTML(blogPost) {
  let imgUrl = await getImg(blogPost.featured_media);
  blogpostPage.innerHTML += `
  <div class="img" style="background-image:url('${imgUrl}')"></div>
  <h1>${blogPost.title.rendered}</h1>
  ${blogPost.content.rendered}`;

  title.innerHTML = blogPost.title.rendered;
  const img = document.querySelector(".img");
  img.addEventListener("click", (e) => {
    imgModal(imgUrl);
  });
}

imgModal = (src) => {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  document.querySelector(".blogpostPage").append(modal);

  const newImage = document.createElement("img");
  newImage.setAttribute("src", src);

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal")) {
      modal.remove();
    }
  });

  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "fas fa-times closeBtn");
  closeBtn.onclick = () => {
    modal.remove();
  };
  modal.append(newImage, closeBtn);
};
