import resolvers from './index';

describe('resolvers', () => {
  it('exposes the correct resolvers', () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Mutation": Object {
          "createProposition": [Function],
        },
        "Query": Object {
          "proposition": [Function],
        },
      }
    `);
  });
});
