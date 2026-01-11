<template>
  <main class="page" id="product">
    <div class="product">
      <Loader v-if="pending" />
      <template v-else-if="data">
        <div class="product-media">
          <figure v-for="media in data?.data.product.images.edges">
            <img :src="media.node.url" :alt="media.node.altText" />
          </figure>
        </div>
        <div class="product-details">
          <h2>{{ data?.data.product.title }}</h2>
          <h3>${{ formatPrice(data?.data.product.priceRange.minVariantPrice.amount) }}</h3>
          <hr />
          <h4>Color</h4>
          <div class="colors">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <hr />
          <h4>available sizes (US)</h4>
          <div class="sizes">
            <div>XS</div>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <div class="sizes">
            <div>uk 6</div>
            <div>uk 9</div>
            <div>uk 12</div>
            <div>uk 20</div>
            <div>uk 32</div>
            <div>uk 40</div>
          </div>
          <hr />
          <div class="ctas">
            <button class="primary">
              <span>add to cart </span>
            </button>
            <button class="secondary">
              <span>favorite </span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRecentlyViewed } from "~/composables/useRecentlyViewed";
import { ref, watch, computed } from "vue";

const route = useRoute();
const { addProduct } = useRecentlyViewed();

const slug = computed(() => route.params.slug as string);
const { data, pending } = await useLazyFetch<{ data: { product: Product } }>(`/api/product/${slug.value}`);

const productTitle = ref("Product");
const productPrice = ref("$0.00");
const productImage = ref("");

type Product = {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string } };
  images: { edges: Array<{ node: { url: string; altText: string } }> };
};

const trackProductAsViewed = (product: Product) => {
  const imageUrl = product.images?.edges?.[0]?.node?.url || "";

  console.log({
    id: product.id,
    title: product.title,
    handle: product.handle,
    price: product.priceRange.minVariantPrice.amount,
    image: imageUrl,
  });

  addProduct({
    id: product.id,
    title: product.title,
    handle: product.handle,
    price: product.priceRange.minVariantPrice.amount,
    image: imageUrl,
  });
};

onMounted(() => {
  watch(
    [route.params, data],
    () => {
      if (data) {
        const product = data.value?.data.product;
        if (product) trackProductAsViewed(product);
      }
    },
    { immediate: true }
  );
});
</script>
