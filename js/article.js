async function loadBlogs() {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://theelderlywellness.com/blogs/feed"
  );
  const data = await response.json();
  const blogContainer = document.getElementById("blogs");

  if (data.status === "ok") {
    data.items.slice(0, 3).forEach((item) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(item.content, "text/html");
      const plainText = doc.body.textContent || "";
      const date = new Date(item.pubDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      blogContainer.innerHTML += `
          <div class="blog-card">
            <div class="blog-date">${date} | Blogs</div>
            <h3>${item.title}</h3>
            <p>${plainText}</p>
            <a href="${item.link}" target="_blank">Read more →</a>
          </div>
        `;
    });
  } else {
    blogContainer.innerHTML = "<p>Failed to load blog posts.</p>";
  }
}

loadBlogs();
