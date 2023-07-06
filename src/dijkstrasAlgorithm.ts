// non-directed graph representation type
// verticies/nodes with edges
export type EdgeWeight = number;
export type DijkstrasNonDirectedGraphMap = {
    [node: string]: { [node: string]: EdgeWeight };
};

// results table map object
export type DijkstrasResultsTableMap = {
    [node: string]: {
        shortestDistanceFromNodeX: number;
        previousVertex: string | null;
    };
};

/**
 * implementation of the greedy first search dijkstras algorithm
 */

export function dijkstrasAlgorithm(
    nonDirectedGraphMap: DijkstrasNonDirectedGraphMap,
    fromNode: string,
): DijkstrasResultsTableMap {
    const visited: string[] = [fromNode];
    const allNodes: string[] = [];

    const resultsTable: DijkstrasResultsTableMap = {};
    for (const node in nonDirectedGraphMap) {
        allNodes.push(node);
        resultsTable[node] = {
            shortestDistanceFromNodeX: Infinity,
            previousVertex: null,
        };
    }

    if (!(fromNode in resultsTable))
        throw new Error("node to search from doesn't exist in graph");

    resultsTable[fromNode].shortestDistanceFromNodeX = 0;

    let prevNode: any = fromNode; // string | null

    while (allNodes.length !== visited.length) {
        let lowestScore = Infinity;
        let targetNodeWithLowestScore: any = null; // string | null

        let edgeScoreFromCurrentToTargetNode = 0;
        for (const targetNode in nonDirectedGraphMap[prevNode]) {
            if (visited.indexOf(targetNode) !== -1)
                // if target node has already been visited
                continue;

            edgeScoreFromCurrentToTargetNode =
                nonDirectedGraphMap[prevNode][targetNode];

            const sumScoreFromCurrentNodeToTargetNode =
                resultsTable[prevNode].shortestDistanceFromNodeX +
                edgeScoreFromCurrentToTargetNode;

            if (
                sumScoreFromCurrentNodeToTargetNode <
                resultsTable[targetNode].shortestDistanceFromNodeX
            ) {
                resultsTable[targetNode].shortestDistanceFromNodeX =
                    sumScoreFromCurrentNodeToTargetNode;
                resultsTable[targetNode].previousVertex = prevNode;
            }

            if (edgeScoreFromCurrentToTargetNode < lowestScore) {
                lowestScore = edgeScoreFromCurrentToTargetNode;
                targetNodeWithLowestScore = targetNode;
            }
        }

        visited.push(prevNode);
        prevNode = targetNodeWithLowestScore;
    }

    return resultsTable;
}

export function getShortestPath(
    djistraResultsTable: DijkstrasResultsTableMap,
    destinationNode: string,
): string[] {
    if (!(destinationNode in djistraResultsTable))
        throw new Error("destination node doesn't exist");
    function getShortestPathArrRecursive(destinationNode: string): string[] {
        const prevNode = djistraResultsTable[destinationNode].previousVertex;
        if (prevNode) {
            return getShortestPathArrRecursive(prevNode).concat([prevNode]);
        } else {
            return [];
        }
    }
    return getShortestPathArrRecursive(destinationNode).concat([
        destinationNode,
    ]);
}

export function getShortedPathArrowedFormattedString(
    nodesPathArr: string[],
): string {
    if (nodesPathArr.length === 0)
        throw new Error(
            "nodes path array must contain string nodes in it and be non empty",
        );
    function getShortedPathArrowedFormattedStringRecursive(
        nodesPathArr: string[],
    ): string {
        if (nodesPathArr.length > 0) {
            return getShortedPathArrowedFormattedStringRecursive(
                nodesPathArr.slice(0, nodesPathArr.length - 1),
            ).concat(` --> ${nodesPathArr[nodesPathArr.length - 1]}`);
        } else {
            return "";
        }
    }
    // @ts-ignore
    return nodesPathArr
        .shift()
        .concat(getShortedPathArrowedFormattedStringRecursive(nodesPathArr));
}
