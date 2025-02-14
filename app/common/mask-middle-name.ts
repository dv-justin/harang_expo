export default function maskMiddleName(name: string) {
  if (!name || name.length < 2) return name;

  const firstChar = name[0];
  const lastChar = name[name.length - 1];

  return name.length === 2
    ? firstChar + " *"
    : firstChar + " " + "* ".repeat(name.length - 2) + lastChar;
}
