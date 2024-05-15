export function generateRandUnique(len: number = 7): string {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
}
