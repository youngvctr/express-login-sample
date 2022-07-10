const signinBtn = document.querySelector('#signinBtn');
signinBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const id = document.querySelector('#floatingInput').value;
  const pw = document.querySelector('#floatingPassword').value;

  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id,
      pw,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { succeeded, message } = data;

      if (succeeded) {
        location.replace('/');
      } else {
        if (message) {
          const errorMessageSection = document.querySelector('#errorMessageSection');
          const errorMessage = document.querySelector('#errorMessage');

          errorMessageSection.style.display = 'block';
          errorMessage.innerText = message;
        }
      }
    });
});
