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
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: ${data.primaryColor};
            --primary-light: color-mix(in srgb, var(--primary), white 80%);
            --primary-dark: color-mix(in srgb, var(--primary), black 20%);
            --dark: #0f172a;
            --light: #f8fafc;
            --gray: #64748b;
            --surface: rgba(255, 255, 255, 0.8);
            --glass: rgba(255, 255, 255, 0.7);
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

        body {
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: var(--dark);
            line-height: 1.6;
            background-color: var(--light);
            overflow-x: hidden;
        }
        
        /* Glass Nav */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 5%;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            position: fixed;
            width: 90%;
            top: 1rem;
            left: 5%;
            border-radius: 99px;
            z-index: 1000;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
        }

        .logo {
            font-weight: 800;
            font-size: 1.5rem;
            color: var(--dark);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .logo i { color: var(--primary); }

        .nav-links a {
            text-decoration: none;
            color: var(--gray);
            margin-left: 2rem;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s;
        }
        .nav-links a:hover { color: var(--primary); }

        .btn-primary {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 1.75rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1);
            display: inline-block;
            border: none;
            cursor: pointer;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            filter: brightness(110%);
        }

        /* Hero */
        .hero {
            padding: 10rem 5% 6rem;
            min-height: 85vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
            overflow: hidden;
            background: radial-gradient(circle at top right, var(--primary-light), transparent 40%),
                        radial-gradient(circle at bottom left, #fff1f2, transparent 40%);
        }
        
        /* Animated blurred orbs */
        .hero::before {
            content: '';
            position: absolute;
            top: -10%;
            right: -10%;
            width: 600px;
            height: 600px;
            background: var(--primary);
            filter: blur(100px);
            opacity: 0.1;
            border-radius: 50%;
            animation: float 8s ease-in-out infinite;
            z-index: -1;
        }

        .hero-content {
            max-width: 900px;
            animation: fadeIn 1s ease-out;
        }

        .hero h1 {
            font-size: 4rem;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 1.25rem;
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto 2.5rem;
            line-height: 1.8;
        }

        /* About Section */
        .section { padding: 8rem 5%; }
        
        .about-card {
            background: white;
            border-radius: 2rem;
            padding: 4rem;
            box-shadow: var(--shadow-lg);
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        
        .section-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            font-weight: 800;
            position: relative;
            display: inline-block;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
        }

        .about p {
            font-size: 1.15rem;
            color: var(--gray);
            max-width: 700px;
            margin: 0 auto;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 5rem 5%;
            text-align: center;
            position: relative;
        }
        footer a { color: var(--primary); text-decoration: none; }

        /* Mobile */
        @media (max-width: 768px) {
            nav {
                width: 94%;
                left: 3%;
                top: 1rem;
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.95);
            }
            .nav-links {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin: 0;
                gap: 1rem;
                padding-top: 0.5rem;
                border-top: 1px solid rgba(0,0,0,0.05);
            }
            .nav-links a, .btn-primary { margin: 0; width: 100%; box-sizing: border-box; text-align: center; }
            .hero { padding-top: 14rem; }
            .hero h1 { font-size: 2.75rem; }
            .about-card { padding: 2rem; }
        }
    </style>
</head>
<body>
    <nav>
        <a href="#" class="logo"><i class="fa-solid fa-layer-group"></i> ${data.brandName}</a>
        <div class="nav-links">
            <a href="#about">Mission</a>
            <a href="#contact">Contact</a>
            <a href="mailto:${data.contactEmail}" class="btn-primary" style="color:white; margin-left: 1rem;">${data.ctaText}</a>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <h1>${data.heroTitle}</h1>
            <p>${data.heroSubtitle}</p>
            <div style="margin-top: 2rem;">
                <a href="mailto:${data.contactEmail}" class="btn-primary" style="font-size: 1.1rem; padding: 1rem 2.5rem;">${data.ctaText} -></a>
            </div>
        </div>
    </header>

    <section id="about" class="section">
        <div class="about-card">
            <h2 class="section-title">${data.aboutHeading}</h2>
            <p>${data.aboutText}</p>
        </div>
    </section>

    <footer id="contact">
        <div style="opacity: 0.8; margin-bottom: 2rem;">
            <i class="fa-solid fa-envelope" style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary);"></i>
            <p>Start your journey with us.</p>
        </div>
        <p><a href="mailto:${data.contactEmail}" style="font-size: 1.25rem;">${data.contactEmail}</a></p>
        <div style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; font-size: 0.9rem; color: #94a3b8;">
            &copy; ${new Date().getFullYear()} ${data.brandName}. Powered by ProSite.
        </div>
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
