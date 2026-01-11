<template>
  <footer class="footer">
    <!-- More from Mazerance Section -->
    <div class="footer-more">
      <h2>MORE FROM MAZERANCE</h2>
      <NuxtLink to="https://mazerance.com" target="_blank">VISIT MAZERANCE</NuxtLink>
    </div>

    <!-- Home and Kickstarter Sections -->
    <ul class="footer-websites">
      <li :style="{ background: '#333' }">
        <h3>HOME</h3>
      </li>
      <li :style="{ background: '#212121' }">
        <h3>KICKSTARTER</h3>
      </li>
    </ul>

    <!-- Footer Navigation -->
    <nav class="footer-links">
      <div class="footer-links-column">
        <h4 class="footer-links-title">PRODUCTS</h4>
        <ul class="footer-links-list">
          <li><NuxtLink to="/all-products">ALL PRODUCTS</NuxtLink></li>
          <li><NuxtLink to="/collections">COLLECTIONS</NuxtLink></li>
          <li><NuxtLink to="/limited-drops">LIMITED DROPS</NuxtLink></li>
          <li><NuxtLink to="/archive-releases">ARCHIVE</NuxtLink></li>
          <li><NuxtLink to="/bundles-and-loadouts">BUNDLES</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-links-column">
        <h4 class="footer-links-title">SUPPORT</h4>
        <ul class="footer-links-list">
          <li><NuxtLink href="/faq">FAQ</NuxtLink></li>
          <li><NuxtLink href="/shipping-and-returns">SHIPPING & RETURNS</NuxtLink></li>
          <li><NuxtLink href="/contact">CONTACT</NuxtLink></li>
          <li><NuxtLink href="/track-order">TRACK ORDER</NuxtLink></li>
          <li><NuxtLink href="/policies">POLICIES</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-links-column">
        <h4 class="footer-links-title">ABOUT</h4>
        <ul class="footer-links-list">
          <li><NuxtLink href="/studio">STUDIO</NuxtLink></li>
          <li><NuxtLink href="/career">CAREER</NuxtLink></li>
          <li><NuxtLink href="/discord">DISCORD</NuxtLink></li>
          <li><NuxtLink href="/kickstarter">KICKSTARTER</NuxtLink></li>
        </ul>
      </div>

      <SvgoLogo />
    </nav>
  </footer>
</template>
