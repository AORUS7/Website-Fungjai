import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Podcast from "./views/Podcast.vue";

import SafeSpace from "./views/SafeSpace.vue";

import Inside from "./views/Inside.vue";
import InsideQuestion from "./views/InsideQuestion.vue";
import InsideResult from "./views/InsideResult.vue";

import InsideArticles from "./views/InsideArticles.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/podcast", component: Podcast },


  { path: "/safe-space", component: SafeSpace },

  { path: "/inside", component: Inside },
  {
    path: "/inside-question",
    name: "InsideQuestion",
    component: () => import("./views/InsideQuestion.vue"),
  },
  {
    path: "/inside-result",
    name: "InsideResult",
    component: () => import("./views/InsideResult.vue"),
  },
  {
    path: "/inside/articles",
    name: "inside-articles",
    component: InsideArticles,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
