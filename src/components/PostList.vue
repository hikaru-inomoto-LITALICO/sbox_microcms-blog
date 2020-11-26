<template>
  <ul class="divide-y">
    <li v-for="p in posts" :key="p.id" class="flex p-2">
      <router-link :to="`/posts/${p.id}`">{{ p.title }} </router-link>
      <ul class="ml-4 flex">
        <li v-for="c in p.categories" :key="c.id">
          <router-link to="/" class="text-sm rounded bg-blue-200 m-1 p-1"
            >{{ c.title }}
          </router-link>
        </li>
      </ul>
      <div class="flex-grow"></div>
      <div class="text-sm">{{ p.publishedAt.toLocaleString() }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type Props = {
  posts: Promise<Post[]>;
};

export default defineComponent({
  props: {
    posts: {
      type: Object as PropType<Promise<Post[]>>,
      required: true,
    },
  },
  async setup(props: Props) {
    const posts = await props.posts;
    return { posts };
  },
});
</script>
