//  AAA
/**
 * Arrange
 * Act
 * Assert
 */

import { greet } from "../main.js"
import assert from "node:assert"
import { test } from "node:test"

test("greet returns the correct greeting message", () => {
    const expected = "Hello, Alice"
    const actual = greet("Alice")

    assert.strictEqual(actual, expected)
    
})