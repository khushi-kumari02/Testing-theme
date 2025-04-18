class ClearBundle extends HTMLElement {
  constructor() {
    super();
    this.cart = document.querySelector("cart-notification")||  document.querySelector("cart-drawer");
  }
  connectedCallback() {
    const button = this.querySelector("button");
    if (!button) return;
    button.addEventListener("click", async () => {
      try {
        const cart = await fetch("/cart.js").then(res => res.json());
        const updates = {};
        cart.items.forEach((item, index) => {
          if (item.properties && item.properties.bundle === "true") {
            updates[item.key] = 0;
          }
        });
      const response =  await fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            updates,
            sections: ["cart-drawer", "cart-icon-bubble"],
            sections_url: window.location.pathname,
          }),
        });
        const responseData = await response.json()
        const parser = new DOMParser();
        const html = parser.parseFromString(responseData.sections['cart-drawer'], 'text/html');
        this.cart.innerHTML = html.querySelector("cart-drawer").innerHTML;
      } catch (err) {
        console.error("Error clearing bundle items:", err);
      }
    });
  }
}
customElements.define("clear-bundle", ClearBundle);
