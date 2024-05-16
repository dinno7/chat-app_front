import { useAuthToken } from '@/composables/useAuthToken';
import { useUserStore } from '@/store/user';
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(),
});
router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const notAuthRoute = { force: true, replace: true, name: 'signin' };
    const { accessToken } = useAuthToken();
    if (!accessToken) return next(notAuthRoute);
    const userStore = useUserStore();

    const user = userStore.currentUser ? userStore.currentUser : await userStore.fetchUser();
    if (!user) {
      return next(notAuthRoute);
    }
  }
  return next();
});

export default router;
