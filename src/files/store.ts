import { Store } from "tauri-plugin-store-api";
import ProjectType, { ProjectArrayType, ProjectArraySchema } from "../types/ProjectType";

const store = new Store(".settings.dat");

export async function get(key: string) {
  return await store.get(key);
}

export async function set(key: string, value: any) {
  await store.set(key, value);
}

export async function save() {
  await store.save();
}

export async function loadProjects() {
  try {
    let projects: ProjectArrayType = ProjectArraySchema.parse(
      await store.get("projects")
    );
    console.log(projects);
    return projects;
  } catch (error) {
    let projects: ProjectArrayType = [];
    return projects
  }
}

export async function saveProjects( projects: ProjectArrayType) {
  await store.set("projects", projects);
  await store.save();
}
