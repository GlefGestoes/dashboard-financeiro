document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    btn.innerHTML = 'Autenticando...';
    btn.style.opacity = '0.7';
    
    // Simula chamada de API
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 800);
});