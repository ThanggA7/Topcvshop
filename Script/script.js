// Khởi tạo giỏ hàng
var cart = [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId, price) {
    var product = {
        id: productId,
        price: price,
        quantity: 1
    };

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
        existingProduct.quantity++;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
        cart.push(product);
    }

    // Hiển thị thông báo đã thêm vào giỏ hàng
    Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Sản phẩm đã được thêm vào giỏ hàng!'
    });
}

// Hàm hiển thị giỏ hàng
function showCart() {
    // Kiểm tra xem giỏ hàng có sản phẩm hay không
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Giỏ hàng trống',
            text: 'Bạn chưa có sản phẩm nào trong giỏ hàng!'
        });
    } else {
        // Hiển thị thông tin giỏ hàng
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

// Hàm xoá sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    // Tìm sản phẩm trong giỏ hàng
    var index = cart.findIndex(function(item) {
        return item.id === productId;
    });

    if (index !== -1) {
        // Xoá sản phẩm khỏi giỏ hàng
        cart.splice(index, 1);

        // Hiển thị thông báo xoá thành công
        Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Sản phẩm đã được xoá khỏi giỏ hàng!'
          });
      }
  
      // Cập nhật lại giao diện giỏ hàng
      showCart();
  }
