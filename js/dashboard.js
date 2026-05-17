// ═══════════════════════════════════════════════════════════════
//  dashboard.js — Lógica do Dashboard (preservada + melhorada)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ── Dados Mock (preservados) ──────────────────────────────
    const mockData = {
        saldo:    1250430.00,
        receitas:  450000.00,
        despesas:  280000.00,
        lucro:     170000.00,
        lancamentos: [
            { data: '15/10/2026', desc: 'Recebimento Cliente A',    valor:  45000 },
            { data: '14/10/2026', desc: 'Pagamento ISSQN',          valor: -12000 },
            { data: '14/10/2026', desc: 'Aquisição Servidores',     valor: -35000 },
        ],
        grafico: [40, 60, 30, 80, 50, 90, 70],
        meses:   ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    };

    // ── Delay simulando rede (preservado) ─────────────────────
    setTimeout(() => {
        loadKPIs();
        loadTable();
        loadChart();
    }, 900);

    // ── KPIs ──────────────────────────────────────────────────
    function loadKPIs() {
        animateValue('kpi-saldo',    mockData.saldo);
        animateValue('kpi-receitas', mockData.receitas);
        animateValue('kpi-despesas', mockData.despesas);
        animateValue('kpi-lucro',    mockData.lucro);

        document.querySelectorAll('.kpi-card .kpi-value').forEach(el => {
            el.classList.remove('skeleton');
        });

        document.querySelectorAll('.kpi-card .kpi-delta').forEach(el => {
            el.style.opacity = '1';
        });
    }

    function animateValue(id, target) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('skeleton');

        let start = 0;
        const duration = 700;
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatCurrency(start + (target - start) * eased);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    // ── Tabela ────────────────────────────────────────────────
    function loadTable() {
        const tbody = document.getElementById('dash-table-body');
        if (!tbody) return;
        tbody.innerHTML = mockData.lancamentos.map(l => `
            <tr>
                <td style="color:var(--text-muted);font-size:var(--font-size-xs);font-family:var(--font-mono)">${l.data}</td>
                <td><strong>${l.desc}</strong></td>
                <td class="text-num ${l.valor > 0 ? 'text-success' : 'text-danger'}" style="text-align:right;">
                    ${l.valor > 0 ? '+' : ''}${formatCurrency(Math.abs(l.valor))}
                </td>
            </tr>
        `).join('');
    }

    // ── Gráfico (preservado + meses) ──────────────────────────
    function loadChart() {
        const chart  = document.getElementById('chart-fluxo');
        const labels = document.getElementById('chart-months');
        if (!chart) return;

        chart.classList.remove('skeleton');
        chart.innerHTML = mockData.grafico.map((val, i) => `
            <div class="bar" style="height: ${val}%" data-val="${mockData.meses[i]}: ${val}%"></div>
        `).join('');

        if (labels) {
            labels.innerHTML = mockData.meses.map(m =>
                `<span class="chart-label">${m}</span>`
            ).join('');
        }
    }
});
