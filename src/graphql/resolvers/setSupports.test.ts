import { setSupports as _setSupports } from '../../lib/proposition';
import setSupports from './setSupports';
jest.mock('../../lib/proposition', () => ({
  setSupports: jest.fn(),
}));

(_setSupports as jest.Mock<any>).mockImplementation(
  async (proposition: number, supports: number[]): Promise<undefined> =>
    undefined
);

describe('setSupports', () => {
  it('creates a supports edge', async () => {
    expect.assertions(2);
    await expect(
      setSupports({}, { propositionId: 1, supports: [2] })
    ).resolves.toEqual(true);
    expect(_setSupports).toHaveBeenCalledWith(1, [2]);
  });
});
