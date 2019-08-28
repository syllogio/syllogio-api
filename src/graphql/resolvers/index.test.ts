import resolvers from './index';

describe('resolvers', () => {
  it('exposes the correct resolvers', () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Query": Object {
          "proposition": [Function],
        },
      }
    `);
  });
});
