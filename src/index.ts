// non-directed graph representation

import {
    DijkstrasNonDirectedGraphMap,
    DijkstrasResultsTableMap,
    dijkstrasAlgorithm,
    getShortedPathArrowedFormattedString,
    getShortestPath,
} from "./dijkstrasAlgorithm";

// verticies/nodes with edges
export const graph: DijkstrasNonDirectedGraphMap = {
    a: { b: 6, d: 1 },
    b: { a: 6, c: 5, e: 2, d: 2 },
    c: { b: 5, e: 5 },
    d: { a: 1, b: 2, e: 1 },
    e: { d: 1, b: 2, c: 5 },
};

const shortedPathsResultsTableFromA: DijkstrasResultsTableMap =
    dijkstrasAlgorithm(graph, "a");

console.log("shortest path results table from node a");
console.log(shortedPathsResultsTableFromA);

console.log("shortest path to node c from node a arr");
const shortestPathFromAToC: string[] = getShortestPath(
    shortedPathsResultsTableFromA,
    "c",
);
console.log(shortestPathFromAToC);

console.log(
    "shorted path to node 'c' from node 'a' in formatted directional path string",
);
console.log(getShortedPathArrowedFormattedString(shortestPathFromAToC));
