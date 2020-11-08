<template>
  <main class="mx-auto max-w-screen-lg">
    <h1 class="text-lg font-bold">Articles</h1>
    <Suspense>
      <template #default>
        <post-list :posts="posts"></post-list>
      </template>
      <template #fallback>
        <p>loading...</p>
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as Posts from "../../services/posts";

import PostList from "../../components/PostList.vue";

export default defineComponent({
  components: {
    "post-list": PostList,
  },
  setup() {
    const posts = Posts.index();
    return { posts };
  },
});
</script>
