import {
  createProposition as _createProposition,
  INewProposition,
  IProposition,
} from '../../lib/proposition';

const DEFAULT_PROPS = {
  supportedBy: [],
  supports: [],
};

/**
 * GraphQL resolver for the createProposition mutation.
 */
export default async function createProposition(
  _: any,
  args: { text: string; supports?: number[]; supportedBy?: number[] }
): Promise<IProposition> {
  return _createProposition({ ...DEFAULT_PROPS, ...args });
}
