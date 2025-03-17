<script setup>
import Footer from './components/Footer.vue'
</script>

<template>
  <header>


    <div class="wrapper">
      <img alt="KFV logo" class="logo" src="./assets/KFV_Logo.jpg" width="203" height="93" />
      <div class="title">
        <h1>Verkehrstote in Österreich</h1>
        <h2>Nach Bundesland und Berichtsjahr</h2>
      </div>
    </div>
  </header>

  <main>
    <p>Platzhalter</p>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo {
    margin-bottom: 1rem;
  }
}

.title {
  display: flex;
  flex-direction: column;
}

.logo {
  height: auto;
  max-width: 100%;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
