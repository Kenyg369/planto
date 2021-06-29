import { RouteRecordRaw, RouteComponent } from "vue-router";
import { RouterLayout } from "./RouterLayout";

export const AdminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    component: RouterLayout,
    children: [
      {
        path: "devices",
        alias: "",
        name: "admin-devices",
        component: (): Promise<RouteComponent> => import("@/views/admin/Devices.vue")
      },
      {
        path: "devices/:id",
        name: "admin-device",
        props: true,
        component: (): Promise<RouteComponent> => import("@/views/admin/Device.vue")
      },
    ]
  },
];
