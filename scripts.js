// scripts.js
// Lógica de navegação entre seções (telas) e controle do modal de projeto

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.navegacao a[data-target]');
    const secoes = document.querySelectorAll('.secao');
    const projetos = document.querySelectorAll('.projeto');

    function mostrarSecao(id) {
        secoes.forEach(s => {
            if (s.id === id) {
                s.classList.add('active');
                s.setAttribute('aria-hidden', 'false');
            } else {
                s.classList.remove('active');
                s.setAttribute('aria-hidden', 'true');
            }
        });
        // role: bring into view
        const alvo = document.getElementById(id);
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            if (target) mostrarSecao(target);
        });
    });

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalGithub = document.getElementById('modalGithub');
    const modalDemo = document.getElementById('modalDemo');
    const modalDemoWrap = document.getElementById('modalDemoWrap');
    const fecharModal = document.getElementById('fecharModal');

    function abrirModal(info) {
        modalTitle.textContent = info.title || 'Projeto';
        modalDesc.textContent = info.desc || '';
        modalTech.textContent = info.tech || '';
        if (info.github) {
            modalGithub.href = info.github;
            modalGithub.classList.remove('hidden');
        } else {
            modalGithub.classList.add('hidden');
        }
        if (info.demo) {
            modalDemo.href = info.demo;
            modalDemoWrap.classList.remove('hidden');
        } else {
            modalDemoWrap.classList.add('hidden');
        }

        modalOverlay.classList.remove('hidden');
        modalOverlay.setAttribute('aria-hidden', 'false');
        // foco no botão fechar para acessibilidade
        fecharModal.focus();
    }

    function fechar() {
        modalOverlay.classList.add('hidden');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    projetos.forEach(p => {
        p.addEventListener('click', () => {
            const info = {
                title: p.dataset.title,
                desc: p.dataset.desc,
                tech: p.dataset.tech,
                github: p.dataset.github,
                demo: p.dataset.demo
            };
            abrirModal(info);
        });
        // permitir abrir com Enter quando focado
        p.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                p.click();
            }
        });
    });

    fecharModal.addEventListener('click', fechar);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) fechar();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fechar();
    });
});
