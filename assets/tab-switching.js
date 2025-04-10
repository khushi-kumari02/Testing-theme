document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button[data-tab-opener]');
  const tabPanels = document.querySelectorAll('.tab-panel[data-content-matcher]');
  const initializedSplides = new Set();

  // Add to Cart Handler
  function addToCart(variantId) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 1
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      return response.json();
    })
    .then(data => {
      console.log('✅ Product added to cart:', data);
      // Optional: show toast or open mini cart here
    })
    .catch(error => {
      console.error('❌ Add to cart error:', error);
    });
  }

  // Initialize Splide for the panel
  function initSplideForPanel(panel) {
    const splideEl = panel.querySelector('.splide');
    if (splideEl && !initializedSplides.has(splideEl.id)) {
      new Splide(`#${splideEl.id}`, {
        type: 'slide',
        perPage: 3,
        gap: '1rem',
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { perPage: 2 },
          768: { perPage: 1}
        }
      }).mount();
      initializedSplides.add(splideEl.id);
    }

    // Attach dropdown change handlers (optional logic for now)
    const productCards = panel.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const selectEl = card.querySelector('.product-variant');
      if (selectEl) {
        selectEl.addEventListener('change', () => {
          const selectedValue = selectEl.value;
          console.log(`Selected variant for product: ${selectedValue}`);
        });
      }
    });

    // Attach "Add to Bag" button handlers
    const addToBagButtons = panel.querySelectorAll('.hover-add-to-cart-btn');
    addToBagButtons.forEach(button => {
      button.addEventListener('click', function () {
        const variantId = this.getAttribute('onclick').match(/\d+/)[0]; // Extract ID from inline string
        if (variantId) {
          addToCart(variantId);
        }
      });
    });
  }

  // Init first visible tab
  const firstVisible = document.querySelector('.tab-panel:not(.custom-hidden)');
  if (firstVisible) {
    initSplideForPanel(firstVisible);
  }

  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabOpener;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabPanels.forEach(panel => {
        if (panel.dataset.contentMatcher === target) {
          panel.classList.remove('custom-hidden');
          initSplideForPanel(panel);
        } else {
          panel.classList.add('custom-hidden');
        }
      });
    });
  });
});

