import z from "zod";

export const SettingsTypeSchema = z.object({
  sessionStartHideToTray: z.boolean(),
  forceUnlock: z.boolean(),
});

export type SettingsType = z.infer<typeof SettingsTypeSchema>;
