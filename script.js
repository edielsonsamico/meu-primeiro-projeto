/**
 * Samico IoT & Smart Automation Hub Engine
 * Core logic: Device State Management, Telemetry Charting, Terminal CLI & Events
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Data
    const state = {
        devices: [
            { id: 'dev-1', name: 'Luz Principal Sala', category: 'lighting', location: 'Sala de Estar', icon: '💡', active: true, value: 80, isFav: true },
            { id: 'dev-2', name: 'Fita LED RGB Gaming', category: 'lighting', location: 'Quarto Edielson', icon: '🌈', active: true, value: 100, isFav: true },
            { id: 'dev-3', name: 'Ar Condicionado Central', category: 'climate', location: 'Casa Toda', icon: '❄️', active: true, value: 22, isFav: true },
            { id: 'dev-4', name: 'Fechadura Biométrica', category: 'security', location: 'Entrada Principal', icon: '🔒', active: true, value: 1, isFav: true },
            { id: 'dev-5', name: 'Luz de Leitura', category: 'lighting', location: 'Escritório', icon: '🛋️', active: false, value: 50, isFav: false },
            { id: 'dev-6', name: 'Irrigação Jardim', category: 'agri', location: 'Jardim Externo', icon: '🌱', active: false, value: 0, isFav: true },
            { id: 'dev-7', name: 'Purificador de Ar', category: 'climate', location: 'Quarto Principal', icon: '💨', active: true, value: 40, isFav: false },
            { id: 'dev-8', name: 'Câmera HD Externa', category: 'security', location: 'Garagem', icon: '📹', active: true, value: 1, isFav: false }
        ],
        thermostatTemp: 22.0,
        thermostatMode: 'cool',
        doorLocked: true,
        alarmArmed: true,
        telemetryHistory: []
    };

    // 2. DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const liveClockEl = document.getElementById('live-clock');
    const kpiActiveCount = document.getElementById('kpi-active-count');
    const kpiPower = document.getElementById('kpi-power');
    const kpiTemp = document.getElementById('kpi-temp');
    const favoritesGrid = document.getElementById('favorites-grid');
    const lightingGrid = document.getElementById('lighting-grid');
    const climateGrid = document.getElementById('climate-grid');
    const activityStream = document.getElementById('activity-stream');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    // 3. Tab Switching Logic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            item.classList.add('active');
            const targetEl = document.getElementById(`tab-${targetTab}`);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // 4. Live Clock (BRT Time)
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('pt-BR');
        if (liveClockEl) {
            liveClockEl.querySelector('.time').textContent = timeStr;
        }
        const camTimeEl = document.getElementById('cam-time');
        if (camTimeEl) {
            camTimeEl.textContent = `REC ${timeStr}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 5. Toast Notification System
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 6. Log & Activity Stream
    function logEvent(msg, type = 'info') {
        const timeStr = new Date().toLocaleTimeString('pt-BR');
        // Add to Terminal
        if (terminalOutput) {
            const line = document.createElement('div');
            line.className = `log-line ${type}`;
            line.textContent = `[${timeStr}] ${msg}`;
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        // Add to Dashboard Activity
        if (activityStream) {
            const item = document.createElement('li');
            item.className = 'activity-item';
            item.innerHTML = `
                <span class="activity-icon">${type === 'warn' ? '⚠️' : '⚡'}</span>
                <div class="activity-details">
                    <span>${msg}</span>
                    <span class="activity-time">${timeStr}</span>
                </div>
            `;
            activityStream.insertBefore(item, activityStream.firstChild);
            if (activityStream.children.length > 8) {
                activityStream.removeChild(activityStream.lastChild);
            }
        }
    }

    // 7. Render Device Card Component
    function createDeviceCard(dev) {
        const card = document.createElement('div');
        card.className = `device-card ${dev.active ? 'active' : ''}`;
        card.setAttribute('data-id', dev.id);

        card.innerHTML = `
            <div class="device-header">
                <div class="device-icon-box">${dev.icon}</div>
                <label class="switch">
                    <input type="checkbox" ${dev.active ? 'checked' : ''} class="device-toggle">
                    <span class="slider"></span>
                </label>
            </div>
            <div>
                <div class="device-name">${dev.name}</div>
                <div class="device-location">${dev.location}</div>
            </div>
            ${dev.category === 'lighting' ? `
                <div class="device-controls">
                    <div class="slider-container">
                        <label>Brilho:</label>
                        <input type="range" min="0" max="100" value="${dev.value}" class="range-slider dev-slider">
                        <span class="slider-val">${dev.value}%</span>
                    </div>
                </div>
            ` : ''}
        `;

        // Toggle Switch Event Listener
        const toggle = card.querySelector('.device-toggle');
        toggle.addEventListener('change', (e) => {
            dev.active = e.target.checked;
            card.classList.toggle('active', dev.active);
            updateDashboardKPIs();
            showToast(`${dev.name} foi ${dev.active ? 'LIGADO' : 'DESLIGADO'}`);
            logEvent(`[DISPOSITIVO] ${dev.name} alterado para ${dev.active ? 'ON' : 'OFF'}`, 'info');
        });

        // Range Slider Event Listener
        const slider = card.querySelector('.dev-slider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                dev.value = e.target.value;
                const valLabel = card.querySelector('.slider-val');
                if (valLabel) valLabel.textContent = `${dev.value}%`;
            });
        }

        return card;
    }

    // 8. Render All Devices Grids
    function renderDevices() {
        if (favoritesGrid) {
            favoritesGrid.innerHTML = '';
            state.devices.filter(d => d.isFav).forEach(d => {
                favoritesGrid.appendChild(createDeviceCard(d));
            });
        }

        if (lightingGrid) {
            lightingGrid.innerHTML = '';
            state.devices.filter(d => d.category === 'lighting').forEach(d => {
                lightingGrid.appendChild(createDeviceCard(d));
            });
        }

        if (climateGrid) {
            climateGrid.innerHTML = '';
            state.devices.filter(d => d.category === 'climate').forEach(d => {
                climateGrid.appendChild(createDeviceCard(d));
            });
        }

        updateDashboardKPIs();
    }

    // 9. Update KPI Indicators
    function updateDashboardKPIs() {
        const activeCount = state.devices.filter(d => d.active).length;
        if (kpiActiveCount) kpiActiveCount.textContent = activeCount;

        // Dynamic simulated energy calculation based on active devices
        const calculatedPower = (activeCount * 0.18 + 0.4).toFixed(1);
        if (kpiPower) kpiPower.textContent = calculatedPower;
    }

    renderDevices();

    // 10. Thermostat Control
    const thermostatValEl = document.getElementById('thermostat-val');
    const btnTempDown = document.getElementById('temp-down');
    const btnTempUp = document.getElementById('temp-up');
    const modeBtns = document.querySelectorAll('.mode-btn');

    if (btnTempDown) {
        btnTempDown.addEventListener('click', () => {
            state.thermostatTemp = Math.max(16, state.thermostatTemp - 0.5);
            thermostatValEl.textContent = state.thermostatTemp.toFixed(1);
            if (kpiTemp) kpiTemp.textContent = (state.thermostatTemp + 1.8).toFixed(1);
        });
    }

    if (btnTempUp) {
        btnTempUp.addEventListener('click', () => {
            state.thermostatTemp = Math.min(30, state.thermostatTemp + 0.5);
            thermostatValEl.textContent = state.thermostatTemp.toFixed(1);
            if (kpiTemp) kpiTemp.textContent = (state.thermostatTemp + 1.8).toFixed(1);
        });
    }

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-mode');
            const label = document.getElementById('thermostat-mode-label');
            if (label) label.textContent = mode.toUpperCase();
            logEvent(`[TERMOSTATO] Modo alterado para: ${mode}`, 'info');
        });
    });

    // 11. Security Lock & Alarm Controls
    const btnLock = document.getElementById('btn-toggle-lock');
    const lockStatusTxt = document.querySelector('.status-txt');
    const lockStatusIcon = document.querySelector('.status-icon');

    if (btnLock) {
        btnLock.addEventListener('click', () => {
            state.doorLocked = !state.doorLocked;
            if (state.doorLocked) {
                lockStatusTxt.textContent = 'PORTA TRANCADA';
                lockStatusIcon.textContent = '🔒';
                showToast('Fechadura Biométrica Trancada');
                logEvent('[SEGURANÇA] Fechadura Biométrica Trancada', 'info');
            } else {
                lockStatusTxt.textContent = 'PORTA DESTRANCADA';
                lockStatusIcon.textContent = '🔓';
                showToast('Fechadura Biométrica Destrancada com sucesso!');
                logEvent('[SEGURANÇA] Fechadura Biométrica Destrancada por Edielson', 'warn');
            }
        });
    }

    // 12. Quick Presets
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.getAttribute('data-preset');
            if (preset === 'cinema') {
                state.devices.forEach(d => {
                    if (d.category === 'lighting') d.active = false;
                });
                showToast('Modo Cinema ativado: Luzes apagadas');
                logEvent('[PRESET] Modo Cinema acionado', 'cmd');
            } else if (preset === 'home') {
                state.devices.forEach(d => d.active = true);
                showToast('Modo Chegando em Casa: Dispositivos ligados');
                logEvent('[PRESET] Modo Chegando em Casa acionado', 'cmd');
            } else if (preset === 'night') {
                state.devices.forEach(d => d.active = d.category === 'security');
                showToast('Modo Noturno: Apenas Segurança Ativa');
                logEvent('[PRESET] Modo Noturno acionado', 'cmd');
            }
            renderDevices();
        });
    });

    // 13. Realtime Telemetry Canvas Chart Animation
    const canvas = document.getElementById('telemetryChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function drawChart() {
            const width = canvas.width = canvas.parentElement.clientWidth;
            const height = canvas.height = 200;

            ctx.clearRect(0, 0, width, height);

            // Generate points
            const pointsCount = 15;
            const step = width / (pointsCount - 1);
            const now = Date.now();

            ctx.beginPath();
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;

            for (let i = 0; i < pointsCount; i++) {
                const x = i * step;
                const y = height / 2 + Math.sin((now / 1000) + i) * 35;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Gradient Fill below line
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
            grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Draw Second Line (Temperature)
            ctx.beginPath();
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            for (let i = 0; i < pointsCount; i++) {
                const x = i * step;
                const y = height / 2 + Math.cos((now / 1200) + i) * 25 + 20;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            requestAnimationFrame(drawChart);
        }
        drawChart();
    }

    // 14. Terminal CLI Input Handler
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim();
                if (!cmd) return;
                logEvent(`samico@agasti-hub:~$ ${cmd}`, 'cmd');
                terminalInput.value = '';

                const cleanCmd = cmd.toLowerCase();
                if (cleanCmd === 'help') {
                    logEvent('Comandos disponíveis: help, status, lock, unlock, turn on, turn off, clear', 'sys');
                } else if (cleanCmd === 'status') {
                    logEvent(`[STATUS] Total: ${state.devices.length} | Ativos: ${state.devices.filter(d=>d.active).length} | Temp: ${state.thermostatTemp}°C`, 'sys');
                } else if (cleanCmd === 'lock') {
                    state.doorLocked = true;
                    logEvent('[SYSTEM] Fechadura trancada via CLI', 'info');
                } else if (cleanCmd === 'unlock') {
                    state.doorLocked = false;
                    logEvent('[SYSTEM] Fechadura destrancada via CLI', 'warn');
                } else if (cleanCmd === 'clear') {
                    if (terminalOutput) terminalOutput.innerHTML = '';
                } else {
                    logEvent(`Comando não reconhecido: "${cmd}". Digite "help" para ver os comandos.`, 'error');
                }
            }
        });
    }

    // 15. Modal Dialog Handlers
    const modalAdd = document.getElementById('modal-add');
    const btnAddDevice = document.getElementById('btn-add-device');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const btnModalCancel = document.getElementById('btn-modal-cancel');
    const btnModalSave = document.getElementById('btn-modal-save');

    if (btnAddDevice) btnAddDevice.addEventListener('click', () => modalAdd.classList.add('active'));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => modalAdd.classList.remove('active'));
    if (btnModalCancel) btnModalCancel.addEventListener('click', () => modalAdd.classList.remove('active'));

    if (btnModalSave) {
        btnModalSave.addEventListener('click', () => {
            const name = document.getElementById('new-dev-name').value.trim();
            const cat = document.getElementById('new-dev-cat').value;
            if (!name) {
                alert('Por favor informe o nome do dispositivo.');
                return;
            }
            const newDev = {
                id: `dev-${Date.now()}`,
                name: name,
                category: cat,
                location: 'Personalizado',
                icon: cat === 'lighting' ? '💡' : cat === 'climate' ? '❄️' : '🛡️',
                active: true,
                value: 50,
                isFav: true
            };
            state.devices.push(newDev);
            renderDevices();
            modalAdd.classList.remove('active');
            showToast(`Dispositivo "${name}" adicionado com sucesso!`);
            logEvent(`[DISPOSITIVO] Novo dispositivo adicionado: ${name}`, 'sys');
        });
    }

    logEvent('Sistema Samico IoT iniciado e sincronizado.', 'sys');
});
