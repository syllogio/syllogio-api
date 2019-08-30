import {
  getProposition as _getProposition,
  IProposition,
} from '../../lib/proposition';
import getProposition from './getProposition';
jest.mock('../../lib/proposition', () => ({
  getProposition: jest.fn(),
}));

(_getProposition as jest.Mock<any>).mockImplementation(
  async (id: number): Promise<IProposition | void> => ({
    id,
    supportedBy: [],
    supports: [],
    text: 'All men are mortal',
  })
);

describe('proposition', () => {
  it('gets a proposition by an id in arguments', async () => {
    expect.assertions(2);
    await expect(getProposition({}, { id: 1 })).resolves.toEqual({
      id: 1,
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    expect(_getProposition).toHaveBeenCalledWith(1);
  });
});
