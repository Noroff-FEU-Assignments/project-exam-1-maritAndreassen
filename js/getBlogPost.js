export async function getPosts(url, html) {
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

export async function getMedia(url, list) {
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
