document.addEventListener('DOMContentLoaded', () => {
    // Dados Mockados para o Dashboard
    const mockData = {
        saldo: 1250430.00,
        receitas: 450000.00,
        despesas: 280000.00,
        lucro: 170000.00,
        lancamentos: [
            { data: '15/10/2026', desc: 'Recebimento Cliente A', valor: 45000 },
            { data: '14/10/2026', desc: 'Pagamento ISSQN', valor: -12000 },
            { data: '14/10/2026', desc: 'Aquisição Servidores', valor: -35000 }
        ],
        grafico: [40, 60, 30, 80, 50, 90, 70] // % de altura das barras
    };

    setTimeout(() => {
        // Remover Skeletons e injetar dados
        document.getElementById('kpi-saldo').textContent = formatCurrency(mockData.saldo);
        document.getElementById('kpi-receitas').textContent = formatCurrency(mockData.receitas);
        document.getElementById('kpi-despesas').textContent = formatCurrency(mockData.despesas);
        document.getElementById('kpi-lucro').textContent = formatCurrency(mockData.lucro);
        
        document.querySelectorAll('.kpi-card h3').forEach(el => el.classList.remove('skeleton'));

        // Popular Tabela
        const tbody = document.getElementById('dash-table-body');
        tbody.innerHTML = mockData.lancamentos.map(l => `
            <tr>
                <td>${l.data}</td>
                <td>${l.desc}</td>
                <td style="color: ${l.valor > 0 ? '#2e7d32' : 'var(--burgundy)'}">${formatCurrency(Math.abs(l.valor))}</td>
            </tr>
        `).join('');

        // Gerar Gráfico CSS Vanilla
        const chart = document.getElementById('chart-fluxo');
        chart.classList.remove('skeleton');
        chart.innerHTML = mockData.grafico.map(val => `
            <div class="bar" style="height: ${val}%" data-val="${val}%"></div>
        `).join('');

    }, 1000); // delay simulando rede
});