export const backgroundJobRegistry: Record<
  string,
  (input: Record<string, unknown>) => Promise<void>
> = {};
