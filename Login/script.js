document.addEventListener("DOMContentLoaded", function() {
  const registerTab = document.getElementById("register-tab");
  const loginTab = document.getElementById("login-tab");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const registerUsername = document.getElementById("register-username");
  const registerEmail = document.getElementById("register-email");
  const registerPassword = document.getElementById("register-password");
  const registerConfirmPassword = document.getElementById("register-confirm-password");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const registerMessage = document.getElementById("register-message");
  const loginMessage = document.getElementById("login-message");

  registerTab.addEventListener("click", function() {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  });

  loginTab.addEventListener("click", function() {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (registerUsername.value === "" || registerEmail.value === "" || registerPassword.value === "" || registerConfirmPassword.value === "") {
      showMessage(registerMessage, "Please enter all fields!", "error");
      return;
    }

    if (registerPassword.value !== registerConfirmPassword.value) {
      showMessage(registerMessage, "Passwords do not match!", "error");
      return;
    }

    if (!isValidPassword(registerPassword.value)) {
      showMessage(registerMessage, "Password should not contain special characters!", "error");
      return;
    }

    // Gửi yêu cầu đăng ký đến JSONBin
    fetch("https://api.jsonbin.io/v3/b/6465c761b89b1e22999fd5e6", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2b$10$JRUjpE/EjtU9wxot/t6YPOCmmD7CuaKaSmic2gdQ0lGQFr3qTZqdO"
      },
      body: JSON.stringify({
        username: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value
      })
    })
    .then(function(response) {
      if (response.ok) {
        showMessage(registerMessage, "Registration successful!", "success");
        registerForm.reset();
      } else {
        showMessage(registerMessage, "Registration failed. Please try again later.", "error");
      }
    })
    .catch(function(error) {
      showMessage(registerMessage, "Registration failed. Please try again later.", "error");
    });
  });

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (loginEmail.value === "" || loginPassword.value === "") {
      showMessage(loginMessage, "Please enter all fields!", "error");
      return;
    }

    // Gửi yêu cầu đăng nhập đến JSONBin
    fetch("https://api.jsonbin.io/v3/b/6465c761b89b1e22999fd5e6", {
      method: "GET",
      headers: {
        "X-Master-Key": "$2b$10$JRUjpE/EjtU9wxot/t6YPOCmmD7CuaKaSmic2gdQ0lGQFr3qTZqdO"
      }
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch JSONBin data.");
      }
    })
    .then(function(data) {
      // Kiểm tra email và mật khẩu
      if (data.email === loginEmail.value && data.password === loginPassword.value) {
        showMessage(loginMessage, "Login successful!", "success");
        loginForm.reset();
      } else {
        showMessage(loginMessage, "Invalid email or password. Please try again.", "error");
      }
    })
    .catch(function(error) {
      showMessage(loginMessage, "Login failed. Please try again later.", "error");
    });
  });

  function showMessage(element, message, type) {
    element.textContent = message;
    element.style.display = "block";
    element.classList.remove("success", "error");
    element.classList.add(type);
  }

  function isValidPassword(password) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(password);
  }
});
