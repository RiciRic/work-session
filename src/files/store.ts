import { Store } from "tauri-plugin-store-api";
import { ProjectArrayType, ProjectArraySchema } from "../types/ProjectType";
import { SessionArrayType, SessionArrayTypeSchema } from "../types/SessionType";
import { SettingsType, SettingsTypeSchema } from "../types/SettingsType";

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

export const defaultSettings: SettingsType = {
  sessionStartHideToTray: true,
  forceUnlock: false,
};

export async function loadSettings() {
  try {
    let settings: SettingsType = SettingsTypeSchema.parse(
      await store.get("settings")
    );
    return settings;
  } catch (error) {
    return defaultSettings;
  }
}

export async function saveSettings(settings: SettingsType) {
  await store.set("settings", settings);
  await store.save();
}
