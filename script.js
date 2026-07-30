/**
 * Samico Vagas TI - Portal de Curadoria Exclusiva
 * Core JavaScript Logic: LocalStorage CRUD, Filtering, Modals & Share
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Curated Tech Jobs Data
    const defaultJobs = [
        {
            id: "job-1",
            title: "Desenvolvedor Full Stack React/Node Sênior",
            company: "TechCorp Solutions",
            model: "Remoto",
            level: "Sênior",
            contractType: "PJ",
            technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
            description: "Buscamos uma pessoa Desenvolvedora Full Stack Sênior para liderar o desenvolvimento de nossa nova plataforma SaaS de alta performance. Você atuará definindo arquitetura, mentorando desenvolvedores mais juniores e garantindo entregas escaláveis.",
            requirements: [
                "Experiência sólida com React (hooks, context API, gerenciamento de estado) e TypeScript.",
                "Experiência profunda em Node.js (Express, NestJS) e modelagem de bancos relacionais (PostgreSQL/MySQL).",
                "Familiaridade com arquiteturas de microsserviços e mensageria (RabbitMQ ou Kafka).",
                "Forte entendimento de boas práticas de código (Clean Code, SOLID, testes unitários)."
            ],
            desirable: [
                "Conhecimento em Docker, Kubernetes e práticas de CI/CD.",
                "Experiência prévia com provedores de nuvem (AWS ou GCP)."
            ],
            benefits: [
                "Horário flexível e 100% Home Office.",
                "Auxílio Home Office mensal.",
                "Apoio em cursos e certificações de tecnologia.",
                "Plano de desenvolvimento individualizado."
            ],
            salaryRange: "R$ 14.000 - R$ 18.000 / mês",
            applicationLink: "https://techcorp.example.com/vagas/sr-fullstack",
            companyEmail: "recrutamento@techcorp.example.com",
            companyWhatsapp: "11999998888",
            isVIP: true,
            createdAt: "2026-07-15T14:30:00Z"
        },
        {
            id: "job-2",
            title: "Desenvolvedor Frontend React Pleno",
            company: "Fintech Spark",
            model: "Híbrido",
            level: "Pleno",
            contractType: "CLT",
            technologies: ["React", "TypeScript", "Next.js", "Redux Toolkit", "Jest"],
            description: "A Spark está crescendo! Buscamos um Dev Frontend Pleno focado em criar experiências incríveis de checkout e dashboard financeiro. Se você ama interfaces limpas, componentização de ponta e acessibilidade, essa vaga é para você.",
            requirements: [
                "Pelo menos 3 anos de experiência em desenvolvimento frontend com React.",
                "Domínio de TypeScript e CSS-in-JS ou Tailwind CSS.",
                "Experiência integrando APIs RESTful seguras.",
                "Noções sólidas de performance web (Core Web Vitals) e acessibilidade (WCAG)."
            ],
            desirable: [
                "Experiência prévia no setor financeiro/fintech.",
                "Familiaridade com testes de integração e e2e (Cypress)."
            ],
            benefits: [
                "Vale Refeição / Vale Alimentação de R$ 900,00.",
                "Plano de Saúde e Odontológico Bradesco Premium.",
                "Bônus anual baseado em metas (PLR).",
                "Auxílio mobilidade/estacionamento para dias presenciais (São Paulo - Pinheiros)."
            ],
            salaryRange: "R$ 8.500 - R$ 11.000 / mês",
            applicationLink: "mailto:talentos@sparkfintech.example.com",
            companyEmail: "talentos@sparkfintech.example.com",
            companyWebsite: "https://sparkfintech.example.com/trabalhe-conosco",
            isVIP: false,
            createdAt: "2026-07-16T10:15:00Z"
        },
        {
            id: "job-3",
            title: "Engenheiro de Cloud & DevOps Sênior",
            company: "Matrix Solutions",
            model: "Remoto",
            level: "Sênior",
            contractType: "PJ",
            technologies: ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions"],
            description: "Estamos contratando um Engenheiro DevOps Sênior para nos apoiar na migração e orquestração de ambientes multi-regionais de grande escala. Você será responsável por automatizar e otimizar toda a nossa infraestrutura na nuvem.",
            requirements: [
                "Forte vivência em administração de nuvem AWS (EKS, RDS, VPC, IAM, CloudFront).",
                "Experiência prática avançada em Infrastructure as Code (IaC) com Terraform.",
                "Domínio de conteinerização e orquestração com Docker e Kubernetes.",
                "Criação e manutenção de pipelines CI/CD complexos (GitHub Actions, GitLab)."
            ],
            desirable: [
                "Certificação AWS Solutions Architect ou CKA (Certified Kubernetes Administrator).",
                "Conhecimento em estratégias de FinOps para otimização de custos."
            ],
            benefits: [
                "Contrato de longa duração com reajustes anuais de inflação.",
                "Acesso livre a plataformas de cursos (Udemy, Pluralsight).",
                "Equipamento topo de linha enviado para sua casa (MacBook Pro ou Dell XPS)."
            ],
            salaryRange: "R$ 16.000 - R$ 20.000 / mês",
            applicationLink: "https://matrix.example.com/careers/devops-sr",
            companyWhatsapp: "21988887777",
            companyWebsite: "https://matrix.example.com/careers/devops-sr",
            isVIP: true,
            createdAt: "2026-07-14T09:00:00Z"
        },
        {
            id: "job-4",
            title: "Desenvolvedor Mobile Flutter Júnior",
            company: "AppForge Studio",
            model: "Remoto",
            level: "Júnior",
            contractType: "CLT",
            technologies: ["Flutter", "Dart", "Git", "REST API", "Firebase"],
            description: "Buscamos um(a) desenvolvedor(a) júnior que queira acelerar sua carreira em desenvolvimento cross-platform. Você trabalhará diretamente com nossos líderes técnicos no desenvolvimento de apps elegantes de delivery e e-commerce.",
            requirements: [
                "Conhecimento teórico e prático básico em Flutter e Dart.",
                "Familiaridade com versionamento de código usando Git/GitHub.",
                "Compreensão de consumo de APIs JSON/REST.",
                "Disposição para aprender novas arquiteturas de gerência de estado (Bloc, Provider, etc.)."
            ],
            desirable: [
                "Aplicativo publicado de portfólio no Google Play ou App Store.",
                "Noções de persistência local (SQLite, Hive, Isar)."
            ],
            benefits: [
                "Gympass / Totalpass.",
                "Plano de Saúde SulAmérica.",
                "Sessões de mentoria técnica semanal.",
                "Curso de inglês corporativo custeado pela empresa."
            ],
            salaryRange: "R$ 4.000 - R$ 5.500 / mês",
            applicationLink: "mailto:vagas@appforge.example.com?subject=Vaga%20Flutter%20Junior",
            companyEmail: "vagas@appforge.example.com",
            companyWhatsapp: "11977776666",
            isVIP: false,
            createdAt: "2026-07-16T15:00:00Z"
        },
        {
            id: "job-5",
            title: "Especialista em Segurança da Informação (DevSecOps)",
            company: "CyberShield Sec",
            model: "Remoto",
            level: "Specialist",
            contractType: "PJ",
            technologies: ["OWASP", "SAST/DAST", "Python", "Docker Security", "SIEM"],
            description: "Procuramos um Especialista em Segurança focado em ciclo de desenvolvimento seguro para auditar, desenhar processos de DevSecOps e implementar controles rigorosos de vazamento de dados e conformidade (LGPD).",
            requirements: [
                "Experiência sênior/especialista na área de segurança ofensiva ou defensiva em ambientes cloud.",
                "Domínio do OWASP Top 10 e modelagem de ameaças.",
                "Experiência em implementar ferramentas de análise estática e dinâmica (SAST/DAST) em pipelines de CI/CD.",
                "Conhecimento profundo em segurança de containers e infraestrutura imutável."
            ],
            desirable: [
                "Certificações renomadas (como OSCP, CISSP, CEH, ou AWS Security).",
                "Capacidade de automação de testes de segurança com Python/Go."
            ],
            benefits: [
                "Participação nos lucros semestral (Bônus).",
                "Auxílio saúde complementar.",
                "Orçamento anual de US$ 1.500 para congressos e eventos internacionais de segurança."
            ],
            salaryRange: "R$ 18.000 - R$ 24.000 / mês",
            applicationLink: "https://cybershield.example.com/apply/sec-specialist",
            companyEmail: "recrutamento@cybershield.example.com",
            isVIP: true,
            createdAt: "2026-07-13T11:45:00Z"
        }
    ];

    // 2. State & Database Initialization
    const STORAGE_KEY = 'samico_vagas_ti_db';
    let jobs = loadJobsFromStorage();
    let isAdmin = false;
    let selectedJobForApply = null;

    function loadJobsFromStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try { 
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) { console.error(e); }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultJobs));
        return defaultJobs;
    }

    function saveJobsToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }

    // 3. Filter Controls Elements
    const searchInput = document.getElementById('search-input');
    const btnClearSearch = document.getElementById('btn-clear-search');
    const levelPills = document.querySelectorAll('#filter-level .pill-btn');
    const modelPills = document.querySelectorAll('#filter-model .pill-btn');
    const vipCheckbox = document.getElementById('filter-vip-only');
    const resultsCount = document.getElementById('results-count');
    const jobsContainer = document.getElementById('jobs-container');
    const adminLoggedBadge = document.getElementById('admin-logged-badge');

    let currentLevel = 'all';
    let currentModel = 'all';

    // 4. Toast Notification
    function showToast(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    // 5. Render Job Cards Grid
    function renderJobs() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const vipOnly = vipCheckbox.checked;

        const filtered = jobs.filter(job => {
            // Level Filter
            if (currentLevel !== 'all' && job.level !== currentLevel) return false;
            // Model Filter
            if (currentModel !== 'all' && job.model !== currentModel) return false;
            // VIP Filter
            if (vipOnly && !job.isVIP) return false;

            // Search Term Filter
            if (searchTerm) {
                const matchTitle = job.title.toLowerCase().includes(searchTerm);
                const matchCompany = job.company.toLowerCase().includes(searchTerm);
                const matchTechs = job.technologies.some(t => t.toLowerCase().includes(searchTerm));
                if (!matchTitle && !matchCompany && !matchTechs) return false;
            }
            return true;
        });

        // Sort: VIP jobs first, then by date
        filtered.sort((a, b) => {
            if (a.isVIP && !b.isVIP) return -1;
            if (!a.isVIP && b.isVIP) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        resultsCount.textContent = filtered.length;
        jobsContainer.innerHTML = '';

        if (filtered.length === 0) {
            jobsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: rgba(15, 23, 42, 0.5); border-radius: 20px; border: 1px solid var(--border-color);">
                    <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔍</span>
                    <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Nenhuma vaga encontrada</h3>
                    <p style="color: var(--text-muted);">Tente ajustar os filtros ou os termos da busca.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = `job-card ${job.isVIP ? 'is-vip' : ''}`;
            
            const techPillsHtml = job.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('');
            
            const modelClass = job.model === 'Remoto' ? 'tag-remote' : job.model === 'Híbrido' ? 'tag-hybrid' : '';

            card.innerHTML = `
                <div class="card-top">
                    <span class="company-name">${job.company}</span>
                    ${job.isVIP ? '<span class="vip-badge-pill">⭐ VAGA VIP</span>' : ''}
                </div>
                <h3 class="job-title">${job.title}</h3>
                <div class="job-meta">
                    <span class="meta-tag ${modelClass}">${job.model === 'Remoto' ? '🏡 Remoto' : job.model === 'Híbrido' ? '🏢 Híbrido' : '📍 Presencial'}</span>
                    <span class="meta-tag">${job.level}</span>
                    <span class="meta-tag ${job.contractType === 'PJ' ? 'tag-pj' : ''}">${job.contractType}</span>
                </div>
                <p class="job-desc">${job.description}</p>
                <div class="tech-stack">${techPillsHtml}</div>
                <div class="card-bottom">
                    <span class="salary-val">${job.salaryRange || 'A combinar'}</span>
                    <div class="card-actions">
                        ${isAdmin ? `
                            <button class="btn btn-secondary btn-icon btn-edit-job" data-id="${job.id}" title="Editar Vaga">✏️</button>
                            <button class="btn btn-danger btn-icon btn-del-job" data-id="${job.id}" title="Excluir Vaga">🗑️</button>
                        ` : ''}
                        <button class="btn btn-secondary btn-view-job" data-id="${job.id}">Detalhes</button>
                        <button class="btn btn-primary btn-apply-job" data-id="${job.id}">Candidatar-se</button>
                    </div>
                </div>
            `;

            // Card Button Events
            card.querySelector('.btn-view-job').addEventListener('click', () => openJobDetailsModal(job.id));
            card.querySelector('.btn-apply-job').addEventListener('click', () => openApplyModal(job.id));

            if (isAdmin) {
                const editBtn = card.querySelector('.btn-edit-job');
                const delBtn = card.querySelector('.btn-del-job');
                if (editBtn) editBtn.addEventListener('click', () => openJobEditorModal(job.id));
                if (delBtn) delBtn.addEventListener('click', () => deleteJob(job.id));
            }

            jobsContainer.appendChild(card);
        });
    }

    // 6. Filter Event Listeners
    searchInput.addEventListener('input', renderJobs);
    btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        renderJobs();
    });

    levelPills.forEach(btn => {
        btn.addEventListener('click', () => {
            levelPills.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLevel = btn.getAttribute('data-val');
            renderJobs();
        });
    });

    modelPills.forEach(btn => {
        btn.addEventListener('click', () => {
            modelPills.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentModel = btn.getAttribute('data-val');
            renderJobs();
        });
    });

    vipCheckbox.addEventListener('change', renderJobs);

    // 7. Modal 1: Job Details Renderer
    const modalDetails = document.getElementById('modal-details');
    const mdClose = document.getElementById('md-close');
    const mdTitle = document.getElementById('md-title');
    const mdCompany = document.getElementById('md-company');
    const mdBody = document.getElementById('md-body-content');
    const mdShareBtn = document.getElementById('md-share-btn');
    const mdApplyBtn = document.getElementById('md-apply-btn');

    let currentModalJobId = null;

    function openJobDetailsModal(id) {
        const job = jobs.find(j => j.id === id);
        if (!job) return;
        currentModalJobId = id;

        mdCompany.textContent = job.company;
        mdTitle.textContent = job.title;

        const reqsHtml = (job.requirements || []).map(r => `<li>${r}</li>`).join('');
        const desHtml = (job.desirable || []).map(d => `<li>${d}</li>`).join('');
        const benHtml = (job.benefits || []).map(b => `<li>${b}</li>`).join('');

        mdBody.innerHTML = `
            <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                <span class="meta-tag tag-remote">${job.model}</span>
                <span class="meta-tag">${job.level}</span>
                <span class="meta-tag tag-pj">${job.contractType}</span>
                <span class="salary-val" style="margin-left: auto;">${job.salaryRange || 'A combinar'}</span>
            </div>

            <div class="detail-section">
                <h4>📝 Sobre a Posição</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${job.description}</p>
            </div>

            <div class="detail-section">
                <h4>🛠️ Principais Tecnologias</h4>
                <div class="tech-stack">${job.technologies.map(t => `<span class="tech-pill" style="font-size: 0.8rem; padding: 0.3rem 0.7rem;">${t}</span>`).join('')}</div>
            </div>

            ${reqsHtml ? `
                <div class="detail-section">
                    <h4>📌 Requisitos Obrigatórios</h4>
                    <ul class="detail-list">${reqsHtml}</ul>
                </div>
            ` : ''}

            ${desHtml ? `
                <div class="detail-section">
                    <h4>⭐ Desejáveis / Diferenciais</h4>
                    <ul class="detail-list desirable">${desHtml}</ul>
                </div>
            ` : ''}

            ${benHtml ? `
                <div class="detail-section">
                    <h4>🎁 Benefícios</h4>
                    <ul class="detail-list benefits">${benHtml}</ul>
                </div>
            ` : ''}
        `;

        modalDetails.classList.add('active');
    }

    if (mdClose) mdClose.addEventListener('click', () => modalDetails.classList.remove('active'));

    if (mdShareBtn) {
        mdShareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link da vaga copiado para a área de transferência! 🔗');
        });
    }

    if (mdApplyBtn) {
        mdApplyBtn.addEventListener('click', () => {
            modalDetails.classList.remove('active');
            openApplyModal(currentModalJobId);
        });
    }

    // 8. Modal 2: Apply / Contact Renderer
    const modalApply = document.getElementById('modal-apply');
    const maClose = document.getElementById('ma-close');
    const maOptions = document.getElementById('ma-options');

    function openApplyModal(id) {
        const job = jobs.find(j => j.id === id);
        if (!job) return;
        selectedJobForApply = job;

        maOptions.innerHTML = '';

        if (job.applicationLink) {
            maOptions.innerHTML += `
                <a href="${job.applicationLink}" target="_blank" class="apply-btn-option">
                    <span>🌐 Página de Carreiras / Site da Empresa</span>
                    <span>Acessar ➔</span>
                </a>
            `;
        }

        // Exclusividade WhatsApp: Apenas Vagas VIP possuem acesso ao canal direto de WhatsApp da empresa
        if (job.companyWhatsapp) {
            if (job.isVIP) {
                const cleanWa = job.companyWhatsapp.replace(/\D/g, '');
                const waText = encodeURIComponent(`Olá! Gostaria de me candidatar à vaga de "${job.title}" divulgada na Samico Vagas TI.`);
                maOptions.innerHTML += `
                    <a href="https://wa.me/55${cleanWa}?text=${waText}" target="_blank" class="apply-btn-option opt-whatsapp">
                        <span>💬 Falar no WhatsApp da Empresa (${job.companyWhatsapp})</span>
                        <span>Enviar Mensagem ➔</span>
                    </a>
                `;
            } else {
                maOptions.innerHTML += `
                    <div class="apply-btn-option opt-whatsapp-locked" title="Contato por WhatsApp exclusivo para vagas VIP">
                        <span>🔒 WhatsApp da Empresa (${job.companyWhatsapp})</span>
                        <span class="vip-only-badge">⭐ Exclusivo Vagas VIP</span>
                    </div>
                `;
            }
        }

        if (job.companyEmail) {
            const mailSubject = encodeURIComponent(`Candidatura: ${job.title} - Samico Vagas TI`);
            maOptions.innerHTML += `
                <a href="mailto:${job.companyEmail}?subject=${mailSubject}" class="apply-btn-option">
                    <span>✉️ E-mail para Envio de Currículo (${job.companyEmail})</span>
                    <span>Enviar E-mail ➔</span>
                </a>
            `;
        }

        modalApply.classList.add('active');
    }

    if (maClose) maClose.addEventListener('click', () => modalApply.classList.remove('active'));

    // 9. Admin Auth Modal
    const modalAdminAuth = document.getElementById('modal-admin-auth');
    const btnAdminPanel = document.getElementById('btn-admin-panel');
    const authClose = document.getElementById('auth-close');
    const authCancel = document.getElementById('auth-cancel');
    const authSubmit = document.getElementById('auth-submit');
    const authPassword = document.getElementById('auth-password');

    btnAdminPanel.addEventListener('click', () => {
        if (isAdmin) {
            openJobEditorModal(); // Create new job directly
        } else {
            modalAdminAuth.classList.add('active');
        }
    });

    if (authClose) authClose.addEventListener('click', () => modalAdminAuth.classList.remove('active'));
    if (authCancel) authCancel.addEventListener('click', () => modalAdminAuth.classList.remove('active'));

    authSubmit.addEventListener('click', () => {
        const pass = authPassword.value.trim();
        if (pass === 'admin123' || pass === 'samico') {
            isAdmin = true;
            modalAdminAuth.classList.remove('active');
            adminLoggedBadge.classList.remove('hidden');
            showToast('Modo Administrador Ativado com Sucesso! 🔑');
            renderJobs();
            openJobEditorModal();
        } else {
            alert('Senha incorreta! Use a senha padrão: admin123');
        }
    });

    // 10. Modal 4: Admin Create / Edit Job Form
    const modalJobForm = document.getElementById('modal-job-form');
    const formClose = document.getElementById('form-close');
    const formCancel = document.getElementById('form-cancel');
    const jobEditorForm = document.getElementById('job-editor-form');
    const formModalTitle = document.getElementById('form-modal-title');

    function openJobEditorModal(jobId = null) {
        if (!isAdmin) return;
        jobEditorForm.reset();

        if (jobId) {
            const job = jobs.find(j => j.id === jobId);
            if (job) {
                formModalTitle.textContent = 'Editar Vaga Curada';
                document.getElementById('form-job-id').value = job.id;
                document.getElementById('form-title').value = job.title;
                document.getElementById('form-company').value = job.company;
                document.getElementById('form-model').value = job.model;
                document.getElementById('form-level').value = job.level;
                document.getElementById('form-contract').value = job.contractType;
                document.getElementById('form-salary').value = job.salaryRange || '';
                document.getElementById('form-techs').value = (job.technologies || []).join(', ');
                document.getElementById('form-desc').value = job.description;
                document.getElementById('form-reqs').value = (job.requirements || []).join('\n');
                document.getElementById('form-desirable').value = (job.desirable || []).join('\n');
                document.getElementById('form-benefits').value = (job.benefits || []).join('\n');
                document.getElementById('form-link').value = job.applicationLink || '';
                document.getElementById('form-email').value = job.companyEmail || '';
                document.getElementById('form-whatsapp').value = job.companyWhatsapp || '';
                document.getElementById('form-is-vip').checked = !!job.isVIP;
            }
        } else {
            formModalTitle.textContent = 'Curar Nova Vaga TI';
            document.getElementById('form-job-id').value = '';
        }

        modalJobForm.classList.add('active');
    }

    if (formClose) formClose.addEventListener('click', () => modalJobForm.classList.remove('active'));
    if (formCancel) formCancel.addEventListener('click', () => modalJobForm.classList.remove('active'));

    jobEditorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idVal = document.getElementById('form-job-id').value;

        const newJob = {
            id: idVal || `job-${Date.now()}`,
            title: document.getElementById('form-title').value.trim(),
            company: document.getElementById('form-company').value.trim(),
            model: document.getElementById('form-model').value,
            level: document.getElementById('form-level').value,
            contractType: document.getElementById('form-contract').value,
            salaryRange: document.getElementById('form-salary').value.trim(),
            technologies: document.getElementById('form-techs').value.split(',').map(t => t.trim()).filter(Boolean),
            description: document.getElementById('form-desc').value.trim(),
            requirements: document.getElementById('form-reqs').value.split('\n').map(r => r.trim()).filter(Boolean),
            desirable: document.getElementById('form-desirable').value.split('\n').map(d => d.trim()).filter(Boolean),
            benefits: document.getElementById('form-benefits').value.split('\n').map(b => b.trim()).filter(Boolean),
            applicationLink: document.getElementById('form-link').value.trim(),
            companyEmail: document.getElementById('form-email').value.trim(),
            companyWhatsapp: document.getElementById('form-whatsapp').value.trim(),
            isVIP: document.getElementById('form-is-vip').checked,
            createdAt: new Date().toISOString()
        };

        if (idVal) {
            const index = jobs.findIndex(j => j.id === idVal);
            if (index !== -1) jobs[index] = newJob;
            showToast('Vaga atualizada com sucesso! ✏️');
        } else {
            jobs.unshift(newJob);
            showToast('Nova vaga curada e publicada com sucesso! 🚀');
        }

        saveJobsToStorage();
        renderJobs();
        modalJobForm.classList.remove('active');
    });

    // 11. Delete Job
    function deleteJob(id) {
        if (!confirm('Tem certeza de que deseja excluir esta vaga do portal?')) return;
        jobs = jobs.filter(j => j.id !== id);
        saveJobsToStorage();
        renderJobs();
        showToast('Vaga removida da lista. 🗑️');
    }

    // 12. Reset Database Button
    const btnResetDb = document.getElementById('btn-reset-db');
    if (btnResetDb) {
        btnResetDb.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja resetar para as vagas curadas iniciais?')) {
                localStorage.removeItem(STORAGE_KEY);
                jobs = loadJobsFromStorage();
                renderJobs();
                showToast('Base de vagas resetada para os padrões. 🔄');
            }
        });
    }

    // 13. Sponsor Modal Listeners
    const btnBecomeSponsor = document.getElementById('btn-become-sponsor');
    const modalSponsor = document.getElementById('modal-sponsor');
    const sponsorClose = document.getElementById('sponsor-close');

    if (btnBecomeSponsor && modalSponsor) {
        btnBecomeSponsor.addEventListener('click', () => {
            modalSponsor.classList.add('active');
        });
    }

    if (sponsorClose && modalSponsor) {
        sponsorClose.addEventListener('click', () => {
            modalSponsor.classList.remove('active');
        });
    }

    // 14. Automated Sponsors Carousel (3 Banners Alternando)
    const slides = document.querySelectorAll('#sponsors-carousel .carousel-slide');
    const dots = document.querySelectorAll('#sponsors-carousel .dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const carouselWrapper = document.getElementById('sponsors-carousel');

    let currentSlide = 0;
    let carouselInterval = null;

    function goToSlide(index) {
        if (slides.length === 0) return;
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        if (slides.length === 0) return;
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        if (slides.length === 0) return;
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    function startCarousel() {
        stopCarousel();
        carouselInterval = setInterval(nextSlide, 4500); // Troca automática a cada 4.5 segundos
    }

    function stopCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startCarousel(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startCarousel(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    goToSlide(idx);
                    startCarousel();
                }
            });
        });

        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopCarousel);
            carouselWrapper.addEventListener('mouseleave', startCarousel);
        }

        startCarousel();
    }

    // Initial Load Render
    renderJobs();
});
