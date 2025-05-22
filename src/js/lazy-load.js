// lazy-load.js
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    // The image source is already in src, so we just need to trigger load
                    // by removing 'lazy' and adding 'lazy-loaded' for the CSS transition.
                    // If src was a placeholder and the real URL was in data-src, you'd do:
                    // lazyImage.src = lazyImage.dataset.src;

                    lazyImage.classList.remove("lazy");
                    lazyImage.classList.add("lazy-loaded");
                    lazyImageObserver.unobserve(lazyImage); // Stop observing once loaded
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers that don't support IntersectionObserver
        // This will load all images after a short delay, not true lazy loading.
        // For a more robust fallback, you might handle scroll events.
        console.warn("IntersectionObserver not supported. Lazy loading will be less efficient.");
        lazyImages.forEach(function(lazyImage) {
            // For simplicity, just load them directly.
            // A more complete fallback would listen to scroll events.
            lazyImage.classList.remove("lazy");
            lazyImage.classList.add("lazy-loaded");
        });
    }
});
