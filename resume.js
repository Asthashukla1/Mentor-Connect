const form = document.getElementById('resumeForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    result.textContent = data.result;
  } catch (error) {
    result.textContent = 'An error occurred: ' + error.message;
  }
});
