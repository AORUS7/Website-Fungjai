import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Podcast from "./views/Podcast.vue";
import PodcastRelationship from "./views/PodcastRelationship.vue";
import PodcastStudy from "./views/PodcastStudy.vue";
import PodcastHealth from "./views/PodcastHealth.vue";
import PodcastContent from "./views/PodcastContent.vue";

import SafeSpace from "./views/SafeSpace.vue";

import Inside from "./views/Inside.vue";
import InsideQuestion from "./views/InsideQuestion.vue";
import InsideResult from "./views/InsideResult.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/podcast", component: Podcast },
  { path: "/podcast/relationship", component: PodcastRelationship },
  { path: "/podcast/study", component: PodcastStudy },
  { path: "/podcast/health", component: PodcastHealth },
  { path: "/podcast/content", component: PodcastContent },

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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
