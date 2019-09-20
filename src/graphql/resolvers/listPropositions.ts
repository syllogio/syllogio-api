import { IProposition, listPropositions } from '../../lib/proposition';

/**
 * GraphQL resolver for the propositions field.
 */
export default async function propositions(): Promise<IProposition[]> {
  return listPropositions();
}
