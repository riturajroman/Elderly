document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.getElementById("blog-posts");

  // Show loading state
  blogContainer.innerHTML = `
    <div class="loading-state">
      Loading blog posts...
    </div>
  `;

  // Fetch recent posts from WordPress REST API
  fetch(
    "https://theelderlywellness.com/blogs/wp-json/wp/v2/posts?per_page=3&_embed"
  )
    .then((response) => response.json())
    .then((posts) => {
      blogContainer.innerHTML = ""; // Clear loading state

      posts.forEach((post) => {
        // Get featured image or placeholder
        const imageUrl =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/600x400?text=Elderly+Wellness";
        const imageAlt =
          post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
          post.title.rendered;

        // Format date
        const postDate = new Date(post.date);
        const formattedDate = postDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Create blog card
        const blogCard = document.createElement("div");
        blogCard.className = "blog-card";
        blogCard.innerHTML = `
          <a href="${post.link}">
            <div class="image-container">
              <img src="${imageUrl}" alt="${imageAlt}">
            </div>
            <div class="content">
              <span class="date">${formattedDate}</span>
              <h3>${post.title.rendered}</h3>
              <p>${post.excerpt.rendered.replace(/<[^>]*>/g, "")}</p>
              <div class="read-more">
                <span>Read More</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>
        `;

        blogContainer.appendChild(blogCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
      blogContainer.innerHTML = `
        <div class="error-message">
          <p>Unable to load blog posts at this time. Please visit our <a href="https://theelderlywellness.com/blogs/">blog page</a> directly.</p>
        </div>
      `;
    });
});
