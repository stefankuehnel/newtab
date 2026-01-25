import { z } from "zod";

// UUID

export const UUIDSchema = z.uuid();

export type UUID = z.infer<typeof UUIDSchema>;

// Bookmark

export const BookmarkSchema = z.object({
  icon: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("favicon"),
    }),
    z.object({
      letters: z.string().nonempty("Required").max(2, "Maximum 2 characters"),
      type: z.literal("letters"),
    }),
    z.object({
      type: z.literal("custom"),
      url: z.url("Invalid URL").nonempty("Required"),
    }),
  ]),
  id: z.uuid(),
  title: z.string().nonempty("Required"),
  url: z.url("Invalid URL").nonempty("Required"),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;

// Bookmarks

export const BookmarksSchema = z.map(UUIDSchema, BookmarkSchema);

export type Bookmarks = z.infer<typeof BookmarksSchema>;

// Service

export const ServiceSchema = z.object({
  bang: z.object({
    long: z.string().nonempty("Required").startsWith("!", "Must start with !"),
    short: z.string().nonempty("Required").startsWith("!", "Must start with !"),
  }),
  icon: z.url("Invalid URL").nonempty("Required"),
  name: z.string().nonempty("Required"),
  url: z.url("Invalid URL").nonempty("Required"),
});

export type Service = z.infer<typeof ServiceSchema>;

// Services

export const ServiceCategorySchema = z.enum([
  "Education",
  "Entertainment",
  "News",
  "Search",
  "Shopping",
  "Social Media",
  "Software Development",
  "Tools",
]);

export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

// Services

export const ServicesSchema = z.map(
  ServiceCategorySchema,
  z.array(ServiceSchema),
);

export type Services = z.infer<typeof ServicesSchema>;

// Theme

export const ThemeSchema = z.enum(["dark", "light", "system"]);

export type Theme = z.infer<typeof ThemeSchema>;

// Config

export const ConfigSchema = z.object({
  bookmarks: BookmarksSchema,
  services: ServicesSchema,
  theme: ThemeSchema,
});

export type Config = z.infer<typeof ConfigSchema>;
