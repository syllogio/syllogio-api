import {
  IProposition,
  listPropositions as _listPropositions,
} from '../../lib/proposition';
import listPropositions from './listPropositions';

jest.mock('../../lib/proposition', () => ({
  listPropositions: jest.fn(),
}));

const propositions = [
  {
    id: 0,
    supportedBy: [1, 2],
    supports: [],
    text: 'Greeks are mortal',
  },
  {
    id: 1,
    supportedBy: [],
    supports: [0],
    text: 'All men are mortal',
  },
  {
    id: 2,
    supportedBy: [],
    supports: [0],
    text: 'Greeks are men',
  },
];

(_listPropositions as jest.Mock<any>).mockImplementation(
  async (): Promise<IProposition[]> => propositions
);

describe('Propositions', () => {
  it('returns an array of propositions', async () => {
    await expect(listPropositions()).resolves.toEqual(propositions);
  });
});
