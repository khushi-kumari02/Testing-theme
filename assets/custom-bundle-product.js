
  document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.bundle-checkbox');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', async function () {
        const variantId = this.value;

        if (this.checked) {
          // Add to cart
          await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              id: variantId,
              quantity: 1
            })
          }).then(res => res.json())
            .then(data => {
              console.log(`Added ${variantId} to cart`);
            })
            .catch(err => console.error('Add to cart error:', err));
        } else {
          // Remove from cart
          fetch('/cart.js')
            .then(res => res.json())
            .then(cart => {
              const item = cart.items.find(i => i.variant_id == variantId);
              if (item) {
                fetch('/cart/change.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    id: item.key,
                    quantity: 0
                  })
                }).then(() => {
                  console.log(`Removed ${variantId} from cart`);
                });
              }
            });
        }
      });
    });
  });

