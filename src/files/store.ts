import { Store } from "tauri-plugin-store-api";
import { ProjectArrayType, ProjectArraySchema } from "../types/ProjectType";
import { SessionArrayType, SessionArrayTypeSchema } from "../types/SessionType";

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
    return projects;
  }
}

export async function saveProjects(projects: ProjectArrayType) {
  await store.set("projects", projects);
  await store.save();
}

export async function loadData() {
  try {
    let data: SessionArrayType = SessionArrayTypeSchema.parse(
      await store.get("data")
    );
    console.log(data);
    return data;
  } catch (error) {
    let data: SessionArrayType = [];
    return data;
  }
}

export async function saveData(data: SessionArrayType) {
  await store.set("data", data);
  await store.save();
}
