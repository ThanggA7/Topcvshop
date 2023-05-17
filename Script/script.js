var cart = [];

function addToCart(productId, price) {
    var product = {
        id: productId,
        price: price,
        quantity: 1
    };

    var existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Sản phẩm đã được thêm vào giỏ hàng!'
    });
}

function showCart() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Giỏ hàng trống',
            text: 'Bạn chưa có sản phẩm nào trong giỏ hàng!'
        });
    } else {
        var html = '<h3>Giỏ hàng của bạn</h3>';
        html += '<ul>';
        var total = 0;
        cart.forEach(function(item) {
            var subtotal = item.quantity * item.price;
            total += subtotal;
            html += '<li>Sản phẩm ' + item.id + ': ' + item.quantity + ' x ' + item.price + ' = ' + subtotal + ' <button class="btn btn-danger btn-sm" onclick="removeFromCart(' + item.id + ')">Xoá</button></li>';
        });
        html += '</ul>';
        html += '<p>Tổng số tiền: ' + total + '</p>';
        html += '<button class="btn btn-primary" onclick="checkout()">Thanh toán</button>';

        Swal.fire({
            icon: 'info',
            title: 'Giỏ hàng',
            html: html
        });
    }
}

function removeFromCart(productId) {
    var index = cart.findIndex(function(item) {
        return item.id === productId;
    });

    if (index !== -1) {
        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Sản phẩm đã được xoá khỏi giỏ hàng!'
        });
    }

    showCart();
}

function getRandomColor() {
    var colors = ['#87CEEB', '#FFC0CB', '#FFC0CB', '#000000'];
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function changeTextColor() {
    var titleElement = document.getElementById('product-title');
    var randomColor = getRandomColor();

    titleElement.style.color = randomColor;
}

changeTextColor();

setInterval(changeTextColor, 500);

var notifications = [
    "Thông báo sản phẩm của chúng tôi chưa sẵn mặt hàng để bán, xin quý khách vui lòng trở lại sau!"
];

var notificationText = document.getElementById("notification-text");
var index = 0;

function showNotification() {
    notificationText.textContent = notifications[index];
    index = (index + 1) % notifications.length;
}

showNotification();

setInterval(showNotification, 900000);

// Đăng nhập
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công',
            text: 'Chào mừng bạn đến với trang quản lý!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'Tên đăng nhập hoặc mật khẩu không chính xác!'
        });
    }
}
