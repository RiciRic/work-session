import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");

export async function get(key: string){
  return await store.get(key);
}

export async function set(key: string, value: any){
  await store.set(key, value);
}

export async function save(){
  await store.save();
}

