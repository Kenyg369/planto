import { RouteRecordRaw, RouteComponent } from "vue-router";
import { RouterLayout } from "./RouterLayout";

export const PublicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: RouterLayout,

    // All child components will be applied with corresponding layout component
    children: [
      {
        path: "/",
        name: "home",
        component: (): Promise<RouteComponent> => import("@/views/public/Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: (): Promise<RouteComponent> => import("@/views/public/About.vue"),
      },
      {
        path: "/products",
        name: "products",
        component: (): Promise<RouteComponent> => import("@/views/public/Products.vue"),
      },
      {
        path: "/sign-up",
        name: "signUp",
        component: (): Promise<RouteComponent> => import("@/views/public/SignUp.vue"),
      },
      {
        path: "/sign-in",
        name: "signIn",
        component: (): Promise<RouteComponent> => import("@/views/public/SignIn.vue"),
      },
      {
        path: "/401",
        name: "unauthorized",
        component: (): Promise<RouteComponent> => import("@/views/common/401.vue")
      },
      {
        path: "/403",
        name: "forbidden",
        component: (): Promise<RouteComponent> => import("@/views/common/403.vue")
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: (): Promise<RouteComponent> => import("@/views/common/404.vue")
      },
    ]
  }
];
