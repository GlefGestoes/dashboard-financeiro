document.addEventListener('DOMContentLoaded', () => {
    // Mock Data preparado para integração
    let dbMock = [
        { id: 1, tipo: 'pagar', data: '2026-10-20', doc: 'NF-1542', entidade: 'Amazon Web Services', cc: 'Tecnologia', valor: 5400.00, status: 'Pendente' },
        { id: 2, tipo: 'pagar', data: '2026-10-15', doc: 'DARF IRPJ', entidade: 'Receita Federal', cc: 'Tributário', valor: 45000.00, status: 'Pago' },
        { id: 3, tipo: 'receber', data: '2026-10-22', doc: 'NF-901', entidade: 'Cliente Alpha LTDA', cc: 'Comercial', valor: 125000.00, status: 'Pendente' }
    ];

    const renderTable = (filterTipo = 'pagar') => {
        const tbody = document.getElementById('finance-tbody');
        tbody.innerHTML = '';
        const dados = dbMock.filter(item => item.tipo === filterTipo);

        if(dados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Nenhum registro encontrado.</td></tr>`;
            return;
        }

        dados.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.data.split('-').reverse().join('/')}</td>
                <td>${item.doc}</td>
                <td>${item.entidade}</td>
                <td>${item.cc}</td>
                <td>${formatCurrency(item.valor)}</td>
                <td><span class="badge ${item.status.toLowerCase()}">${item.status}</span></td>
                <td>
                    <button class="action-btn" title="Editar">✎</button>
                    <button class="action-btn" title="Excluir">🗑</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    };

    // Lógica das Abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTable(e.target.getAttribute('data-tab'));
        });
    });

    // Init
    renderTable('pagar');
});