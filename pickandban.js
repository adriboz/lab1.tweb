// Класс для управления игрой
class TeamBuilder {
    constructor() {
        this.agents = [
            { id: 1, name: "Jett", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 2, name: "Phoenix", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 3, name: "Reyna", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 4, name: "Raze", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 5, name: "Yoru", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 6, name: "Neon", role: "duelist", roleName: "Дуэлист", icon: "⚔️" },
            { id: 7, name: "Sova", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 8, name: "Skye", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 9, name: "Breach", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 10, name: "KAY/O", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 11, name: "Fade", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 12, name: "Gekko", role: "initiator", roleName: "Инициатор", icon: "🔍" },
            { id: 13, name: "Brimstone", role: "controller", roleName: "Контроллер", icon: "🌫️" },
            { id: 14, name: "Viper", role: "controller", roleName: "Контроллер", icon: "🌫️" },
            { id: 15, name: "Omen", role: "controller", roleName: "Контроллер", icon: "🌫️" },
            { id: 16, name: "Astra", role: "controller", roleName: "Контроллер", icon: "🌫️" },
            { id: 17, name: "Harbor", role: "controller", roleName: "Контроллер", icon: "🌫️" },
            { id: 18, name: "Clove", role: "controller", roleName: "Контроллер", icon: "🌫️" }
        ];
        
        this.pickedAgents = [];
        this.bannedAgents = [];
        this.currentFilter = 'all';
        
        this.roleConfig = {
            duelist: { name: "Дуэлисты", icon: "⚔️", min: 1, max: 2, weight: 0.33 },
            initiator: { name: "Инициаторы", icon: "🔍", min: 1, max: 2, weight: 0.33 },
            controller: { name: "Контроллеры", icon: "🌫️", min: 1, max: 2, weight: 0.34 }
        };
        
        this.init();
    }
    
    init() {
        this.cacheDomElements();
        this.renderFilters();
        this.renderAgents();
        this.renderTeam();
        this.updateBalance();
        this.attachEventListeners();
    }
    
    cacheDomElements() {
        this.roleFiltersContainer = document.getElementById('roleFilters');
        this.agentsGridContainer = document.getElementById('agentsGrid');
        this.teamSlotsContainer = document.getElementById('teamSlots');
        this.teamCountSpan = document.getElementById('teamCount');
        this.balanceCard = document.getElementById('balanceCard');
        this.balanceScoreSpan = document.getElementById('balanceScore');
        this.balanceFillDiv = document.getElementById('balanceFill');
        this.balanceMessageDiv = document.getElementById('balanceMessage');
        this.roleStatsContainer = document.getElementById('roleStats');
        this.messageArea = document.getElementById('messageArea');
        this.clearBtn = document.getElementById('clearBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }
    
    attachEventListeners() {
        this.clearBtn.addEventListener('click', () => this.clearTeam());
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }
    
    renderFilters() {
        const filters = [
            { id: 'all', name: 'ВСЕ', icon: '🎮' },
            { id: 'duelist', name: 'ДУЭЛИСТЫ', icon: '⚔️' },
            { id: 'initiator', name: 'ИНИЦИАТОРЫ', icon: '🔍' },
            { id: 'controller', name: 'КОНТРОЛЛЕРЫ', icon: '🌫️' }
        ];
        
        this.roleFiltersContainer.innerHTML = filters.map(filter => `
            <button class="filter-btn ${this.currentFilter === filter.id ? 'active' : ''}" 
                    data-filter="${filter.id}">
                ${filter.icon} ${filter.name}
            </button>
        `).join('');
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterId = btn.getAttribute('data-filter');
                this.setFilter(filterId);
            });
        });
    }
    
    setFilter(filterId) {
        this.currentFilter = filterId;
        this.renderFilters();
        this.renderAgents();
    }
    
    renderAgents() {
        const filteredAgents = this.currentFilter === 'all' 
            ? this.agents 
            : this.agents.filter(a => a.role === this.currentFilter);
        
        this.agentsGridContainer.innerHTML = filteredAgents.map(agent => {
            const isPicked = this.pickedAgents.some(p => p.id === agent.id);
            const isBanned = this.bannedAgents.some(b => b.id === agent.id);
            const disabled = isPicked || isBanned;
            
            return `
                <div class="agent-item ${disabled ? 'disabled' : ''}" data-agent-id="${agent.id}">
                    <div class="agent-name">${agent.icon} ${agent.name}</div>
                    <div class="agent-role role-${agent.role}">${agent.roleName}</div>
                    ${isPicked ? '<div class="badge badge-picked">В КОМАНДЕ</div>' : ''}
                    ${isBanned ? '<div class="badge badge-banned">ЗАБАНЕН</div>' : ''}
                </div>
            `;
        }).join('');
        
        document.querySelectorAll('.agent-item:not(.disabled)').forEach(item => {
            item.addEventListener('click', () => {
                const agentId = parseInt(item.getAttribute('data-agent-id'));
                this.pickAgent(agentId);
            });
        });
    }
    
    pickAgent(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        
        if (!agent) return;
        
        if (this.bannedAgents.some(b => b.id === agentId)) {
            this.showMessage(`❌ ${agent.name} забанен и не может быть выбран!`, 'error');
            return;
        }
        
        if (this.pickedAgents.some(p => p.id === agentId)) {
            this.removeFromTeam(agentId);
            return;
        }
        
        if (this.pickedAgents.length >= 5) {
            this.showMessage('⚠️ Команда уже полная! Удалите кого-нибудь перед добавлением', 'warning');
            return;
        }
        
        this.pickedAgents.push(agent);
        this.showMessage(`✅ ${agent.name} добавлен в команду!`, 'success');
        this.renderAgents();
        this.renderTeam();
        this.updateBalance();
    }
    
    removeFromTeam(agentId) {
        const agent = this.pickedAgents.find(a => a.id === agentId);
        this.pickedAgents = this.pickedAgents.filter(a => a.id !== agentId);
        this.showMessage(`🗑️ ${agent.name} удален из команды`, 'info');
        this.renderAgents();
        this.renderTeam();
        this.updateBalance();
    }
    
    renderTeam() {
        this.teamCountSpan.textContent = `${this.pickedAgents.length}/5`;
        
        if (this.pickedAgents.length === 0) {
            this.teamSlotsContainer.innerHTML = `
                <div class="team-slot">
                    <div class="slot-empty">Команда пуста. Выберите агентов слева</div>
                </div>
            `;
            return;
        }
        
        this.teamSlotsContainer.innerHTML = this.pickedAgents.map((agent) => `
            <div class="team-slot">
                <div>
                    <strong>${agent.icon} ${agent.name}</strong><br>
                    <small style="color: #aaa;">${agent.roleName}</small>
                </div>
                <button class="remove-agent" data-agent-id="${agent.id}">✖</button>
            </div>
        `).join('');
        
        document.querySelectorAll('.remove-agent').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const agentId = parseInt(btn.getAttribute('data-agent-id'));
                this.removeFromTeam(agentId);
            });
        });
    }
    
    updateBalance() {
        const roleCounts = {
            duelist: this.pickedAgents.filter(a => a.role === 'duelist').length,
            initiator: this.pickedAgents.filter(a => a.role === 'initiator').length,
            controller: this.pickedAgents.filter(a => a.role === 'controller').length
        };
        
        let score = 0;
        let maxScore = 0;
        
        for (let [role, config] of Object.entries(this.roleConfig)) {
            const count = roleCounts[role];
            const min = config.min;
            const max = config.max;
            const weight = config.weight;
            
            let roleScore = 0;
            
            if (count === 0) {
                roleScore = 0;
            } else if (count >= min && count <= max) {
                roleScore = 100;
            } else if (count < min) {
                roleScore = (count / min) * 100;
            } else {
                roleScore = Math.max(0, 100 - ((count - max) / 2) * 100);
            }
            
            score += roleScore * weight;
            maxScore += 100 * weight;
        }
        
        const isFullTeam = this.pickedAgents.length === 5;
        let finalScore = (score / maxScore) * 100;
        
        if (isFullTeam) {
            finalScore = finalScore * 1.1;
        } else {
            finalScore = finalScore * (this.pickedAgents.length / 5);
        }
        
        finalScore = Math.min(100, Math.max(0, Math.round(finalScore)));
        
        this.balanceScoreSpan.textContent = `${finalScore}%`;
        this.balanceFillDiv.style.width = `${finalScore}%`;
        
        if (finalScore >= 80) {
            this.balanceCard.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            this.balanceMessageDiv.innerHTML = '🎉 ИДЕАЛЬНЫЙ СОСТАВ! Отличный баланс ролей!';
        } else if (finalScore >= 60) {
            this.balanceCard.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
            this.balanceMessageDiv.innerHTML = '👍 ХОРОШИЙ СОСТАВ, но можно улучшить баланс';
        } else if (finalScore > 0) {
            this.balanceCard.style.background = 'linear-gradient(135deg, #ff4655, #ff6b6b)';
            this.balanceMessageDiv.innerHTML = '⚠️ НУЖНО УЛУЧШИТЬ БАЛАНС! Добавьте недостающие роли';
        } else {
            this.balanceCard.style.background = 'linear-gradient(135deg, #ff4655, #ff6b6b)';
            this.balanceMessageDiv.innerHTML = '👥 Добавьте агентов в команду';
        }
        
        this.renderRoleStats(roleCounts);
    }
    
    renderRoleStats(roleCounts) {
        const statsHtml = Object.entries(this.roleConfig).map(([role, config]) => {
            const count = roleCounts[role];
            const min = config.min;
            const max = config.max;
            const percent = (count / max) * 100;
            
            let status = '';
            let statusColor = '';
            
            if (count === 0) {
                status = '❌ Отсутствует';
                statusColor = '#ff4655';
            } else if (count < min) {
                status = `⚠️ Нужно еще ${min - count}`;
                statusColor = '#ff9800';
            } else if (count > max) {
                status = `⚠️ Перебор (макс ${max})`;
                statusColor = '#ff9800';
            } else {
                status = '✅ Оптимально';
                statusColor = '#4caf50';
            }
            
            return `
                <div class="role-stat">
                    <div>${config.icon} ${config.name}: ${count} (рекомендуем ${min}-${max}) <span style="color: ${statusColor}">${status}</span></div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${percent}%; background: ${statusColor}"></div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.roleStatsContainer.innerHTML = statsHtml;
    }
    
    clearTeam() {
        if (this.pickedAgents.length === 0) {
            this.showMessage('Команда и так пуста', 'info');
            return;
        }
        this.pickedAgents = [];
        this.showMessage('🧹 Команда очищена', 'success');
        this.renderAgents();
        this.renderTeam();
        this.updateBalance();
    }
    
    resetGame() {
        this.pickedAgents = [];
        this.bannedAgents = [];
        this.currentFilter = 'all';
        this.showMessage('🔄 Игра полностью сброшена', 'success');
        this.renderFilters();
        this.renderAgents();
        this.renderTeam();
        this.updateBalance();
    }
    
    showMessage(text, type) {
        const colors = {
            success: '#4caf50',
            error: '#ff4655',
            warning: '#ff9800',
            info: '#2196f3'
        };
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.style.background = colors[type];
        messageDiv.style.color = 'white';
        messageDiv.textContent = text;
        
        this.messageArea.innerHTML = '';
        this.messageArea.appendChild(messageDiv);
        
        setTimeout(() => {
            if (this.messageArea.firstChild === messageDiv) {
                this.messageArea.innerHTML = '';
            }
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TeamBuilder();
});