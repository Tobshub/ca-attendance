interface Ok<V> {
  readonly ok: true;
  readonly value: V;
}

export const Ok = <const V>(value: V): Ok<V> => ({ ok: true, value } as const);

interface Err<M, C> {
  readonly ok: false;
  readonly message: M;
  readonly cause?: C;
}

export const Err = <const M, const C = unknown>(
  message: M,
  cause?: C
): Err<M, C> => ({ ok: false, message, cause } as const);
