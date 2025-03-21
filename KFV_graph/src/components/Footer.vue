<script setup>
</script>

<template>
  <div class="footer-container">
    <p>© 2025 <a class="hover-underline-animation left" href="https://github.com/Maria-Feher-Lehrner/Verkehrsdaten-Graphik" target="_blank">Maria Feher-Lehrner</a></p>
  </div>

</template>

<style scoped>
.footer-container {
  padding: 0.5rem;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #00489a;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
}

.hover-underline-animation.left::after {
  transform-origin: bottom right;
}

.hover-underline-animation.left:hover::after {
  transform-origin: bottom left;
}
</style>