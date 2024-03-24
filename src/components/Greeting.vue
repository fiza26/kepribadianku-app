<script setup>
import { defineProps } from "vue";

const props = defineProps(['usernameState', 'username']);
</script>

<template>
    <h1 v-if="usernameState">Hi... <p v-if="username"> {{ username }}</p>Nice to see you!👏</h1>
</template>

<style scope></style>