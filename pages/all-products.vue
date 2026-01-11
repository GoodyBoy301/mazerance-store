<template>
  <main class="page" id="home">
    <div class="all">
      <div class="all-heading">
        <h2>All merch</h2>
        <button @click="filterOpen = !filterOpen">
          <span v-if="!filterOpen">Fiter</span>
          <span v-else>CLOSE</span>
          <SvgoClose v-if="filterOpen" />
        </button>
      </div>
      <Loader v-if="pending" />
      <div class="all-list" :class="{ isLoaded }">
        <NuxtLink v-for="product in filteredProducts" :key="product.id" :href="`/product/${product.handle}`">
          <figure>
            <img :src="product.images.edges[0]?.node.url" :alt="product.images.edges[0]?.node.altText" />
          </figure>
          <h3>{{ product.title }}</h3>
          <div>
            <!-- <h4>{{ product.handle }}</h4>
            <i></i> -->
            <h5>${{ formatPrice(product.priceRange.minVariantPrice.amount) }}</h5>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-if="filterOpen" class="all-filter-overlay" @click.self="filterOpen = false">
      <div class="all-filter-modal">
        <h3>Filter</h3>
        <div class="all-filter-section">
          <h4>SIZE</h4>
          <select v-model="filters.size">
            <option value="">All Sizes</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="2xl">2XL</option>
          </select>
        </div>

        <div class="all-filter-section">
          <h4>COLOR</h4>
          <select v-model="filters.color">
            <option value="">All Colors</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
          </select>
        </div>

        <div class="all-filter-section">
          <h4>COLLECTION</h4>
          <select v-model="filters.collection">
            <option value="">All Collections</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div class="all-filter-section">
          <h4>PRICE</h4>
          <input v-model.number="filters.maxPrice" type="number" placeholder="Max price" />
        </div>

        <button class="all-filter-save" @click="applyFilters">SAVE</button>
        <button class="all-filter-clear" @click="clearFilters">CLEAR ALL</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import gsap from "gsap";
import VanillaTilt from "vanilla-tilt";
import { formatPrice } from "~/utils/number";

type Product = {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string } }> };
};

const isLoaded = ref(false);
const filterOpen = ref(false);
const { data, pending } = await useLazyFetch<{ data: { search: { edges: Array<{ node: Product }> } } }>("/api/all");
const products = computed(() => data.value?.data.search.edges.map((e) => e.node) ?? []);

const filters = reactive({
  size: "",
  color: "",
  collection: "",
  maxPrice: null as number | null,
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    if (filters.size && !product.title.toLowerCase().includes(filters.size)) return false;
    if (filters.color && !product.title.toLowerCase().includes(filters.color)) return false;
    if (filters.collection && !product.handle.toLowerCase().includes(filters.collection)) return false;
    if (filters.maxPrice && parseFloat(product.priceRange.minVariantPrice.amount) > filters.maxPrice) return false;
    return true;
  });
});

function applyFilters() {
  filterOpen.value = false;
}

function clearFilters() {
  filters.size = "";
  filters.color = "";
  filters.collection = "";
  filters.maxPrice = null;
}

function loadProducts() {
  gsap.set(".all-list a", { autoAlpha: 0 });
  gsap.delayedCall(0.2, async () => {
    if (!filteredProducts) return;
    gsap.utils.toArray<HTMLElement>(".all-list figure").forEach((figure) => {
      VanillaTilt.init(figure, { max: 7.5, scale: 1.05, speed: 400 });
    });
    await gsap.fromTo(".all-list a", { yPercent: 50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 3, stagger: { amount: 0.2 } });
    isLoaded.value = true;
  });
}

onMounted(() => {
  watch(
    filteredProducts,
    () => {
      loadProducts();
    },
    { immediate: true }
  );
});
</script>
