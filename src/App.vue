<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Kepribadianku</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
  background: linear-gradient(to right, #F15A2A, #29ABE2);
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to right, #F15A2A, #29ABE2);
  padding: 10px;
  height: 45px;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  width: 10rem;
  height: 2rem;
  border-radius: 15px;
  border: 2px solid white;
  transition: ease-in-out 0.3s;
}

a:hover {
  background-color: white;
  color: black;
}
</style>

