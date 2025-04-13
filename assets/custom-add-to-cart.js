class CustomAddToCart extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector("button"); // Keep this in constructor if you want
  }

  connectedCallback() {
    // Moved the event listener from constructor to here
    this.addEventListener("click", (e) => {
      this.handleClick(e);
    });
  }

  async handleClick(event) {
    event.preventDefault();

    const productid = this.button.getAttribute('data-variant-id');
    const quantity = this.button.getAttribute('data-quantity');

    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: productid,
          quantity: Number(quantity),
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  }
}

customElements.define("custom-add-to-cart", CustomAddToCart);


// const quantityInput = document.querySelector('.quantity__input');
// const addToCartButton = document.querySelector('custom-add-to-cart button');
// const customAddToCart = document.querySelector('custom-add-to-cart');

// // Function to get price from selected variant
// function getVariantPrice() {
//   const selectedOption = variantSelect.options[variantSelect.selectedIndex];
//   return parseFloat(selectedOption.dataset.price);
// }

// // Update button text
// function updateButtonPrice() {
//   const quantity = parseInt(quantityInput.value) || 1;
//   const price = getVariantPrice();
//   const total = (price * quantity).toFixed(2);
//   addToCartButton.innerHTML = AddtoCart - {total};
// }

// // Event listeners
// quantityInput.addEventListener('input', updateButtonPrice);
// variantSelect.addEventListener('change', updateButtonPrice);

// // Initial update on load
// updateButtonPrice();

