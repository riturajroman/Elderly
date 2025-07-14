const slides = document.querySelectorAll(".form-slide");
let currentSlide = 0;

function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "#ff6347",
    stopOnFocus: true,
  }).showToast();
}

function showSlide(slideIndex) {
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.add("previous");
  slides[slideIndex].classList.add("active");
  slides[slideIndex].classList.remove("previous");
  currentSlide = slideIndex;
  updateProgressBar();
}

const nextBtns = document.querySelectorAll(".next-btn");
nextBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const input = slides[currentSlide].querySelector("input, textarea, select");
    if (input && !input.value) {
      showToast("Please fill in all fields.");
    } else if (input && input.type === "email" && !isValidEmail(input.value)) {
      showToast("Please enter a valid email address.");
    } else if (input && input.id === "mobile" && !isValidMobile(input.value)) {
      showToast("Please enter a valid mobile number.");
    } else if (currentSlide === 4 && !isRadioChecked()) {
      showToast("Please select an option.");
    } else {
      showSlide(currentSlide + 1);
    }
  });
});

const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission
  const input = slides[currentSlide].querySelector("input, textarea, select");
  if (input && !input.value) {
    showToast("Please fill in all fields.");
  } else if (input && input.type === "email" && !isValidEmail(input.value)) {
    showToast("Please enter a valid email address.");
  } else if (input && input.id === "mobile" && !isValidMobile(input.value)) {
    showToast("Please enter a valid mobile number.");
  } else {
    submitForm();
  }
});

function submitForm() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);

  // Show loading state
  const submitButton = document.querySelector(".submit-btn");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Submitting...";
  submitButton.disabled = true;

  // Check if we're in development mode (localhost or file://)
  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "file:";

  fetch("debug-form.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the response text first
      return response.text();
    })
    .then((responseText) => {
      // Try to parse JSON, with better error handling
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Response text:", responseText);
        console.error("Response length:", responseText.length);

        // Check if this looks like HTML (common when PHP isn't working)
        if (
          responseText.trim().startsWith("<!DOCTYPE") ||
          responseText.trim().startsWith("<html")
        ) {
          throw new Error(
            "Received HTML instead of JSON - PHP may not be working"
          );
        }

        // Show the actual response for debugging
        if (
          isDevelopment ||
          window.location.hostname === "theelderlywellness.com"
        ) {
          throw new Error("Server response: " + responseText.substring(0, 200));
        }

        throw new Error("Invalid response from server");
      }

      if (data.success) {
        // Show success message
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "#4CAF50",
          },
          stopOnFocus: true,
        }).showToast();

        // Redirect to thank you page after a short delay
        setTimeout(() => {
          window.location.href = "thank-you.html";
        }, 1500);
      } else {
        // Show error message
        Toastify({
          text: data.message,
          duration: 4000,
          gravity: "top",
          position: "center",
          style: {
            background: "#ff6347",
          },
          stopOnFocus: true,
        }).showToast();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);

      let errorMessage = "An error occurred. Please try again later.";

      // Provide more helpful error messages in development
      if (isDevelopment) {
        if (error.message.includes("PHP may not be working")) {
          errorMessage =
            "PHP is not running! Please use a local server like XAMPP or run 'php -S localhost:8000' in your project directory.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Cannot connect to server. Make sure you're running a local PHP server.";
        } else if (error.message.includes("HTTP error")) {
          errorMessage = `Server error: ${error.message}. Check your PHP configuration.`;
        }
      }

      Toastify({
        text: errorMessage,
        duration: 6000, // Longer duration for development messages
        gravity: "top",
        position: "center",
        style: {
          background: "#ff6347",
        },
        stopOnFocus: true,
      }).showToast();

      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  const mobileRegex = /^[+]?[0-9]+$/;
  return mobileRegex.test(mobile);
}

function updateProgressBar() {
  const progress = (currentSlide + 1) * (100 / slides.length);
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = progress + "%";
}

function isRadioChecked() {
  const radioInputs = slides[currentSlide].querySelectorAll(
    'input[type="radio"]'
  );
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked) {
      return true;
    }
  }
  return false;
}

window.addEventListener("load", () => {
  document.getElementById("myForm").reset();
});
