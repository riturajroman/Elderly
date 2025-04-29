function preloader_fade() {
  $("#preloader").fadeOut("slow");
}
$(".drp_btn").click(function () {
  $(this).siblings(".sub_menu").slideToggle(500);
}),
  $(document).ready(function () {
    window.setTimeout("preloader_fade();", 500);
  }),
  $("#frmae_slider").owlCarousel({
    loop: !0,
    margin: 0,
    autoplay: !0,
    smartSpeed: 1500,
    nav: !1,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } },
  }),
  $("#company_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 1500,
    dots: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 5 } },
  }),
  $("#testimonial_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 2500,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } },
  }),
  $("#screen_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    dots: !0,
    autoplay: !0,
    smartSpeed: 2500,
    center: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 5 } },
  }),
  $("#feature_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1e3: { items: 3 },
      1400: { margin: 60 },
    },
  }),
  $("#text_list_flow").owlCarousel({
    loop: !0,
    margin: 0,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#text_list_flow_download").owlCarousel({
    loop: !0,
    margin: 0,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#client_slider").owlCarousel({
    loop: !0,
    margin: 30,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#about_slider").owlCarousel({
    loop: !0,
    margin: 20,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  }),
  $("#value_slider").owlCarousel({
    loop: !0,
    margin: 15,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1e3: { items: 3 },
      1400: { margin: 60 },
    },
  }),
  $("#testimonial_slider").owlCarousel({
    loop: !0,
    margin: 0,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    items: 1,
  });
let counter_find = document.querySelector("#counter");
void 0 !== counter_find &&
  null != counter_find &&
  window.addEventListener("scroll", function () {
    var e = document.querySelector("#counter").getBoundingClientRect();
    0 <= e.top &&
      e.bottom <= window.innerHeight &&
      $(".counter-value").each(function () {
        var e = $(this),
          o = e.attr("data-count");
        $({ countNum: e.text() }).animate(
          { countNum: o },
          {
            duration: 2e3,
            easing: "swing",
            step: function () {
              e.text(Math.floor(this.countNum));
            },
            complete: function () {
              e.text(this.countNum);
            },
          }
        );
      }),
      (e.top < window.innerHeight && 0 <= e.bottom) ||
        $(".counter-value").each(function () {
          var e = $(this);
          $({ countNum: e.text() }).animate(
            { countNum: 0 },
            {
              duration: 100,
              easing: "swing",
              step: function () {
                e.text(Math.floor(this.countNum));
              },
              complete: function () {
                e.text(this.countNum);
              },
            }
          );
        });
  }),
  $(document).ready(function () {
    $(".collapse.show").each(function () {
      $(this)
        .prev(".card-header")
        .find(".icon_faq")
        .addClass("icofont-minus")
        .removeClass("icofont-plus");
    }),
      $(".collapse")
        .on("show.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .find(".icon_faq")
            .removeClass("icofont-plus")
            .addClass("icofont-minus");
        })
        .on("hide.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .find(".icon_faq")
            .removeClass("icofont-minus")
            .addClass("icofont-plus");
        }),
      $(".collapse")
        .on("show.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .children("h2")
            .children(".btn")
            .addClass("active");
        })
        .on("hide.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .children("h2")
            .children(".btn")
            .removeClass("active");
        });
  }),
  $(document).ready(function () {
    $("#Gotop").click(function () {
      var e = $(window).scrollTop();
      e <= 1e3
        ? $("body,html").animate({ scrollTop: 0 }, 1e3)
        : e <= 2e3 && 1e3 < e
        ? $("body,html").animate({ scrollTop: 0 }, 2e3)
        : $("body,html").animate({ scrollTop: 0 }, 2500);
    });
  }),
  $(window).scroll(function () {
    300 < $(window).scrollTop()
      ? $("#Gotop").fadeIn(500)
      : $("#Gotop").fadeOut(500);
  }),
  $(".play-button").click(function (e) {
    $("<iframe>", { src: $(this).data("url") });
    $("#youtubevideo").attr("src", $(this).data("url"));
  }),
  $("#close-video").click(function (e) {
    $("#youtubevideo").attr("src", "");
  }),
  $(document).on("hidden.bs.modal", "#myModal", function () {
    $("#youtubevideo").attr("src", "");
  }),
  $(document).ready(function () {
    $(".navbar-toggler").click(function () {
      $(this)
        .children("span")
        .children(".ico_menu")
        .hasClass("icofont-navigation-menu")
        ? $(this)
            .children("span")
            .children(".ico_menu")
            .removeClass("icofont-navigation-menu")
            .addClass("icofont-close")
        : $(this)
            .children("span")
            .children(".ico_menu")
            .removeClass("icofont-close")
            .addClass("icofont-navigation-menu");
    });
  }),
  $(".toggle-wrap").on("click", function () {
    $(this).toggleClass("active"), $("aside").animate({ width: "toggle" }, 200);
  }),
  AOS.init();

function ActiveMenu() {
  // Get all links
  const links = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.href;

  // Loop through the links and add the active class to the current link
  links.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    }
  });
}
ActiveMenu();

document.addEventListener("DOMContentLoaded", function () {
  // Get the current page URL or a unique identifier for the page
  let page = window.location.pathname; // This will be the unique identifier (you can also use a custom ID for each page)

  // Get the views for this specific page from localStorage
  let views = localStorage.getItem("pageViews_" + page)
    ? parseInt(localStorage.getItem("pageViews_" + page))
    : 750;

  // Increment the view count for this page
  views++;

  // Store the updated view count in localStorage with the page-specific key
  localStorage.setItem("pageViews_" + page, views);

  // Update the DOM to display the updated view count for this page
  document.getElementById("view-count").innerText = `${views} Views`;
});
// Create a function to add floating buttons
function addFloatingButtons() {
  // WhatsApp Button (left side)
  const whatsappButton = document.createElement("a");
  whatsappButton.href = "https://wa.me/919944890577"; // Your WhatsApp number
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener noreferrer";
  whatsappButton.title = "Chat with us on WhatsApp";

  // WhatsApp Button Styles
  whatsappButton.style.position = "fixed";
  whatsappButton.style.left = "20px";
  whatsappButton.style.bottom = "20px";
  whatsappButton.style.backgroundColor = "#25D366";
  whatsappButton.style.color = "white";
  whatsappButton.style.width = "50px";
  whatsappButton.style.height = "50px";
  whatsappButton.style.borderRadius = "50%";
  whatsappButton.style.display = "flex";
  whatsappButton.style.alignItems = "center";
  whatsappButton.style.justifyContent = "center";
  whatsappButton.style.fontSize = "24px";
  whatsappButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  whatsappButton.style.zIndex = "9999";
  whatsappButton.style.transition = "all 0.3s ease";

  // Call Button (right side)
  const callButton = document.createElement("a");
  callButton.href = "tel:+919944890577"; // Your phone number with country code
  callButton.title = "Call Us";

  // Call Button Styles
  callButton.style.position = "fixed";
  callButton.style.right = "20px";
  callButton.style.bottom = "20px";
  callButton.style.backgroundColor = "#4285F4"; // Blue color
  callButton.style.color = "white";
  callButton.style.width = "50px";
  callButton.style.height = "50px";
  callButton.style.borderRadius = "50%";
  callButton.style.display = "flex";
  callButton.style.alignItems = "center";
  callButton.style.justifyContent = "center";
  callButton.style.fontSize = "24px";
  callButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  callButton.style.zIndex = "9999";
  callButton.style.transition = "all 0.3s ease";

  // Add hover effects to both buttons
  function addHoverEffect(button) {
    button.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
    });

    button.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    });
  }

  addHoverEffect(whatsappButton);
  addHoverEffect(callButton);

  // Create icons
  const whatsappIcon = document.createElement("i");
  whatsappIcon.className = "fab fa-whatsapp";

  const phoneIcon = document.createElement("i");
  phoneIcon.className = "fas fa-phone-alt";

  // Add icons to buttons
  whatsappButton.appendChild(whatsappIcon);
  callButton.appendChild(phoneIcon);

  // Add buttons to the body
  document.body.appendChild(whatsappButton);
  document.body.appendChild(callButton);

  // Load Font Awesome if not already loaded
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(fontAwesome);
  }
}

// Call the function when the DOM is fully loaded
if (document.readyState === "complete") {
  addFloatingButtons();
} else {
  document.addEventListener("DOMContentLoaded", addFloatingButtons);
}
