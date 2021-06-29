import "../../VueGlobalConfig";

import { mount } from "@vue/test-utils";

import XDrawer from "@/components/common/XDrawer.vue";
import AdminLayout from "@/layouts/Admin.vue";

describe("XDrawer.vue", () => {
  it("load header", async () => {
    const layout = mount(AdminLayout);
    const drawer = layout.getComponent(XDrawer);

    const drawerItemDeals = drawer.find("[data-liberty-id='drawerItem-deals']");
    expect(drawerItemDeals.exists()).toBe(true);

    const drawerItemAssignments = drawer.find("[data-liberty-id='drawerItem-assignments']");
    expect(drawerItemAssignments.exists()).toBe(true);

    const drawerItemDocuments = drawer.find("[data-liberty-id='drawerItem-documents']");
    expect(drawerItemDocuments.exists()).toBe(true);

    const drawerItemDealsHistory = drawer.find("[data-liberty-id='drawerItem-history']");
    expect(drawerItemDealsHistory.exists()).toBe(true);
  });
});
