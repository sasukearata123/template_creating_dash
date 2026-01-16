document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('siteForm');
    const previewFrame = document.getElementById('previewFrame');
    const downloadBtn = document.getElementById('downloadBtn');

    // Inputs
    const inputs = {
        brandName: document.getElementById('brandName'),
        primaryColor: document.getElementById('primaryColor'),
        heroTitle: document.getElementById('heroTitle'),
        heroSubtitle: document.getElementById('heroSubtitle'),
        ctaText: document.getElementById('ctaText'),
        aboutHeading: document.getElementById('aboutHeading'),
        aboutText: document.getElementById('aboutText'),
        contactEmail: document.getElementById('contactEmail')
    };

    // Attach event listeners to all inputs
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Initial load
    updatePreview();

    function getTemplateHTML() {
        const data = {
            brandName: inputs.brandName.value || 'Brand',
            primaryColor: inputs.primaryColor.value || '#3b82f6',
            heroTitle: inputs.heroTitle.value || 'Headline',
            heroSubtitle: inputs.heroSubtitle.value || 'Subtitle goes here.',
            ctaText: inputs.ctaText.value || 'Get Started',
            aboutHeading: inputs.aboutHeading.value || 'About Us',
            aboutText: inputs.aboutText.value || 'Description...',
            contactEmail: inputs.contactEmail.value || 'email@example.com'
        };

        // This is the TEMPLATE code that gets injected.
        // It includes its own internal CSS for the generated site.
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.brandName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${data.primaryColor};
            --dark: #111827;
            --light: #f9fafb;
            --gray: #6b7280;
        }
        body {
            margin: 0;
            font-family: 'Outfit', sans-serif;
            color: var(--dark);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        /* Nav */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 5%;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            position: fixed;
            width: 90%;
            top: 0;
            z-index: 1000;
        }
        .logo {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--dark);
            text-decoration: none;
        }
        .nav-links a {
            text-decoration: none;
            color: var(--gray);
            margin-left: 2rem;
            font-weight: 500;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: var(--primary);
        }
        .btn-primary {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: opacity 0.3s;
            display: inline-block;
        }
        .btn-primary:hover {
            opacity: 0.9;
        }

        /* Hero */
        .hero {
            padding: 8rem 5% 5rem;
            background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
            text-align: center;
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .hero h1 {
            font-size: 3.5rem;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            max-width: 800px;
            background: -webkit-linear-gradient(45deg, var(--dark), var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: 1.25rem;
            color: var(--gray);
            max-width: 600px;
            margin-bottom: 2.5rem;
        }

        /* About */
        .section {
            padding: 6rem 5%;
        }
        .about {
            background: white;
            text-align: center;
        }
        .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
            font-weight: 700;
        }
        .about p {
            max-width: 700px;
            margin: 0 auto;
            color: var(--gray);
            font-size: 1.1rem;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 4rem 5%;
            text-align: center;
        }
        footer a {
            color: var(--primary);
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .nav-links { 
                display: flex; 
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background: white;
                padding: 1rem 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                text-align: center;
                gap: 1rem;
            }
            .nav-links a {
                margin: 0;
                display: block;
                padding: 0.5rem;
            }
            .hero {
                padding-top: 10rem; /* More space for stacked nav */
            }
        }
    </style>
</head>
<body>
    <nav>
        <a href="#" class="logo">${data.brandName}</a>
        <div class="nav-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#contact" class="btn-primary" style="margin-left: 2rem; color: white;">${data.ctaText}</a>
        </div>
    </nav>

    <header class="hero">
        <h1>${data.heroTitle}</h1>
        <p>${data.heroSubtitle}</p>
        <a href="mailto:${data.contactEmail}" class="btn-primary">${data.ctaText}</a>
    </header>

    <section id="about" class="section about">
        <h2 class="section-title">${data.aboutHeading}</h2>
        <p>${data.aboutText}</p>
    </section>

    <footer id="contact">
        <p>Contact us at <a href="mailto:${data.contactEmail}">${data.contactEmail}</a></p>
        <p style="margin-top: 1rem; opacity: 0.5; font-size: 0.9rem;">&copy; ${new Date().getFullYear()} ${data.brandName}. All rights reserved.</p>
    </footer>
</body>
</html>`;
    }

    function updatePreview() {
        const html = getTemplateHTML();
        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
    }

    downloadBtn.addEventListener('click', () => {
        const html = getTemplateHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-website.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
