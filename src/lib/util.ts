import gremlin from 'gremlin';
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

export function getTraversal() {
  return traversal().withRemote(
    new DriverRemoteConnection(
      `ws://localhost:${process.env.GREMLIN_PORT}/gremlin`,
      {}
    )
  );
}
