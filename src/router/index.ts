import { useUser } from '@/composables/useUser';
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(),
});
router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const { currentUser, fetchUser } = useUser();
    const user = currentUser.value ? currentUser.value : await fetchUser();
    if (!user) return next({ force: true, replace: true, name: 'signin' });
  }
  return next();
});

export default router;
