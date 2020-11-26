<template>
  <article class="divide-y">
    <header class="py-4">
      <div class="max-w-screen-sm mx-auto">
        <img :src="visual" alt="" />
      </div>
      <div class="h-6 mt-6 border-bottom-1">
        <small>{{ publishedAt }}</small>
      </div>
      <h1 class="text-2xl font-bold mt-2">{{ title }}</h1>
      <p class="mt-2">{{ description }}</p>
    </header>

    <div class="mt-6">
      <div v-for="(content, i) in contents" :key="i" class="mt-4">
        <div v-if="content.type === 'section'">
          <div class="html-content mt-4" v-html="content.html"></div>
        </div>
        <div v-if="content.type === 'image'" class="max-w-screen-sm mx-auto">
          <img :src="content.src" :alt="content.alt" />
        </div>
      </div>
    </div>

    <footer class="p-4">
      <div v-for="supervisor in supervisors" :key="supervisor.id" class="flex">
        <div class="flex-shrink-0 w-32 h-32 mr-4">
          <img :src="supervisor.picture" :alt="supervisor.name" />
        </div>
        <div>
          <div class="font-bold">{{ supervisor.name }}</div>
          <div class="text-sm">{{ supervisor.description }}</div>
        </div>
      </div>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type Props = {
  post: Promise<Post>;
};

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Promise<Post>>,
      required: true,
    },
  },
  async setup(props: Props) {
    const post = await props.post;
    return {
      visual: post.visual,
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt.toLocaleDateString(),
      contents: post.contents,
      supervisors: post.supervisors,
    };
  },
});
</script>

<style>
.html-content h2 {
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: underline;
}

.html-content h3 {
  font-size: 1.1rem;
  font-weight: bold;
}

.html-content p {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.html-content a {
  color: -webkit-link;
  text-decoration: underline;
}

.html-content pre {
  background-color: lightgray;
}

.html-content img {
  margin: 1.5rem 0;
}
</style>
