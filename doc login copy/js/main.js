/**
  *RegEx	            Description
    ^	                The password string will start this way
    (?=.*[a-z])	      The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z])	      The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9])	      The string must contain at least 1 numeric character
    (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    (?=.{8,})	        The string must be eight characters or longer
  */
var passowrd_regex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9@#$_]{10,}$/;
var userPassword = "";

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, messageArray) {
  inputElement.classList.add("form__input--error");

  // Check if previous error message exists, overwrite with new.
  let doesPreviousErrorExist = inputElement.parentElement.querySelector(
    ".form__input-error-message"
  );
  if (doesPreviousErrorExist != null) {
    doesPreviousErrorExist.remove();
  }

  let errorDiv = document.createElement("div");
  errorDiv.classList.add("form__input-error-message");

  let error = "";
  messageArray.forEach((message) => {
    error += `<div>${message}</div>`;
  });

  errorDiv.innerHTML = error;
  inputElement.parentElement.appendChild(errorDiv);
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perform your AJAX/Fetch login

    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      //Username validation
      if (
        e.target.id === "signupUsername" &&
        (e.target.value.length == 0 || e.target.value.length > 18)
      ) {
        setInputError(inputElement, [
          "Username must be atmost 18 characters in length",
        ]);
      }
      // Password Validation
      if (e.target.id === "user_password") {
        userPassword = e.target.value;
        if (!passowrd_regex.test(userPassword)) {
          setInputError(inputElement, [
            "Password must be atmost 10 characters in length",
            "use symbols like /?#$%^&*(etc, use combination of upper and lower case letters, use numeric digits",
          ]);
        }
      }
      // Confirm Password Validation
      if (
        e.target.id === "user_confirmPassword" &&
        !passowrd_regex.test(e.target.value)
      ) {
        if (e.target.value != userPassword) {
          setInputError(inputElement, [
            "Passowrd and Confirm passowrd are not same",
          ]);
        }
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});
