import {
    DijkstrasNonDirectedGraphMap,
    DijkstrasResultsTableMap,
    dijkstrasAlgorithm,
    getShortedPathArrowedFormattedString,
    getShortestPath,
} from "./dijkstrasAlgorithm";

describe("graph a tests", () => {
    const graphA: DijkstrasNonDirectedGraphMap = {
        a: { b: 6, d: 1 },
        b: { a: 6, c: 5, e: 2, d: 2 },
        c: { b: 5, e: 5 },
        d: { a: 1, b: 2, e: 1 },
        e: { d: 1, b: 2, c: 5 },
    };

    const graphADijkstrasResultsLookUpTableFromNodeA = dijkstrasAlgorithm(graphA, "a");

    const resultsTableExpected: DijkstrasResultsTableMap = {
        a: { shortestDistanceFromNodeX: 0, previousVertex: null },
        b: { shortestDistanceFromNodeX: 3, previousVertex: "d" },
        c: { shortestDistanceFromNodeX: 7, previousVertex: "e" },
        d: { shortestDistanceFromNodeX: 1, previousVertex: "a" },
        e: { shortestDistanceFromNodeX: 2, previousVertex: "d" },
    };

    test("test results table from node a correctness", () => {
        expect(graphADijkstrasResultsLookUpTableFromNodeA).toEqual(resultsTableExpected);
    });

    test("test shortest path to a from a", () => {
        expect(getShortestPath(graphADijkstrasResultsLookUpTableFromNodeA, "a")).toEqual(["a"]);
    });

    test("test shortest path to c from a", () => {
        expect(getShortestPath(graphADijkstrasResultsLookUpTableFromNodeA, "c")).toEqual(["a", "d", "e", "c"]);
    });

    test("test shortest path to e from a", () => {
        expect(getShortestPath(graphADijkstrasResultsLookUpTableFromNodeA, "e")).toEqual(["a", "d", "e"]);
    });

    test("test throws when string node to search from doesn't exist in graph", () => {
        expect(() => dijkstrasAlgorithm(graphA, "z")).toThrow("node to search from doesn't exist in graph");
    });
});

describe("graph b tests", () => {
    const graphB: DijkstrasNonDirectedGraphMap = {
        a: { b: 2, d: 8 },
        b: { a: 2, e: 6, d: 5 },
        c: { f: 3, e: 9 },
        d: { a: 8, b: 5, e: 3, f: 2 },
        e: { d: 3, b: 6, c: 9, f: 1 },
        f: { d: 2, c: 3, e: 1 },
    };

    const djistrasResultsLookUpTableFromA = dijkstrasAlgorithm(graphB, "a");

    const resultsTableExpected: DijkstrasResultsTableMap = {
        a: { shortestDistanceFromNodeX: 0, previousVertex: null },
        b: { shortestDistanceFromNodeX: 2, previousVertex: "a" },
        c: { shortestDistanceFromNodeX: 12, previousVertex: "f" },
        d: { shortestDistanceFromNodeX: 7, previousVertex: "b" },
        e: { shortestDistanceFromNodeX: 8, previousVertex: "b" },
        f: { shortestDistanceFromNodeX: 9, previousVertex: "d" },
    };

    test("test results table from node a correctness", () => {
        expect(djistrasResultsLookUpTableFromA).toEqual(resultsTableExpected);
    });

    test("test shortest path to c from a", () => {
        expect(getShortestPath(djistrasResultsLookUpTableFromA, "c")).toEqual(["a", "b", "d", "f", "c"]);
    });

    test("test shortest path to c from a in directional arrow string format", () => {
        expect(getShortedPathArrowedFormattedString(getShortestPath(djistrasResultsLookUpTableFromA, "c"))).toEqual(
            "a --> b --> d --> f --> c",
        );
    });
});
