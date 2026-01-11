import { ref, computed } from "vue";

export interface RecentlyViewedProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string;
  viewedAt?: number;
}

const STORAGE_KEY = "mazerance_recently_viewed";
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const recentlyViewed = ref<RecentlyViewedProduct[]>([]);
  const isInitialized = ref(false);

  // Load from localStorage on first use
  const init = () => {
    if (isInitialized.value) return;

    if (process.client) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          recentlyViewed.value = JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse recently viewed from localStorage", e);
          recentlyViewed.value = [];
        }
      }
    }
    isInitialized.value = true;
  };

  // Add a product to recently viewed
  const addProduct = (product: RecentlyViewedProduct) => {
    init();

    // Remove duplicate if exists
    recentlyViewed.value = recentlyViewed.value.filter((p) => p.handle !== product.handle);

    // Add to beginning with current timestamp
    const productToAdd = {
      ...product,
      viewedAt: Date.now(),
    };
    recentlyViewed.value.unshift(productToAdd);

    // Keep only the most recent MAX_ITEMS
    if (recentlyViewed.value.length > MAX_ITEMS) {
      recentlyViewed.value = recentlyViewed.value.slice(0, MAX_ITEMS);
    }

    // Save to localStorage
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed.value));
    }
  };

  // Get recently viewed products
  const getRecentlyViewed = computed(() => {
    init();
    return recentlyViewed.value;
  });

  // Clear all recently viewed
  const clearRecentlyViewed = () => {
    recentlyViewed.value = [];
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Remove specific product
  const removeProduct = (handle: string) => {
    recentlyViewed.value = recentlyViewed.value.filter((p) => p.handle !== handle);
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed.value));
    }
  };

  return {
    addProduct,
    getRecentlyViewed,
    clearRecentlyViewed,
    removeProduct,
  };
};
