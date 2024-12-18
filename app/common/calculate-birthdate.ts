export default function calculateBirthdate(birthDate: string): number {
  const today = new Date();
  const newBirthDate = new Date(birthDate);

  let age = today.getFullYear() - newBirthDate.getFullYear();

  return age + 1;
}
