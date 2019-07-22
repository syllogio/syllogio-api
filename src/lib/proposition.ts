import gremlin from 'gremlin';
import { getTraversal } from './util';

interface INewProposition {
  text: string;
  supports: number[];
  supportedBy: number[];
}
export interface IProposition {
  id: number;
  text: string;
  supports: number[];
  supportedBy: number[];
}

const __ = gremlin.process.statics;

export async function createProposition(
  input: INewProposition
): Promise<IProposition> {
  const g = addSupportedBy(
    input,
    addSupports(
      input,
      getTraversal()
        .addV('proposition')
        .as('prop')
        .property('text', input.text)
    )
  );

  return (await g
    .select('prop')
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(
      __.out('supports')
        .id()
        .fold()
    )
    .by(
      __.in_('supports')
        .id()
        .fold()
    )
    .next()).value;
}

function addSupports(
  input: INewProposition,
  g: gremlin.process.GraphTraversal
): gremlin.process.GraphTraversal {
  if (input.supports.length) {
    return g
      .V(...input.supports)
      .as('s')
      .addE('supports')
      .from_('prop')
      .to('s');
  }
  return g;
}

function addSupportedBy(
  input: INewProposition,
  g: gremlin.process.GraphTraversal
): gremlin.process.GraphTraversal {
  if (input.supportedBy.length) {
    return g
      .V(...input.supportedBy)
      .as('sb')
      .addE('supports')
      .from_('sb')
      .to('prop');
  }
  return g;
}

export async function deleteProposition(id: INewProposition): Promise<void> {
  await getTraversal()
    .V(id)
    .drop()
    .next();
}

export async function getProposition(id: string): Promise<IProposition> {
  return (await getTraversal()
    .V(id)
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(
      __.out('supports')
        .id()
        .fold()
    )
    .by(
      __.in_('supports')
        .id()
        .fold()
    )
    .next()).value;
}

export async function listPropositions(): Promise<IProposition[]> {
  return (await getTraversal()
    .V()
    .hasLabel('proposition')
    .project('id', 'text', 'supports', 'supportedBy')
    .by(__.id())
    .by(__.values('text'))
    .by(
      __.out('supports')
        .id()
        .fold()
    )
    .by(
      __.in_('supports')
        .id()
        .fold()
    )
    .next()).value;
}
