import z from "zod";

export const SessionTypeSchema = z.object({
  id: z.string(),
  date: z.string(),
  project: z.string(),
  description: z.string(),
  start: z.number(),
  end: z.number(),
  color: z.string(),
});

export type SessionType = z.infer<typeof SessionTypeSchema>;

export const SessionArrayTypeSchema = z.array(SessionTypeSchema).default([]);

export type SessionArrayType = z.infer<typeof SessionArrayTypeSchema>;

export const DataTypeSchema = z.object({
  monday: SessionArrayTypeSchema,
  tuesday: SessionArrayTypeSchema,
  wednesday: SessionArrayTypeSchema,
  thursday: SessionArrayTypeSchema,
  friday: SessionArrayTypeSchema,
  saturday: SessionArrayTypeSchema,
  sunday: SessionArrayTypeSchema,
});

export type DataType = z.infer<typeof DataTypeSchema>;
