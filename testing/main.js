export function greet(name) {
  return `Hello, ${name}`
}

export function processOrder(data, dependencies) {
  const paymentInfo = dependencies.processPayment(data.amount);

  return paymentInfo;
}

function processPayment(amount) {
  console.log("I am orginal");
  
  return { id: '123', amount: amount }
}