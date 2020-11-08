<template>
  <main class="mx-auto max-w-screen-lg">
    <Suspense>
      <template #default>
        <post-detail :post="post"></post-detail>
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

import PostDetail from "../../components/PostDetail.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    "post-detail": PostDetail,
  },
  setup() {
    const post = Posts.show(useRoute().params.id as string);
    return { post };
  },
});
</script>
