document.querySelectorAll('span[data-tab-opener]').forEach(opener => {
    opener.addEventListener('click', () => {
        const target = opener.dataset.tabOpener;

        // Remove active class and hide all content elements
        document.querySelectorAll('span[data-tab-opener]').forEach(o => o.classList.remove('active'));
        document.querySelectorAll('[data-content-matcher]').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        }); 

        // Add active class to the clicked opener
        opener.classList.add('active');

        // Find and show the matching content
        const matchedContent = document.querySelector(`[data-content-matcher="${target}"]`);
        if (matchedContent) {
            matchedContent.classList.add('active');
            matchedContent.style.display = 'flex';
        }
    });
});