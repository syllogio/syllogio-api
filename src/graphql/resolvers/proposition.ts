import { getProposition, IProposition } from '../../lib/proposition';

/**
 * GraphQL resolver for the proposition field.
 */
export default async function proposition(
  _: any,
  { id }: { id: number }
): Promise<IProposition | void> {
  return getProposition(id);
}
