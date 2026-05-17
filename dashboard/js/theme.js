// Gerenciador de Tema (Light/Dark) e Sidebar Mobile
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    
    // Recuperar preferência
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Estrutura SVG reutilizável para ícones do menu (simulando assets)
    const icons = {
        dash: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18M9 15l3-3 3 3 6-6"/></svg>',
        fin: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/></svg>',
        cont: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v5H6.5a2.5 2.5 0 0 1-2.5-2.5z M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10z"/></svg>',
        logout: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>'
    };

    // Injetar ícones (apenas para facilitar o render sem SVGs externos)
    document.querySelectorAll('.icon-render').forEach(el => {
        const iconName = el.getAttribute('data-icon');
        if(icons[iconName]) el.innerHTML = icons[iconName];
    });
});

// Utilitário global de formatação financeira
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);