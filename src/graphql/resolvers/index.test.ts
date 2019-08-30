import resolvers from './index';

describe('resolvers', () => {
  it('exposes the correct resolvers', () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Mutation": Object {
          "createProposition": [Function],
        },
        "Proposition": Object {
          "supportedBy": [Function],
          "supports": [Function],
        },
        "Query": Object {
          "proposition": [Function],
        },
      }
    `);
  });
});
