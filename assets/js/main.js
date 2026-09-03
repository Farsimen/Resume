// ========================================
// Main Resume Application Logic
// ========================================

class ResumeApp {
    constructor() {
        this.currentLanguage = this.getInitialLanguage();
        this.resumeData = {};
        this.init();
    }

    getInitialLanguage() {
        // Check URL parameter
        const params = new URLSearchParams(window.location.search);
        if (params.has('lang')) {
            return params.get('lang');
        }
        
        // Check localStorage
        const saved = localStorage.getItem('resumeLanguage');
        if (saved) {
            return saved;
        }
        
        // Default
        return 'en';
    }

    async init() {
        await this.loadResumeData();
        this.setupEventListeners();
        this.renderResume();
    }

    async loadResumeData() {
        try {
            const response = await fetch(`../data/resume-${this.currentLanguage}.json`);
            if (!response.ok) throw new Error('Failed to load resume data');
            this.resumeData = await response.json();
        } catch (error) {
            console.error('Error loading resume data:', error);
            // Fallback to English
            if (this.currentLanguage !== 'en') {
                this.currentLanguage = 'en';
                await this.loadResumeData();
            }
        }
    }

    setupEventListeners() {
        // Language switcher buttons
        const langButtons = document.querySelectorAll('.language-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Theme toggle
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            const savedTheme = localStorage.getItem('resumeTheme') || 'light';
            this.applyTheme(savedTheme);
            themeBtn.addEventListener('click', () => {
                const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
                this.applyTheme(nextTheme);
            });
        }

        // Export buttons
        const pdfBtn = document.getElementById('exportPdf');
        const printBtn = document.getElementById('printResume');
        
        if (pdfBtn) {
            pdfBtn.addEventListener('click', () => this.exportPDF());
        }
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printResume());
        }
    }

    applyTheme(theme) {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        const isDark = theme === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        localStorage.setItem('resumeTheme', theme);

        if (isDark) {
            themeBtn.textContent = '🌙 Dark';
            themeBtn.classList.add('active');
            themeBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeBtn.textContent = '☀️ Light';
            themeBtn.classList.remove('active');
            themeBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('resumeLanguage', lang);
        
        // Update URL
        window.history.pushState({}, '', `?lang=${lang}`);
        
        // Update active button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Reload and render
        this.loadResumeData().then(() => {
            this.renderResume();
        });
    }

    renderResume() {
        const data = this.resumeData;
        
        // Set document direction
        document.documentElement.dir = data.rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = data.language;
        
        // Update page title
        document.title = `${data.personal.name} - Resume`;
        
        // Render header
        this.renderHeader();
        
        // Render toolbar
        this.renderToolbar();
        
        // Render content
        this.renderContent();
        
        // Render footer
        this.renderFooter();
    }

    renderHeader() {
        const data = this.resumeData;
        const header = document.querySelector('.header');
        
        if (!header) {
            const headerEl = document.createElement('div');
            headerEl.className = 'header';
            document.querySelector('.container').insertBefore(headerEl, document.querySelector('.content'));
        }
        
        const headerEl = document.querySelector('.header');
        headerEl.innerHTML = `
            <h1>${data.personal.name}</h1>
            <div class="title">${data.personal.title}</div>
            <div class="contact-info">
                <div class="contact-item">
                    📧 <a href="mailto:${data.personal.email}">${data.personal.email}</a>
                </div>
                <div class="contact-item">
                    📱 <a href="tel:${data.personal.phone}">${data.personal.phone}</a>
                </div>
                <div class="contact-item">
                    📍 ${data.personal.location}
                </div>
                <div class="contact-item">
                    🔗 <a href="${data.personal.linkedin}" target="_blank">LinkedIn</a>
                </div>
            </div>
        `;
    }

    renderToolbar() {
        const toolbar = document.querySelector('.toolbar');
        const data = this.resumeData;
        
        if (toolbar) {
            const activeLang = toolbar.querySelector(`.language-btn[data-lang="${data.language}"]`);
            if (activeLang) {
                toolbar.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
                activeLang.classList.add('active');
            }
        }
    }

    renderContent() {
        const content = document.querySelector('.content');
        const data = this.resumeData;
        
        content.innerHTML = `
            <!-- Professional Summary -->
            ${this.renderSection('summary')}
            
            <!-- Core Competencies -->
            ${this.renderSection('coreCompetencies')}
            
            <!-- Professional Experience -->
            ${this.renderSection('experience')}
            
            <!-- Entrepreneurial Ventures -->
            ${this.renderSection('entrepreneurship')}
            
            <!-- Education -->
            ${this.renderSection('education')}
            
            <!-- Skills -->
            ${this.renderSection('skills')}
            
            <!-- Personality Profile -->
            ${this.renderSection('personalityProfile')}
        `;
    }

    renderSection(sectionName) {
        const data = this.resumeData;
        const section = data[sectionName];
        
        if (!section) return '';
        
        switch (sectionName) {
            case 'summary':
                return this.renderSummary(section);
            case 'coreCompetencies':
                return this.renderCoreCompetencies(section);
            case 'experience':
                return this.renderExperience(section);
            case 'entrepreneurship':
                return this.renderEntrepreneurship(section);
            case 'education':
                return this.renderEducation(section);
            case 'skills':
                return this.renderSkills(section);
            case 'personalityProfile':
                return this.renderPersonality(section);
            default:
                return '';
        }
    }

    renderSummary(summary) {
        return `
            <div class="section">
                <div class="section-title">${summary.title}</div>
                <div class="summary-text">${summary.text}</div>
            </div>
        `;
    }

    renderCoreCompetencies(competencies) {
        const skillsList = competencies.skills.map(skill => 
            `<div class="skill-item">${skill}</div>`
        ).join('');
        
        return `
            <div class="section">
                <div class="section-title">${competencies.title}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${skillsList}
                </div>
            </div>
        `;
    }

    renderExperience(experience) {
        const positions = experience.positions.map(job => `
            <div class="job-entry">
                <div class="job-header">
                    <div>
                        <div class="job-title">${job.title}</div>
                        <div class="job-company">${job.company}</div>
                    </div>
                    <div class="job-period">${job.period}</div>
                </div>
                <div class="job-meta">
                    <span class="job-location">${job.location}</span>
                </div>
                <ul class="job-highlights">
                    ${job.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        
        return `
            <div class="section">
                <div class="section-title">${experience.title}</div>
                ${positions}
            </div>
        `;
    }

    renderEntrepreneurship(entrepreneurship) {
        const projects = entrepreneurship.projects.map(project => `
            <div class="project-entry">
                <div class="job-title">${project.name}</div>
                <div class="job-period">${project.period}</div>
                <p><strong>${project.description}</strong></p>
                <ul class="job-highlights">
                    ${project.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        
        return `
            <div class="section">
                <div class="section-title">${entrepreneurship.title}</div>
                ${projects}
            </div>
        `;
    }

    renderEducation(education) {
        const degrees = education.degrees.map(degree => `
            <div class="education-entry">
                <div class="job-title">${degree.degree} - ${degree.field}</div>
                <div class="job-company">${degree.institution}</div>
                <div class="job-meta">
                    <span>${degree.year}</span>
                    <span>GPA: ${degree.gpa}</span>
                </div>
            </div>
        `).join('');
        
        const certifications = education.certifications.map(cert => `
            <div class="education-entry">
                <div class="job-title">${cert.name}</div>
                <div class="job-company">${cert.issuer}</div>
                <div class="job-meta">
                    <span>${cert.year}</span>
                    <span>${cert.duration}</span>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="section">
                <div class="section-title">${education.title}</div>
                ${degrees}
                ${certifications}
            </div>
        `;
    }

    renderSkills(skills) {
        const categories = skills.categories.map(cat => `
            <div class="skill-category">
                <div class="skill-category-title">${cat.category}</div>
                <div>
                    ${cat.items.map(item => `<div class="skill-item">${item}</div>`).join('')}
                </div>
            </div>
        `).join('');
        
        return `
            <div class="section">
                <div class="section-title">${skills.title}</div>
                <div class="skills-container">
                    ${categories}
                </div>
            </div>
        `;
    }

    renderPersonality(personality) {
        return `
            <div class="section">
                <div class="section-title">${personality.title}</div>
                <div class="personality-info">
                    <div class="personality-assessment">📊 ${personality.assessment}</div>
                </div>
                <div class="summary-text">${personality.text}</div>
            </div>
        `;
    }

    renderFooter() {
        let footer = document.querySelector('.footer');
        if (!footer) {
            footer = document.createElement('div');
            footer.className = 'footer';
            document.querySelector('.container').appendChild(footer);
        }
        
        const year = new Date().getFullYear();
        const name = this.resumeData.personal.name;
        const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
        const photo = this.resumeData.personal.photo;
        footer.innerHTML = `
            <div class="footer-profile" aria-label="Profile photo placeholder">
                ${photo
                    ? `<img src="${photo}" alt="${name}" class="footer-profile-image">`
                    : `<span class="footer-profile-fallback" aria-hidden="true">${initials}</span>`}
            </div>
            <p>&copy; ${year} ${name}. All rights reserved.</p>
        `;
    }

    printResume() {
        window.print();
    }

    exportPDF() {
        // Check if html2pdf is available
        if (typeof html2pdf === 'undefined') {
            alert('PDF export requires html2pdf library. Please print to PDF instead.');
            this.printResume();
            return;
        }
        
        const element = document.querySelector('.container');
        const name = this.resumeData.personal.name.replace(/\s+/g, '_');
        const filename = `${name}_Resume_${this.currentLanguage}.pdf`;
        
        const opt = {
            margin: 10,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResumeApp();
});
