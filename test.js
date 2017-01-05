//@ Test, String -> Number
function foo (blah, x) {
  return 123
}

//@ Number -> Number
function bar (x) { x % 2 === 0 }


foo('hello', bar(123, 'Hello'))
