import { describe, mock, test } from 'node:test'
import { processOrder } from '../main.js'
import assert from 'node:assert'

describe("Order features", () => {
    test("that it processes the order correctly", () => {
        const mockedProcessOrder = mock.fn((amount) => {
            console.log("I am mocked");
            
            return { id: '123', amount: amount }
        })

        const expected = { id: '123', amount: 100 }
        assert.strictEqual(mockedProcessOrder.mock.callCount(), 0)
        const result = processOrder({ amount: 100 }, { processPayment: mockedProcessOrder })

        assert.deepStrictEqual(result, expected)

        assert.strictEqual(mockedProcessOrder.mock.callCount(), 1)

        const call = mockedProcessOrder.mock.calls[0]
        assert.deepStrictEqual(call.arguments, [100])
    })
})