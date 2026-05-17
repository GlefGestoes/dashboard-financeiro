document.addEventListener('DOMContentLoaded', () => {
    // Estrutura refletindo Lei 6.404/76 e CPCs
    const planoContasMock = [
        { conta: '1.1.01.01', desc: 'Caixa e Equivalentes de Caixa', debito: 450000, credito: 120000, saldo: 330000 },
        { conta: '1.1.02.01', desc: 'Clientes a Receber', debito: 850000, credito: 300000, saldo: 550000 },
        { conta: '2.1.01.01', desc: 'Fornecedores Nacionais', debito: 200000, credito: 600000, saldo: -400000 },
        { conta: '2.1.03.01', desc: 'Obrigações Fiscais (IRPJ/CSLL)', debito: 0, credito: 150000, saldo: -150000 }
    ];

    const tbody = document.getElementById('contabil-tbody');
    planoContasMock.forEach(item => {
        const tr = document.createElement('tr');
        // Identificação visual de natureza da conta
        const color = item.saldo < 0 ? 'var(--burgundy)' : '#2e7d32'; 
        
        tr.innerHTML = `
            <td><strong>${item.conta}</strong></td>
            <td>${item.desc}</td>
            <td>${formatCurrency(item.debito)}</td>
            <td>${formatCurrency(item.credito)}</td>
            <td style="color: ${color}; font-weight: bold;">${formatCurrency(Math.abs(item.saldo))} ${item.saldo < 0 ? 'C' : 'D'}</td>
        `;
        tbody.appendChild(tr);
    });
});