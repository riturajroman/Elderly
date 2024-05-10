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
submitBtn.addEventListener("click", () => {
  const input = slides[currentSlide].querySelector("input, textarea, select");
  if (input && !input.value) {
    showToast("Please fill in all fields.");
  } else if (input && input.type === "email" && !isValidEmail(input.value)) {
    showToast("Please enter a valid email address.");
  } else if (input && input.id === "mobile" && !isValidMobile(input.value)) {
    showToast("Please enter a valid mobile number.");
  } else {
    document.getElementById("myForm").submit();
  }
});

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
