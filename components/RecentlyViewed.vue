<template>
  <section class="recent" v-if="recentlyViewedProducts.length > 0">
    <div class="recent-header">
      <h2 class="recent-title">RECENTLY VIEWED</h2>
      <div class="recent-controls">
        <button
          class="recent-nav-btn recent-nav-btn--prev"
          @click="scrollLeft"
          :disabled="!canScrollLeft"
          aria-label="Previous products"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          class="recent-nav-btn recent-nav-btn--next"
          @click="scrollRight"
          :disabled="!canScrollRight"
          aria-label="Next products"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <div class="recent-scroll-container" ref="scrollContainer">
      <div class="recent-grid">
        <NuxtLink
          class="recent-item"
          v-for="product in recentlyViewedProducts"
          :key="product.id"
          :href="`/product/${product.handle}`"
        >
          <figure>
            <img :src="product.image" :alt="product.image" />
          </figure>
          <h3>{{ product.title }}</h3>
          <div>
            <!-- <h4>{{ product.handle }}</h4>
            <i></i> -->
            <h5>${{ formatPrice(product.price) }}</h5>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useRecentlyViewed } from "~/composables/useRecentlyViewed";
import { formatPrice } from "~/utils/number";

const route = useRoute();
const { getRecentlyViewed } = useRecentlyViewed();
const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const refreshKey = ref(0);

const recentlyViewedProducts = computed(() => {
  refreshKey.value; // Access refresh key to trigger re-computation
  return getRecentlyViewed.value;
});

// Watch for route changes to refresh recently viewed
watch(
  () => route.path,
  () => {
    refreshKey.value++;
  },
  { immediate: true }
);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
};

const updateScrollState = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;
  }
};

onMounted(() => {
  updateScrollState();
  scrollContainer.value?.addEventListener("scroll", updateScrollState);
  window.addEventListener("resize", updateScrollState);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", updateScrollState);
});
</script>
