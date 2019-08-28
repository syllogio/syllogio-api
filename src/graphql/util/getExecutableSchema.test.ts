import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';
import getExecutableSchema from './getExecutableSchema';

jest.mock('graphql-tools');

(makeExecutableSchema as jest.Mock<any>).mockResolvedValue({ the: 'schema' });

describe('getExecutableSchema', () => {
  it('retuns an executable schema', async () => {
    expect.assertions(2);
    await expect(getExecutableSchema()).resolves.toMatchSnapshot();
    expect(makeExecutableSchema).toHaveBeenCalledWith({
      resolvers,
      typeDefs,
    });
  });
});
