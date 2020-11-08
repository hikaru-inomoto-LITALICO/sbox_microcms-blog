<template>
  <main class="mx-auto max-w-screen-lg">
    <h1 class="text-lg font-bold">Pages</h1>
    <router-link to="/posts" class="text-indigo-600">posts</router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
