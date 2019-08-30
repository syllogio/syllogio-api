import createProposition from './createProposition';
import proposition from './getProposition';
import Proposition from './Proposition';

export default {
  Mutation: {
    createProposition,
  },
  Proposition,
  Query: {
    proposition,
  },
};
