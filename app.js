const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
let cartItems = [];
let totalPrice = 0;

function showCartModal() {
  updateCartModal(); // Update the modal content
  cartModal.style.display = "block"; // Show the modal
}

// Event listener for the "Cart" button
document.getElementById("cart-button").addEventListener("click", showCartModal);

// Close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
});

// Function to update the shopping cart modal content
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  totalPrice = 0;

  cartItems.forEach((item, index) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
    totalPrice += parseFloat(item.price.replace(/\./g, ""));

    // Add event listener to each remove item button
    cartItem.querySelector(".remove-item").addEventListener("click", () => {
      removeCartItem(index);
    });
  });

  // Update total price
  cartTotal.innerText = `$${totalPrice}`;
}

// Handle removing items from the cart
function removeCartItem(index) {
  cartItems.splice(index, 1);
  updateCartModal();
  updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
  cartItems.length === 0
    ? (cartCount.innerText = "0")
    : (cartCount.innerText = cartItems.length);
}

// Fetch data from the API
fetch(`https://655045947d203ab6626da933.mockapi.io/stats`)
  .then((response) => response.json())
  .then((data) => {
    for (let i of data) {
      let card = document.createElement("div");
      card.classList.add("card");

      let imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      let image = document.createElement("img");
      image.setAttribute("src", i.img);
      imgContainer.appendChild(image);
      card.appendChild(imgContainer);

      let con = document.createElement("div");
      con.classList.add("container");

      let title = document.createElement("h5");
      title.classList.add("product-name");
      title.innerHTML = i.name;
      con.appendChild(title);

      let price = document.createElement("h5");
      price.innerHTML = `$${i.price}`;
      con.appendChild(price);

      card.appendChild(con);

      // Add a button to add items to the cart
      let addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("add-to-cart");
      addToCartBtn.innerHTML = "Add to Cart";
      addToCartBtn.addEventListener("click", () => {
        cartItems.push({ name: i.name, price: i.price });
        updateCartModal();
        updateCartCount();
      });
      card.appendChild(addToCartBtn);

      productsContainer.appendChild(card);
    }

    document.getElementById("search").addEventListener("click", () => {
      let searchInput = document.getElementById("search-input").value;
      let cards = document.querySelectorAll(".card");
      let productsName = document.querySelectorAll(".product-name");

      productsName.forEach((item, index) => {
        if (item.innerText.toLowerCase().includes(searchInput.toLowerCase())) {
          cards[index].classList.remove("hide");
        } else {
          cards[index].classList.add("hide");
        }
      });
    });
  });
