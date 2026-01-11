<template>
  <header class="header" :class="{ searchOpen: search.isOpen.value }">
    <NuxtLink href="/" class="header-logo" v-if="!search.isOpen.value">
      <SvgoLogo />
    </NuxtLink>
    <div class="header-links" v-if="!search.isOpen.value">
      <NuxtLink href="/all-products">ALL PRODUCTS</NuxtLink>
      <NuxtLink href="/limited-drops">LIMITED DROPS</NuxtLink>
      <NuxtLink href="/bundles-and-loadouts">BUNDLES AND LOADOUTS</NuxtLink>
      <NuxtLink href="/archive-releases">ARCHIVE RELEASES</NuxtLink>
    </div>
    <div class="header-search" :class="{ isOpen: search.isOpen.value }">
      <SvgoSearch filled />
      <input type="text" name="search" v-model="search.term.value" @click="search.open" placeholder="SEARCH" />
      <SvgoClose filled @click="search.close" v-if="search.isOpen.value" />
    </div>
    <div class="header-actions">
      <NuxtLink href="me">
        <SvgoProfile filled />
      </NuxtLink>
      <button>
        <SvgoWishlist filled />
      </button>
      <button>
        <SvgoCart filled />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const search = useSearch();
</script>
