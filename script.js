  // Typewriter
  const phrases = [
    "Aspiring Software Developer.",
    "Web Developer.",
    "ML Enthusiast.",
    "B.Tech CSE Student.",
    "Open to Internships."
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter-text');
  function type() {
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, deleting ? 45 : 75);
  }
  setTimeout(type, 800);

  // Fade-up on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Contact form — mailto fallback
  document.getElementById('cf-submit').addEventListener('click', () => {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const toast   = document.getElementById('cf-toast');
    toast.className = 'form-toast';
    if (!name || !email || !message) {
      toast.textContent = '⚠ Please fill in Name, Email and Message.';
      toast.className = 'form-toast error'; return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.textContent = '⚠ Please enter a valid email address.';
      toast.className = 'form-toast error'; return;
    }
    const mailto = `mailto:your-email@example.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    toast.textContent = '✓ Opening your email client…';
    toast.className = 'form-toast success';
  });

  // Theme toggle
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') { document.body.classList.add('light'); toggleBtn.textContent = '☀️'; }
  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    toggleBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Smooth active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  });
