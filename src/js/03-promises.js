const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill

        resolve({ position, delay });
      } else {
        // Reject

        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromises(e) {
  e.preventDefault();

  const amountInputValue = form.elements.amount.value;
  let delayInputValue = Number(form.elements.delay.value);
  const stepInputValue = Number(form.elements.step.value);

  for (let i = 1; i <= amountInputValue; i += 1) {
    createPromise(i, delayInputValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInputValue += stepInputValue;
  }
}
