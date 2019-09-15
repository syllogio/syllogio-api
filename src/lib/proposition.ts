import gremlin from 'gremlin';
import { getTraversal } from './util';

export interface INewProposition {
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
type PropKeys = keyof IProposition;

const __ = gremlin.process.statics;

function mapToProposition<T extends IProposition, K extends PropKeys>(
  m: Map<K, T[K]>
): T {
  const res = {} as T;
  for (const pair of [...m]) {
    res[pair[0]] = pair[1];
  }
  return res;
}

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

  return mapToProposition(
    (await g
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
      .next()).value
  );
}

export function addSupports(
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

export function addSupportedBy(
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

export async function setSupportedBy(
  proposition: number,
  supportedBy: number[]
): Promise<undefined> {
  await getTraversal()
    .V(proposition)
    .as('prop')
    .V(...supportedBy)
    .as('sb')
    .addE('supports')
    .from_('sb')
    .to('prop')
    .next();

  return undefined;
}

export async function setSupports(
  proposition: number,
  supports: number[]
): Promise<undefined> {
  await getTraversal()
    .V(proposition)
    .as('prop')
    .V(...supports)
    .as('s')
    .addE('supports')
    .from_('prop')
    .to('s')
    .next();

  return undefined;
}

export async function deleteProposition(id: number): Promise<void> {
  await getTraversal()
    .V(id)
    .drop()
    .next();
}

export async function getProposition(id: number): Promise<IProposition | void> {
  const propMap = (await getTraversal()
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

  if (!propMap) {
    return undefined;
  }

  return mapToProposition(propMap);
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
    .toList()).map(mapToProposition);
}
