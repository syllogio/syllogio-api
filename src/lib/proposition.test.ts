import {
  createProposition,
  deleteProposition,
  getProposition,
  listPropositions,
  setSupportedBy,
  setSupports,
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

  it('creates a proposition supported by existing propositions', async () => {
    expect.assertions(1);
    const firstProp = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    const secondProp = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'Greeks are men',
    });
    await expect(
      createProposition({
        supportedBy: [firstProp.id, secondProp.id],
        supports: [],
        text: 'Greeks are mortal',
      })
    ).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        supportedBy: [firstProp.id, secondProp.id],
        supports: [],
        text: 'Greeks are mortal',
      })
    );
  });
  it('creates a proposition which supports an existing proposition', async () => {
    expect.assertions(1);
    const supportedProp = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'Greeks are mortal',
    });
    const firstProp = await createProposition({
      supportedBy: [],
      supports: [supportedProp.id],
      text: 'All men are mortal',
    });
    const secondProp = await createProposition({
      supportedBy: [],
      supports: [supportedProp.id],
      text: 'Greeks are men',
    });
    await expect(getProposition(supportedProp.id)).resolves.toEqual(
      expect.objectContaining({
        supportedBy: expect.arrayContaining([firstProp.id, secondProp.id]),
      })
    );
  });
});

describe('deleteProposition', () => {
  it('deletes an existing proposition', async () => {
    expect.assertions(1);
    const mistakenProp = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'Greekz are Mertle',
    });
    await deleteProposition(mistakenProp.id);
    await expect(getProposition(mistakenProp.id)).resolves.toBeUndefined();
  });
});
describe('getProposition', () => {
  it('retrieves an existing proposition', async () => {
    expect.assertions(1);
    const prop = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    await expect(getProposition(prop.id)).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        supportedBy: [],
        supports: [],
        text: 'All men are mortal',
      })
    );
  });
});
describe('listPropositions', () => {
  it('lists all existing propositions', async () => {
    expect.assertions(1);
    const prop1 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    const prop2 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'Greeks are men',
    });
    const prop3 = await createProposition({
      supportedBy: [prop1.id, prop2.id],
      supports: [],
      text: 'Greeks are mortal',
    });

    await expect(listPropositions()).resolves.toEqual(
      expect.arrayContaining([
        { ...prop1, supports: [prop3.id] },
        { ...prop2, supports: [prop3.id] },
        prop3,
      ])
    );
  });
});
describe('setSupportedBy', () => {
  it('creates a supportedBy edge', async () => {
    expect.assertions(2);
    const prop1 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All greeks are mortal',
    });
    const prop2 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });

    await setSupportedBy(prop1.id, [prop2.id]);
    await expect(getProposition(prop1.id)).resolves.toEqual(
      expect.objectContaining({
        supportedBy: [prop2.id],
      })
    );
    await expect(getProposition(prop2.id)).resolves.toEqual(
      expect.objectContaining({
        supports: [prop1.id],
      })
    );
  });
});
describe('setSupports', () => {
  it('creates a supports edge', async () => {
    expect.assertions(2);
    const prop1 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All men are mortal',
    });
    const prop2 = await createProposition({
      supportedBy: [],
      supports: [],
      text: 'All greeks are mortal',
    });

    await setSupports(prop1.id, [prop2.id]);
    await expect(getProposition(prop1.id)).resolves.toEqual(
      expect.objectContaining({
        supports: [prop2.id],
      })
    );
    await expect(getProposition(prop2.id)).resolves.toEqual(
      expect.objectContaining({
        supportedBy: [prop1.id],
      })
    );
  });
});
