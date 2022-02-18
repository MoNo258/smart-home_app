/**
 * Splitting given array into groups; sized based on provided parameter
 * @param arr: array to be splitted into chunks
 * @param size: number of items in chunk; last one might be smaller
 * @returns new array of chunks
 */
export function splitArrayInGroups<T>(arr: T[], size: number): T[][] {
  const tempArray = [...arr];
  const result = [];
  for (let i = 0; i < tempArray.length; i += size) {
    result.push(tempArray.slice(i, i + size));
  }
  return result;
}
