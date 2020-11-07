<template>
  <article class="divide-y">
    <header>
      <h1 class="text-xl">{{ title }}</h1>
      <small>published at {{ publishedAt }}</small>
    </header>
    <div id="post-content" class="mt-4" v-html="body"></div>
    <ol class="py-4" v-if="footNotes">
      <li
        v-for="fn in footNotes"
        :key="fn.index"
        :id="`fn${fn.index}`"
        class="list-decimal text-sm ml-6"
      >
        {{ fn.content }}
        <a class="text-indigo-500" :href="`#fnref${fn.index}`">&#x21A9;</a>
      </li>
    </ol>
    <footer class="py-4">
      <div class="flex w-2/3">
        <img :src="authorImg" :alt="authorName" class="w-20 h-20 mr-4" />
        <div>
          <div class="font-bold">{{ authorName }}</div>
          <div class="text-sm">{{ authorDesc }}</div>
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
    const body = post.body.replace(/\[\^(\d)+\]/g, (_, n) => {
      const title = post.footNotes?.[Number(n)]?.content || "";
      return `<sup id="fnref${n}"><a href="#fn${n}" title="${title}">${n}</a></sup>`;
    });
    return {
      title: post.title,
      publishedAt: post.publishedAt.toLocaleDateString(),
      body,
      footNotes: post.footNotes,
      authorImg: post.author.picture,
      authorName: post.author.name,
      authorDesc: post.author.description,
    };
  },
});
</script>

<style>
#post-content h2 {
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: underline;
}

#post-content h3 {
  font-size: 1.25rem;
  font-weight: bold;
}

#post-content h4 {
  font-size: 1.1rem;
  font-weight: bold;
}

#post-content p {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

#post-content a {
  color: -webkit-link;
  text-decoration: underline;
}

#post-content pre {
  background-color: lightgray;
}

#post-content img {
  margin: 1.5rem 0;
}
</style>
