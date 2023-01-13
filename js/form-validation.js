const form = document.querySelector("#contact-form");
const fname = document.querySelector("#fname");
const fnameError = document.querySelector("#fnameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

/*TODO: check event, is it being deprecated? */
function validateForm(event) {
  event.preventDefault();

  if (checkLength(fname.value, 4) === true) {
    fnameError.style.display = "none";
  } else {
    fnameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(subject.value, 14) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 24) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatchers = regEx.test(email);
  return patternMatchers;
}

form.addEventListener("submit", validateForm);
