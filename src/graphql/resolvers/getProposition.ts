import {
  getProposition as _getProposition,
  IProposition,
} from '../../lib/proposition';

/**
 * GraphQL resolver for the proposition field.
 */
export default async function getProposition(
  _: any,
  { id }: { id: number }
): Promise<IProposition | void> {
  return _getProposition(id);
}
