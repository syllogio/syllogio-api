import {
  IProposition,
  setSupports as _setSupports,
} from '../../lib/proposition';

/**
 * GraphQL resolver that allows for supports to be mutated.
 */
export default async function setSupports(
  _: any,
  {
    propositionId,
    supports,
  }: {
    propositionId: number;
    supports: number[];
  }
): Promise<boolean> {
  await _setSupports(propositionId, supports);
  return true;
}
