import typeDefs from './index';

describe('typeDefs', () => {
  it('exports the GraphQL schema', () => {
    expect.assertions(1);
    expect(typeDefs).toMatchSnapshot();
  });
});
