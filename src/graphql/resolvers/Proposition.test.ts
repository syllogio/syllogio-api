import { getProposition } from '../../lib/proposition';
import Proposition from './Proposition';

jest.mock('../../lib/proposition', () => ({
  getProposition: jest.fn(),
}));

(getProposition as jest.Mock<any>).mockImplementation(async id => ({
  id,
  supportedBy: [],
  supports: [],
  text: 'I am a proposition',
}));

const { supportedBy, supports } = Proposition;

describe('Proposition', () => {
  describe('supportedBy', () => {
    it('returns a proposition for every id in the supportedBy property', async () => {
      expect.assertions(2);
      const [prop1, prop2] = supportedBy({
        id: 0,
        supportedBy: [1, 2],
        supports: [],
        text: 'Supported proposition',
      });
      await expect(prop1).resolves.toEqual({
        id: 1,
        supportedBy: [],
        supports: [],
        text: 'I am a proposition',
      });
      await expect(prop2).resolves.toEqual({
        id: 2,
        supportedBy: [],
        supports: [],
        text: 'I am a proposition',
      });
    });
  });

  describe('supports', () => {
    it('returns a proposition for every id in the supports property', async () => {
      expect.assertions(2);
      const [prop1, prop2] = supports({
        id: 0,
        supportedBy: [],
        supports: [1, 2],
        text: 'Supported proposition',
      });
      await expect(prop1).resolves.toEqual({
        id: 1,
        supportedBy: [],
        supports: [],
        text: 'I am a proposition',
      });
      await expect(prop2).resolves.toEqual({
        id: 2,
        supportedBy: [],
        supports: [],
        text: 'I am a proposition',
      });
    });
  });
});
