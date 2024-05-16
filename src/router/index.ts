import { useUserStore } from '@/store/user';
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(),
});
router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const userStore = useUserStore();

    const user = userStore.currentUser ? userStore.currentUser : await userStore.fetchUser();
    if (!user) {
      return next({ force: true, replace: true, name: 'signin' });
    }
  }
  return next();
});

export default router;
