document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }, 400); // 400ms delay to let the toggle animation finish
            });
        }
    }

    // Theme Toggle Logic
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Scroll Animation Logic (Fade In)
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            // Add visible class if element is in viewport
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Run on load
    fadeInOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', fadeInOnScroll);

    // Initialize Interactive Java Terminal Console
    initTerminalConsole();
});

/* ==========================================================================
   Interactive Java Backend Terminal Console
   ========================================================================== */
function initTerminalConsole() {
    const termInput = document.getElementById('termInput');
    const termHistory = document.getElementById('termHistory');
    const termBody = document.getElementById('terminalBody');
    const cmdButtons = document.querySelectorAll('.cmd-btn');

    if (!termInput || !termHistory) return;

    // Focus input when clicking inside terminal body
    termBody.addEventListener('click', (e) => {
        if (!e.target.classList.contains('cmd-btn')) {
            termInput.focus();
        }
    });

    // Handle button clicks
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            simulateTypingCommand(cmd);
        });
    });

    // Handle Enter key on input
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim();
            if (cmd) {
                processCommand(cmd);
                termInput.value = '';
            }
        }
    });

    function simulateTypingCommand(cmd) {
        termInput.value = '';
        let i = 0;
        const typeSpeed = 35;
        function typeChar() {
            if (i < cmd.length) {
                termInput.value += cmd.charAt(i);
                i++;
                setTimeout(typeChar, typeSpeed);
            } else {
                setTimeout(() => {
                    processCommand(cmd);
                    termInput.value = '';
                }, 200);
            }
        }
        typeChar();
    }

    function processCommand(rawCmd) {
        const cmd = rawCmd.toLowerCase().trim();
        appendInputLine(rawCmd);

        switch (cmd) {
            case 'help':
                appendOutput(`
                    <strong style="color:#38bdf8;">Available Commands:</strong><br>
                    <span class="term-cmd">skills</span>   - Displays Java & Backend technical competency tree<br>
                    <span class="term-cmd">projects</span> - Lists software architecture & e-commerce applications<br>
                    <span class="term-cmd">api -test</span> - Simulates a real-time Spring Boot REST API GET request<br>
                    <span class="term-cmd">resume</span>   - Displays resume summary and download link<br>
                    <span class="term-cmd">contact</span>  - Outputs direct email and phone contact details<br>
                    <span class="term-cmd">clear</span>    - Clears console output history
                `);
                break;

            case 'skills':
                appendOutput(`
                    <strong style="color:#10b981;">[TECHNICAL SKILLS]</strong><br>
                    ☕ <strong style="color:#38bdf8;">Languages:</strong> Java, JavaScript, SQL, HTML/CSS<br>
                    🍃 <strong style="color:#10b981;">Frameworks:</strong> Spring Boot<br>
                    🐘 <strong style="color:#f59e0b;">Databases:</strong> PostgreSQL<br>
                    ⚡ <strong style="color:#818cf8;">Tools:</strong> Git, IntelliJ, Postman
                `);
                break;

            case 'projects':
                appendOutput(`
                    <strong style="color:#818cf8;">[FEATURED SOFTWARE ARCHITECTURES]</strong><br>
                    1. <strong>AI-Powered Software Architecture Generator</strong> (Full Stack Java/Spring Boot + AI)<br>
                       &nbsp;&nbsp;↳ <a href="https://project-idea-generator-bvbt.onrender.com/" target="_blank" style="color:#38bdf8;text-decoration:underline;">https://project-idea-generator-bvbt.onrender.com/</a><br>
                    2. <strong>AJ Shop – Enterprise E-Commerce Backend</strong> (Spring Boot, PostgreSQL, JWT Auth)<br>
                       &nbsp;&nbsp;↳ <a href="https://github.com/vijayakumardevforge" target="_blank" style="color:#38bdf8;text-decoration:underline;">View on GitHub Repository</a>
                `);
                break;

            case 'api -test':
            case 'api':
                appendOutput(`<span style="color:#f59e0b;"><i class="fas fa-spinner fa-spin"></i> Initializing Spring Boot DispatcherServlet... Sending GET request to /api/v1/developer/vijayakumar</span>`);
                setTimeout(() => {
                    appendOutput(`
                        <strong style="color:#10b981;">HTTP/1.1 200 OK</strong> [Time: 18ms | Content-Type: application/json]<br>
                        {<br>
                        &nbsp;&nbsp;<span style="color:#38bdf8;">"name"</span>: <span style="color:#a3e635;">"Vijayakumar M"</span>,<br>
                        &nbsp;&nbsp;<span style="color:#38bdf8;">"role"</span>: <span style="color:#a3e635;">"Java Backend Developer Intern / Trainee"</span>,<br>
                        &nbsp;&nbsp;<span style="color:#38bdf8;">"status"</span>: <span style="color:#10b981;">"READY_FOR_IMMEDIATE_HIRE"</span>,<br>
                        &nbsp;&nbsp;<span style="color:#38bdf8;">"core_engine"</span>: <span style="color:#a3e635;">"Spring Boot 3.x + PostgreSQL"</span>,<br>
                        &nbsp;&nbsp;<span style="color:#38bdf8;">"passion_level"</span>: <span style="color:#f59e0b;">100</span><br>
                        }
                    `);
                }, 600);
                break;

            case 'resume':
                appendOutput(`
                    <strong style="color:#38bdf8;">[VIJAYAKUMAR M - RESUME SUMMARY]</strong><br>
                    • Bachelor of Science in Computer Science (2023–2026) @ Rajapalayam Rajus' College<br>
                    • Micro-Internship in Web Development @ Anjana Infotech (May 2025)<br>
                    • Certifications: Microsoft AI Fest 2026, LearnTube Java Mastery, Infosys Spring Boot<br>
                    &nbsp;&nbsp;↳ <a href="assets/resume.pdf" download style="color:#10b981;font-weight:bold;text-decoration:underline;"><i class="fas fa-download"></i> Click Here to Download Full PDF Resume</a>
                `);
                break;

            case 'contact':
                appendOutput(`
                    <strong style="color:#10b981;">[DIRECT CONTACT CHANNELS]</strong><br>
                    📧 Email: <a href="mailto:vijayakumardevforge@gmail.com" style="color:#38bdf8;text-decoration:underline;">vijayakumardevforge@gmail.com</a><br>
                    📞 Phone / WhatsApp: <a href="tel:+919171315131" style="color:#38bdf8;text-decoration:underline;">+91 9171315131</a><br>
                    🔗 LinkedIn: <a href="https://www.linkedin.com/in/vijayakumardevforge/" target="_blank" style="color:#38bdf8;text-decoration:underline;">linkedin.com/in/vijayakumardevforge</a>
                `);
                break;

            case 'clear':
                termHistory.innerHTML = '';
                return;

            default:
                appendOutput(`<span style="color:#ef4444;">Command not recognized: '${rawCmd}'. Type <strong style="color:#f59e0b;">help</strong> to see available commands.</span>`);
                break;
        }
    }

    function appendInputLine(cmdText) {
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-prompt">vijay@dev-forge:~$</span> <span class="term-typed">${cmdText}</span>`;
        termHistory.appendChild(line);
        scrollToBottom();
    }

    function appendOutput(htmlContent) {
        const line = document.createElement('div');
        line.className = 'term-line term-output';
        line.innerHTML = htmlContent;
        termHistory.appendChild(line);
        scrollToBottom();
    }

    function scrollToBottom() {
        termBody.scrollTop = termBody.scrollHeight;
    }
}
