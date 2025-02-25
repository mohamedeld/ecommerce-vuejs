import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useCookies } from '@vueuse/integrations/useCookies'

export default function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const cookies = useCookies();
  const token = cookies.get("access_token");

  if (!token && to.path !== "/login") {
    next("/login"); // Redirect to login if no token
  } else if (token && to.path === "/login") {
    next("/"); // Redirect to home if already logged in
  } else {
    next();
  }
}
