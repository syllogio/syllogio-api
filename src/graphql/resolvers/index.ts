import createProposition from './createProposition';
import proposition from './getProposition';
import Proposition from './Proposition';
import setSupportedBy from './setSupportedBy';
import setSupports from './setSupports';

export default {
  Mutation: {
    createProposition,
    setSupportedBy,
    setSupports,
  },
  Proposition,
  Query: {
    proposition,
  },
};
