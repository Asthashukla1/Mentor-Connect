const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginToggle.addEventListener('click', () => {
  loginToggle.classList.add('active');
  registerToggle.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
  registerToggle.classList.add('active');
  loginToggle.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
});

// 🚨 Form Validation
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  document.getElementById('loginEmailError').textContent = '';
  document.getElementById('loginPasswordError').textContent = '';

  if (!email.value.includes('@')) {
    document.getElementById('loginEmailError').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (valid) {
    alert('Login successful!');
    loginForm.reset();
  }
});

registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('registerEmail');
  const password = document.getElementById('registerPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  const role = document.getElementById('role');

  document.getElementById('nameError').textContent = '';
  document.getElementById('registerEmailError').textContent = '';
  document.getElementById('registerPasswordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
  document.getElementById('roleError').textContent = '';

  if (name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Name is required.';
    valid = false;
  }

  if (!email.value.includes('@')) {
    document.getElementById('registerEmailError').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (confirmPassword.value !== password.value) {
    document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
    valid = false;
  }

  if (role.value === '') {
    document.getElementById('roleError').textContent = 'Please select a role.';
    valid = false;
  }

  if (valid) {
    alert('Registration successful!');
    registerForm.reset();
  }
});
