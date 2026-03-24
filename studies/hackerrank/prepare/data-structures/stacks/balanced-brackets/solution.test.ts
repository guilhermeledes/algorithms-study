import { describe, expect, it } from "vitest";

import { isBalanced, isBalancedBruteForce } from "./solution.js";

describe("isBalanced", () => {
  it("returns YES for the sample balanced cases", () => {
    expect(isBalanced("{[()]}")).toBe("YES");
    expect(isBalanced("{{[[(())]]}}")).toBe("YES");
  });

  it("returns NO for the sample unbalanced case", () => {
    expect(isBalanced("{[(])}")).toBe("NO");
  });

  it("rejects strings that start with a closing bracket", () => {
    expect(isBalanced("]")).toBe("NO");
    expect(isBalanced("}{")).toBe("NO");
  });

  it("rejects strings with leftover opening brackets", () => {
    expect(isBalanced("(((")).toBe("NO");
    expect(isBalanced("{[(")).toBe("NO");
  });

  it("accepts the empty string as balanced in the local study model", () => {
    expect(isBalanced("")).toBe("YES");
  });

  it("catches crossed nesting", () => {
    expect(isBalanced("([)]")).toBe("NO");
    expect(isBalanced("{[()()]}")).toBe("YES");
  });

  it("matches the brute-force reference implementation on representative inputs", () => {
    const inputs = [
      "{[()]}",
      "{[(])}",
      "{{[[(())]]}}",
      "]",
      "}{",
      "(((",
      "{[(",
      "",
      "([)]",
      "{[()()]}",
    ];

    for (const input of inputs) {
      expect(isBalanced(input)).toBe(isBalancedBruteForce(input));
    }
  });
});
