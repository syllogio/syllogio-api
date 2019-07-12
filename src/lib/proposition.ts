import { getTraversal } from './util';
import gremlin from 'gremlin';

type NewProposition = {
  text: string,
  supports: Array<number>,
  supportedBy: Array<number>,
}
export type Proposition = {
  id: number,
  text: string,
  supports: Array<number>,
  supportedBy: Array<number>,
};

const __ = gremlin.process.statics;

export async function createProposition(input: NewProposition): Promise<Proposition> {
  let g = getTraversal();
  g = g.addV('proposition').as('prop').property('text', input.text);


  if (input.supports.length) {
    g = g.V(...input.supports).as('s').addE('supports').from_('prop').to('s');
  }
  if (input.supportedBy.length) {
    g = g.V(...input.supportedBy).as('sb').addE('supports').from_('sb').to('prop');
  }

  return (await g
    .select('prop')
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(__.out('supports').id().fold())
    .by(__.in_('supports').id().fold())
    .next()).value;
}

export async function deleteProposition(id: NewProposition): Promise<void> {
  await getTraversal().V(id).drop().next();
}

export async function getProposition(id: string): Promise<Proposition> {
  return (await getTraversal()
    .V(id)
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(__.out('supports').id().fold())
    .by(__.in_('supports').id().fold())
    .next()).value;
}

export async function listPropositions(): Promise<Array<Proposition>> {
  return (await getTraversal()
    .V()
    .hasLabel('proposition')
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(__.out('supports').id().fold())
    .by(__.in_('supports').id().fold())
    .next()).value;
}
