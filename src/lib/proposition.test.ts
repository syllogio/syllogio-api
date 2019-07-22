import {
  createProposition,
  deleteProposition,
  getProposition,
  listPropositions,
} from './proposition';

describe('createProposition', () => {
  it('creates a proposition', async () => {
    expect.assertions(1);
    await expect(
      createProposition({
        supportedBy: [],
        supports: [],
        text: 'All men are mortal',
      })
    ).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        supportedBy: [],
        supports: [],
        text: 'All men are mortal',
      })
    );
  });

  it.todo('creates a proposition supported by an existing proposition');
  it.todo('creates a proposition which supports an existing proposition');
});

describe('deleteProposition', () => {
  it.todo('deletes an existing proposition');
});
describe('getProposition', () => {
  it.todo('retrieves an existing proposition');
});
describe('listPropositions', () => {
  it.todo('lists existing propositions');
});
