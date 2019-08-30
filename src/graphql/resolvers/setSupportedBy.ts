import {
  IProposition,
  setSupportedBy as _setSupportedBy,
} from '../../lib/proposition';

/**
 * GraphQL resolver that allows for supportedBys to be mutated.
 */
export default async function setSupportedBy(
  _: any,
  {
    propositionId,
    supportedBy,
  }: {
    propositionId: number;
    supportedBy: number[];
  }
): Promise<boolean> {
  await _setSupportedBy(propositionId, supportedBy);
  return true;
}
