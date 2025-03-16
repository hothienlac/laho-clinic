export function throwNever(): never {
  throw new Error('This should never be reached');
}
