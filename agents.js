function filterAgents(role) {
    const agents = document.querySelectorAll('.agent-card');

    agents.forEach(agent => {
        if (role === 'all') {
            agent.style.display = 'flex';
        } else {
            if (agent.dataset.role === role) {
                agent.style.display = 'flex';
            } else {
                agent.style.display = 'none';
            }
        }
    });
}