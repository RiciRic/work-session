export default function createUniqueId() {
  const date = new Date();
  return "" + date.getTime();
}
