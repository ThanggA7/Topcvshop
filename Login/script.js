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

    // Kiểm tra xem người dùng đã tồn tại trong Local Storage chưa
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(function(user) {
      return user.email === registerEmail.value;
    });

    if (existingUser) {
      showMessage(registerMessage, "Email already exists. Please use a different email.", "error");
      return;
    }

    // Thêm người dùng mới vào Local Storage
    const newUser = {
      username: registerUsername.value,
      email: registerEmail.value,
      password: registerPassword.value
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showMessage(registerMessage, "Registration successful!", "success");
    registerForm.reset();
  });

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (loginEmail.value === "" || loginPassword.value === "") {
      showMessage(loginMessage, "Please enter all fields!", "error");
      return;
    }

    // Lấy danh sách người dùng từ Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email và mật khẩu
    const user = users.find(function(user) {
      return user.email === loginEmail.value && user.password === loginPassword.value;
    });

    if (user) {
      showMessage(loginMessage, "Login successful!", "success");
      loginForm.reset();
    } else {
      showMessage(loginMessage, "Invalid email or password. Please try again.", "error");
    }
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
