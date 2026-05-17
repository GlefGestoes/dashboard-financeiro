// ═══════════════════════════════════════════════════════════════
//  financeiro.js — Gestão Financeira (lógica preservada)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Dados Mock (preservados) ──────────────────────────────
    let dbMock = [
        { id: 1, tipo: 'pagar',   data: '2026-10-20', doc: 'NF-1542',    entidade: 'Amazon Web Services',  cc: 'Tecnologia', valor: 5400.00,    status: 'Pendente' },
        { id: 2, tipo: 'pagar',   data: '2026-10-15', doc: 'DARF IRPJ',  entidade: 'Receita Federal',      cc: 'Tributário', valor: 45000.00,   status: 'Pago'     },
        { id: 3, tipo: 'receber', data: '2026-10-22', doc: 'NF-901',     entidade: 'Cliente Alpha LTDA',   cc: 'Comercial',  valor: 125000.00,  status: 'Pendente' },
        { id: 4, tipo: 'pagar',   data: '2026-10-28', doc: 'NF-0398',    entidade: 'Aluguel Sede SP',      cc: 'Infraestrutura', valor: 18500.00, status: 'Pendente' },
        { id: 5, tipo: 'receber', data: '2026-10-10', doc: 'NF-870',     entidade: 'Beta Comercial LTDA',  cc: 'Comercial',  valor: 67800.00,   status: 'Pago'     },
        { id: 6, tipo: 'pagar',   data: '2026-10-05', doc: 'Fatura-98',  entidade: 'Operadora Telecom',    cc: 'TI',         valor: 2300.00,    status: 'Vencido'  },
    ];

    let currentTab = 'pagar';

    // ── Render da tabela (preservado) ─────────────────────────
    const renderTable = (filterTipo = 'pagar') => {
        const tbody = document.getElementById('finance-tbody');
        if (!tbody) return;

        const searchVal = document.getElementById('search-nome')?.value?.toLowerCase() || '';
        const statusVal = document.getElementById('filtro-status')?.value || '';

        let dados = dbMock.filter(item => item.tipo === filterTipo);

        if (searchVal) {
            dados = dados.filter(item =>
                item.entidade.toLowerCase().includes(searchVal) ||
                item.doc.toLowerCase().includes(searchVal)
            );
        }

        if (statusVal) {
            dados = dados.filter(item => item.status === statusVal);
        }

        tbody.innerHTML = '';

        if (dados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7">
                        <div class="empty-state">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                            <p>Nenhum registro encontrado para os filtros aplicados.</p>
                        </div>
                    </td>
                </tr>`;
            return;
        }

        dados.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="color:var(--text-muted);font-size:var(--font-size-xs);font-family:var(--font-mono)">${formatDate(item.data)}</td>
                <td><span style="font-size:var(--font-size-xs);font-family:var(--font-mono);color:var(--text-muted)">${item.doc}</span></td>
                <td><strong>${item.entidade}</strong></td>
                <td><span class="chip" style="font-size:10px">${item.cc}</span></td>
                <td class="text-num">${formatCurrency(item.valor)}</td>
                <td><span class="badge ${item.status.toLowerCase()}">${item.status}</span></td>
                <td>
                    <div style="display:flex;gap:4px;justify-content:flex-end">
                        <button class="action-btn" title="Editar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="action-btn delete" title="Excluir">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    };

    // ── Tabs (lógica preservada) ──────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTab = e.target.getAttribute('data-tab');
            renderTable(currentTab);
        });
    });

    // ── Filtros ───────────────────────────────────────────────
    document.getElementById('btn-filtrar')?.addEventListener('click', () => {
        renderTable(currentTab);
    });

    document.getElementById('search-nome')?.addEventListener('input', () => {
        renderTable(currentTab);
    });

    document.getElementById('filtro-status')?.addEventListener('change', () => {
        renderTable(currentTab);
    });

    // ── Exportar PDF (preservado) ─────────────────────────────
    document.getElementById('btn-export')?.addEventListener('click', () => {
        window.print();
    });

    // ── Init ──────────────────────────────────────────────────
    renderTable('pagar');
});
