import "../../VueGlobalConfig";

import { mount } from "@vue/test-utils";
import Cookies from "js-cookie";

import XHeader from "@/components/common/XHeader.vue";
import AdminLayout from "@/layouts/Admin.vue";

const getJSONMock = jest.fn();
Cookies.getJSON = getJSONMock;

describe("XHeader.vue", () => {
  getJSONMock.mockReturnValueOnce({
    id: 1,
    name: "test user",
    role: ["manager", "nonfunder"]
  });

  it("load header", async () => {
    const layout = mount(AdminLayout);
    const header = layout.getComponent(XHeader);
    expect(header.html()).toContain("Manager Portal");

    const nameText = header.find("[data-liberty-id='topNavUserButton']");
    expect(nameText.exists()).toBe(true);

    const libertyLink = header.find("[data-liberty-id='topNavLibertyLink']");
    expect(libertyLink.exists()).toBe(true);

    const topNavMenu = header.find("[data-liberty-id='topNavMenu']");
    expect(topNavMenu.exists()).toBe(true);
    await topNavMenu.trigger("click");
    expect(header.emitted()).toHaveProperty("toggle-drawer");
    expect(header.emitted()["toggle-drawer"]).toHaveLength(1);
  });
});
