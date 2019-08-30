import {
  createProposition as _createProposition,
  INewProposition,
  IProposition,
} from '../../lib/proposition';
import createProposition from './createProposition';
jest.mock('../../lib/proposition', () => ({
  createProposition: jest.fn(),
}));

(_createProposition as jest.Mock<any>).mockImplementation(
  async (newProp: INewProposition): Promise<IProposition> => ({
    ...newProp,
    id: 0,
  })
);

describe('createProposition', () => {
  it('creates a proposition', async () => {
    expect.assertions(2);
    await expect(
      createProposition({}, { text: 'All men are mortal' })
    ).resolves.toEqual({
      id: 0,
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    expect(_createProposition).toHaveBeenCalledWith({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
  });
});
