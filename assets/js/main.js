// Magento China - Main JavaScript
(function() {
  'use strict';

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // Active nav link based on current path
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === '/') {
      if (currentPath === '/' || currentPath === '/index.html') link.classList.add('active');
    } else if (href && (currentPath === href || currentPath.startsWith(href.replace('/index.html', '')))) {
      link.classList.add('active');
    }
  });

  // Fade-in animation on scroll (IntersectionObserver)
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(function(el) {
    fadeObserver.observe(el);
  });

  // Copy code block functionality
  document.querySelectorAll('.code-block').forEach(function(block) {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.style.cssText = 'position:absolute;top:8px;right:8px;background:var(--primary);color:#fff;border:none;padding:4px 12px;border-radius:4px;font-size:0.75rem;cursor:pointer;opacity:0;transition:opacity 0.2s;';
    block.style.position = 'relative';
    block.appendChild(copyBtn);

    block.addEventListener('mouseenter', function() { copyBtn.style.opacity = '1'; });
    block.addEventListener('mouseleave', function() { copyBtn.style.opacity = '0'; });

    copyBtn.addEventListener('click', function() {
      const pre = block.querySelector('pre');
      if (pre) {
        navigator.clipboard.writeText(pre.textContent).then(function() {
          copyBtn.textContent = 'Copied!';
          setTimeout(function() { copyBtn.textContent = 'Copy'; }, 2000);
        });
      }
    });
  });

  // Search functionality (simple local search for docs sidebar)
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.sidebar-nav li a').forEach(function(link) {
        const text = link.textContent.toLowerCase();
        link.parentElement.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // Tab navigation for installation methods
  document.querySelectorAll('.tab-nav').forEach(function(nav) {
    const buttons = nav.querySelectorAll('button');
    const container = nav.parentElement;
    const tabs = container.querySelectorAll('.tab-content');

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) { b.classList.remove('active'); });
        tabs.forEach(function(t) { t.classList.remove('active'); });
        btn.classList.add('active');
        var target = btn.getAttribute('data-tab');
        var targetTab = container.querySelector('#' + target);
        if (targetTab) targetTab.classList.add('active');
      });
    });
  });

  // Collapsible sections
  document.querySelectorAll('.collapsible-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var body = header.nextElementSibling;
      if (body && body.classList.contains('collapsible-body')) {
        header.classList.toggle('open');
        body.classList.toggle('open');
      }
    });
  });

})();
