export async function fetchHealth() {
  const res = await fetch("/health");
  return res.json();
}
