import * as router from "vue-router";
import Index from "./pages/index.vue";

export function createRouter(): router.Router {
  const r = router.createRouter({
    history: router.createWebHistory(),
    routes: [
      {
        path: "/",
        component: Index,
      },
    ],
  });

  return r;
}
