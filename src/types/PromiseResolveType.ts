export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never
