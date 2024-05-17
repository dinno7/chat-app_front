import { useAuthToken } from '@/composables/useAuthToken';
import { useUserStore } from '@/store/user';
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(),
});
router.beforeEach(async (to, from, next) => {
  //? Check authorization for auth pages
  if (to.meta?.auth) {
    const notAuthRoute = { name: 'signin', replace: true, force: true };
    const { accessToken } = useAuthToken();
    if (!accessToken) return next(notAuthRoute);

    const userStore = useUserStore();
    const user = userStore.currentUser ? userStore.currentUser : await userStore.fetchUser();
    if (!user) {
      return next(notAuthRoute);
    }
  }
  //? Check if user authorized do not let it see sign(in/up) pages
  if (to.meta?.justNotAuthUsers) {
    const userStore = useUserStore();
    const user = userStore.currentUser ? userStore.currentUser : await userStore.fetchUser();
    if (user) return next({ name: 'home', replace: true, force: true });
  }
  return next();
});

export default router;
