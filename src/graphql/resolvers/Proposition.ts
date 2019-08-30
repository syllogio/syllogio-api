import { map } from 'ramda';
import { getProposition, IProposition } from '../../lib/proposition';

function supports(proposition: IProposition) {
  return map(getProposition, proposition.supports);
}

function supportedBy(proposition: IProposition) {
  return map(getProposition, proposition.supportedBy);
}

export default {
  supportedBy,
  supports,
};
