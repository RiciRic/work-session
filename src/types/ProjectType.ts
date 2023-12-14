import z from "zod";

/*type ProjectType = {
  id: string;
  name: string;
  color: string;
};*/

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

type ProjectType = z.infer<typeof ProjectSchema>;

export const ProjectArraySchema = z.array(ProjectSchema).default([]);

export type ProjectArrayType = z.infer<typeof ProjectArraySchema>;

export default ProjectType;
