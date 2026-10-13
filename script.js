// ================================
// College Event Management Website
// JavaScript Features:
// 1. Registration form validation
// 2. Dark/light mode
// 3. Digital clock
// 4. Dynamic event filtering
// 5. Event registration button
// ================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

// Close mobile menu after clicking a navigation link
document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("show"));
});

// ---------- Dark / Light Mode ----------
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");
  themeBtn.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// ---------- Digital Clock ----------
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  document.getElementById("digitalClock").textContent =
    `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);

// ---------- Dynamic Event Filtering ----------
const filterButtons = document.querySelectorAll(".filter");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;

    eventCards.forEach(card => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? "flex"
          : "none";
    });
  });
});

// ---------- Event Buttons ----------
document.querySelectorAll(".register-event").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("eventSelect").value = button.dataset.event;
    document.getElementById("registration").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ---------- Registration Form Validation ----------
const registrationForm = document.getElementById("registrationForm");

function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(error => error.textContent = "");
}

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNo").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const department = document.getElementById("department").value;
  const eventName = document.getElementById("eventSelect").value;
  const gender = document.querySelector('input[name="gender"]:checked');

  let valid = true;

  if (name.length < 3) {
    setError("studentName", "Please enter a valid name.");
    valid = false;
  }

  if (!/^[A-Za-z0-9/-]{3,20}$/.test(roll)) {
    setError("rollNo", "Enter a valid roll number.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter a valid email address.");
    valid = false;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    setError("phone", "Enter a valid 10-digit Indian mobile number.");
    valid = false;
  }

  if (!department) {
    setError("department", "Please select your department.");
    valid = false;
  }

  if (!gender) {
    setError("gender", "Please select your gender.");
    valid = false;
  }

  if (!eventName) {
    setError("eventSelect", "Please select an event.");
    valid = false;
  }

  const message = document.getElementById("formMessage");

  if (valid) {
    message.textContent =
      `Registration successful! ${name}, you are registered for ${eventName}.`;
    message.className = "form-message success";
    registrationForm.reset();
  } else {
    message.textContent = "Please correct the highlighted fields.";
    message.className = "form-message";
  }
});

// ---------- Feedback Form ----------
document.getElementById("feedbackForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("feedbackName").value.trim();
  const email = document.getElementById("feedbackEmail").value.trim();
  const feedback = document.getElementById("feedback").value.trim();
  const message = document.getElementById("feedbackMessage");

  if (
    name.length < 3 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    feedback.length < 10
  ) {
    message.textContent =
      "Please enter a valid name, email and feedback of at least 10 characters.";
    message.className = "form-message";
    return;
  }

  message.textContent = "Thank you! Your feedback has been submitted.";
  message.className = "form-message success";
  this.reset();
});
