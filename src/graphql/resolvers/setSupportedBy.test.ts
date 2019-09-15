import { setSupportedBy as _setSupportedBy } from '../../lib/proposition';
import setSupportedBy from './setSupportedBy';
jest.mock('../../lib/proposition', () => ({
  setSupportedBy: jest.fn(),
}));

(_setSupportedBy as jest.Mock<any>).mockImplementation(
  async (proposition: number, supportedBy: number[]): Promise<undefined> =>
    undefined
);

describe('setSupportedBy', () => {
  it('creates a supportedBy edge', async () => {
    expect.assertions(2);
    await expect(
      setSupportedBy({}, { propositionId: 1, supportedBy: [2] })
    ).resolves.toEqual(true);
    expect(_setSupportedBy).toHaveBeenCalledWith(1, [2]);
  });
});
