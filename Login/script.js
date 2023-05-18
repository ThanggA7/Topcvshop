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
  
      // Gửi yêu cầu lấy dữ liệu từ JSONBin
      fetch("https://api.jsonbin.io/v3/b/6465b3be8e4aa6225e9f233a/latest", {
        method: "GET",
        headers: {
          "X-Master-Key": "$2b$10$f3meDw2Gm270nM5Smn72a.KwG4O8i5724h7HGbm1lNH5oZfESVIJO"
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
        // Kiểm tra email đã tồn tại trong dữ liệu hay chưa
        const existingUser = data.users.find(function(user) {
          return user.email === registerEmail.value;
        });
  
        if (existingUser) {
          showMessage(registerMessage, "Email already exists. Please use a different email.", "error");
          return;
        }
  
        // Tạo đối tượng người dùng mới
        const newUser = {
          username: registerUsername.value,
          email: registerEmail.value,
          password: registerPassword.value
        };
  
        // Thêm người dùng mới vào dữ liệu
        data.users.push(newUser);
  
        // Gửi yêu cầu cập nhật dữ liệu lên JSONBin
        return fetch("https://api.jsonbin.io/v3/b/6465b3be8e4aa6225e9f233a", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2b$10$f3meDw2Gm270nM5Smn72a.KwG4O8i5724h7HGbm1lNH5oZfESVIJO"
          },
          body: JSON.stringify(data)
        });
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
  
      // Gửi yêu cầu lấy dữ liệu từ JSONBin
      fetch("https://api.jsonbin.io/v3/b/6465b3be8e4aa6225e9f233a/latest", {
        method: "GET",
        headers: {
          "X-Master-Key": "$2b$10$f3meDw2Gm270nM5Smn72a.KwG4O8i5724h7HGbm1lNH5oZfESVIJO"
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
        const user = data.users.find(function(user) {
          return user.email === loginEmail.value && user.password === loginPassword.value;
        });
  
        if (user) {
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
  
