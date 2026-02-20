import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "./views/Home.vue";
import Podcast from "./views/Podcast.vue";
import SafeSpace from "./views/SafeSpace.vue";
import Inside from "./views/Inside.vue";
import InsideQuestion from "./views/InsideQuestion.vue";
import InsideResult from "./views/InsideResult.vue";
import InsideArticles from "./views/InsideArticles.vue";
import Login from "./views/Login.vue";

const SESSION_TIMEOUT = 30 * 60 * 1000;
const auth = getAuth();

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
    );
  });
}

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true },
  },

  {
    path: "/login",
    component: Login,
  },

  {
    path: "/safe-space",
    component: SafeSpace,
    meta: { requiresAuth: true },
  },
  {
    path: "/podcast",
    component: Podcast,
    meta: { requiresAuth: true },
  },
  {
    path: "/inside",
    component: Inside,
    meta: { requiresAuth: true },
  },
  {
    path: "/inside-question",
    component: InsideQuestion,
    meta: { requiresAuth: true },
  },
  {
    path: "/inside-result",
    name: "InsideResult",
    component: InsideResult,
    meta: { requiresAuth: true },
  },
  {
    path: "/inside/articles",
    component: InsideArticles,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Guard 
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (user) {
    const loginTime = localStorage.getItem("loginTime");

    if (loginTime) {
      const now = Date.now();
      const diff = now - Number(loginTime);

      if (diff > SESSION_TIMEOUT) {
        await auth.signOut();
        localStorage.removeItem("loginTime");
        return next("/login");
      }
    }
  }

  if (to.meta.requiresAuth && !user) {
    return next("/login");
  }

  if (to.path === "/login" && user) {
    return next("/");
  }

  next();
});

export default router;
