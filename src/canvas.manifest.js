export const manifest = {
  screens: {
    scr_kdfbgk: { name: "Dashboard", route: "/", position: { "x": 160, "y": 220 } },
    scr_6zq28o: { name: "Growth Center", route: "/growth", position: { "x": 160, "y": 6160 } },
    scr_gytqye: { name: "Customers", route: "/customers", position: { "x": 160, "y": 8140 } },
    scr_0jtte9: { name: "Website Builder", route: "/website", position: { "x": 160, "y": 2200 } },
    scr_poy1df: { name: "QR Menus", route: "/qr", position: { "x": 1560, "y": 8140 } },
    scr_gd53g4: { name: "WhatsApp Catalog", route: "/whatsapp", position: { "x": 2960, "y": 8140 } },
    scr_0wy94r: { name: "Poster Generator", route: "/posters", position: { "x": 1560, "y": 2200 } },
    scr_26aqu0: { name: "Video Generator", route: "/videos", position: { "x": 2960, "y": 2200 } },
    scr_nn3hm1: { name: "Social Scheduler", route: "/social", position: { "x": 1560, "y": 4180 } },
    scr_uta940: { name: "Campaigns", route: "/campaigns", position: { "x": 160, "y": 4180 } },
    scr_vmxkg9: { name: "Analytics", route: "/analytics", position: { "x": 1560, "y": 6160 } },
    scr_hnvgli: { name: "Settings", route: "/settings", position: { "x": 1560, "y": 220 } },
    scr_dmprfx: { name: "Billing", route: "/billing", position: { "x": 160, "y": 10120 } },
    scr_mf7wxe: { name: "Integrations", route: "/integrations", position: { "x": 1560, "y": 10120 } }
  },
  sections: {
    sec_3ufs4z: { name: "Main Navigation", x: 0, y: 0, width: 4320, height: 1180 },
    sec_tzmafa: { name: "Content Creation", x: 0, y: 1980, width: 4320, height: 1180 },
    sec_o5l43q: { name: "Marketing & Campaigns", x: 0, y: 3960, width: 2920, height: 1180 },
    sec_9344yb: { name: "Growth & Analytics", x: 0, y: 5940, width: 2920, height: 1180 },
    sec_qts0l6: { name: "Sales Tools", x: 0, y: 7920, width: 4320, height: 1180 },
    sec_we2cgc: { name: "Account & Configuration", x: 0, y: 9900, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_3ufs4z", children: [
    { kind: "screen", id: "scr_kdfbgk" },
    { kind: "screen", id: "scr_hnvgli" }]
  },
  { kind: "section", id: "sec_tzmafa", children: [
    { kind: "screen", id: "scr_0jtte9" },
    { kind: "screen", id: "scr_0wy94r" },
    { kind: "screen", id: "scr_26aqu0" }]
  },
  { kind: "section", id: "sec_o5l43q", children: [
    { kind: "screen", id: "scr_uta940" },
    { kind: "screen", id: "scr_nn3hm1" }]
  },
  { kind: "section", id: "sec_9344yb", children: [
    { kind: "screen", id: "scr_6zq28o" },
    { kind: "screen", id: "scr_vmxkg9" }]
  },
  { kind: "section", id: "sec_qts0l6", children: [
    { kind: "screen", id: "scr_gytqye" },
    { kind: "screen", id: "scr_poy1df" },
    { kind: "screen", id: "scr_gd53g4" }]
  },
  { kind: "section", id: "sec_we2cgc", children: [
    { kind: "screen", id: "scr_dmprfx" },
    { kind: "screen", id: "scr_mf7wxe" }]
  }]

};