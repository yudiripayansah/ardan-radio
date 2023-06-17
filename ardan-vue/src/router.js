import Vue from "vue";
import Router from "vue-router";
import AuthRequired from "./core/auth/AuthRequired";
import menu from "./core/config/menu";

const appRouter = (menu) => {
  let routes = [];
  menu.forEach((item) => {
    let theRoute = {
      path: item.target,
      name: item.label,
      component: () => item.component,
    }
    if (item.children) {
      theRoute.children = appRouter(item.children);
    }
    routes.push(theRoute);
  });
  return routes;
}
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      beforeEnter: AuthRequired,
      component: () => import("@/layout/Layout"),
      children: [
        ...appRouter(menu),
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/Login")
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/pages/error/Error-6.vue")
    }
  ]
});
