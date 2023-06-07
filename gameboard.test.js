/* eslint-disable no-undef */
import { isValidCoords } from "./gameboard class";

describe("isValidCoords", () => {

    describe("empty set", () => {
        test("it will return true", () => {
            const coords = new Set();
            expect(isValidCoords("11", coords)).toBe(true);
        });
    });

    describe("coords are on the edge of board", () => {
        describe('bottom edge', () => {
            test("left of edge", () => {
                const coords = new Set(['21', '31', '41', '51', '61']);
                expect(isValidCoords("11", coords)).toBe(true);
            });

            test("right of edge", () => {
                const coords = new Set(['11', '21', '31', '41', '51', '61']);
                expect(isValidCoords("71", coords)).toBe(true);
            });

            test("top of edge, left", () => {
                const coords = new Set(['11', '21', '31', '41', '51', '61']);
                expect(isValidCoords("12", coords)).toBe(true);
            });

            test("top of edge, right", () => {
                const coords = new Set(['11', '21', '31', '41', '51', '61']);
                expect(isValidCoords("62", coords)).toBe(true);
            });

            test("top of edge, middle", () => {
                const coords = new Set(['11', '21', '31', '41', '51', '61']);
                expect(isValidCoords("32", coords)).toBe(true);
            });
        })
    });



});
