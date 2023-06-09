/* eslint-disable no-undef */
import Gameboard from "./gameboard";
import Ship from "./ship";
import { isValidCoords } from "./functions";

describe("#fire() method in Gameboard", () => {
  let shipA;
  let shipB;
  let gameboard;

  beforeEach(() => {
    shipA = new Ship(new Set(["11", "21", "31", "41", "51", "61", "71", "81"]));
    shipB = new Ship(new Set(["11", "21", "31", "41", "51", "61", "71", "81"]));
    gameboard = new Gameboard(shipA, shipB);
  });

  afterEach(() => {});

  test("fire was a hit", () => {
    expect(gameboard.fire("11")).toEqual([true, false]);
  });

  test("fire was a miss", () => {
    expect(gameboard.fire("12")).toEqual([false, false]);
  });

  test("ship size decreases after hit", () => {
    gameboard.fire("11");
    expect(shipA.getSize()).toBe(7);
  });

  test("player turn alternates from A to B", () => {
    gameboard.fire("11");
    expect(gameboard.getTurn()).toBe("Player B");
  });

  test("player turn alternates from B to A", () => {
    gameboard.turn = shipB;
    gameboard.fire("11");
    expect(gameboard.getTurn()).toBe("Player A");
  });

  test("fire() returns [true, true] if game is over", () => {
    shipA = new Ship(new Set(["11"]));
    gameboard = new Gameboard(shipA, shipB);
    expect(gameboard.fire("11")).toEqual([true, true]);
  });

  test("calling fire() on shipA does not call fire() in shipB", () => {
    const fireMock = jest.spyOn(shipB, "fire");
    gameboard.fire("11");
    expect(fireMock).toHaveBeenCalledTimes(0);
  });

  test("attacking one ship does not add to the others' attacked set", () => {
    const attackedSize = gameboard.attackedB.size;
    gameboard.fire("11");
    expect(gameboard.attackedB.size).toBe(attackedSize);
  });

  test("if hit, coord gets added to predicted set", () => {
    const predictedSize = gameboard.predictedA.size;
    gameboard.fire("11");
    expect(gameboard.predictedA.size).toBe(predictedSize + 1);
  });
});

describe("isValidCoords", () => {
  describe("empty set", () => {
    test("it will return true", () => {
      const coords = new Set();
      expect(isValidCoords("11", coords)).toBe(true);
    });
  });

  describe("nonempty set", () => {
    const coords = new Set(["35", "45", "55", "65", "75", "85"]);
    test("adding to occupied cell returns false", () => {
      expect(isValidCoords("35", coords)).toBe(false);
    });

    test("adding to adjacent returns true", () => {
      expect(isValidCoords("25", coords)).toBe(true);
    });

    test("adding non-adjacent cell returns false", () => {
      expect(isValidCoords("11", coords)).toBe(false);
    });
  });
});
