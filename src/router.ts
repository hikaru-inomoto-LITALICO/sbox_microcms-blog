import * as router from "vue-router";
import Index from "./pages/index.vue";
import PostIndex from "./pages/posts/index.vue";
import PostShow from "./pages/posts/show.vue";

export function createRouter(): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory(),
    routes: [
      {
        path: "/",
        component: Index,
      },
      {
        path: "/posts/",
        component: PostIndex,
      },
      {
        path: "/posts/:id",
        component: PostShow,
      },
    ],
  });

  return r;
}
