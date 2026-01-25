import { type Bookmark, type UUID } from "@/types";

export const defaultBookmarks = new Map<UUID, Bookmark>()
  .set("9929ec00-a502-4280-8e94-0149ec4f7896", {
    icon: {
      type: "favicon",
    },
    id: "9929ec00-a502-4280-8e94-0149ec4f7896",
    title: "Google",
    url: "https://google.com",
  })
  .set("b1a2c3d4-e5f6-7890-abcd-ef1234567890", {
    icon: {
      type: "favicon",
    },
    id: "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "GitHub",
    url: "https://github.com",
  })
  .set("df3e069d-b7a1-441b-bba2-6d79e226a8fd", {
    icon: {
      type: "favicon",
    },
    id: "df3e069d-b7a1-441b-bba2-6d79e226a8fd",
    title: "DeepL",
    url: "https://deepl.com",
  });
