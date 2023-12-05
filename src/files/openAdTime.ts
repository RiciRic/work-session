import { open } from '@tauri-apps/api/shell';
export default function openAdTime() {
  open('https://eew.cfapps.eu10.hana.ondemand.com/');
  return true;
} 
