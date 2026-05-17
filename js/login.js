// ═══════════════════════════════════════════════════════════════
//  login.js — Lógica de autenticação (preservada)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const form   = document.getElementById('login-form');
    const btn    = document.getElementById('btn-submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Estado de loading
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Autenticando...
        `;
        btn.style.opacity = '0.75';
        btn.disabled = true;

        // Simulação de chamada API (preservada)
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    });
});
