export default function calculateBirthdate(
  birthDate: string | undefined
): number {
  const today = new Date();
  const newBirthDate = new Date(
    `${birthDate!.slice(0, 4)}-${birthDate!.slice(4, 6)}-${birthDate!.slice(6)}`
  );

  let age = today.getFullYear() - newBirthDate.getFullYear();

  return age + 1;
}
