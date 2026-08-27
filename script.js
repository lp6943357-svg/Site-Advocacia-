document.addEventListener('DOMContentLoaded', () => {
  const c = window.SITE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const el = $(selector);
    if (el && value) el.textContent = value;
  };

  // Dados centralizados: altere apenas o config.js quando o escritório tiver as informações reais.
  const brand = $('.brand');
  if (brand && c.name) {
    brand.innerHTML = `${c.name}<span> ADVOCACIA</span>`;
  }

  setText('#phoneDisplay', c.phone);
  setText('#whatsappDisplay', c.phone);
  setText('#addressDisplay', c.address);
  setText('#hoursDisplay', c.hours);
  setText('#mapCity', c.city);
  setText('#year', new Date().getFullYear());

  const whatsappUrl = c.whatsappNumber
    ? `https://wa.me/${String(c.whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(c.whatsappMessage || '')}`
    : '#contato';

  document.querySelectorAll('[data-whatsapp]').forEach((button) => {
    button.href = whatsappUrl;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-map]').forEach((button) => {
    button.href = c.mapUrl || '#contato';
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  });

  const menu = $('#menu');
  const nav = $('#nav');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(Boolean(open)));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  document.querySelectorAll('.article-grid a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
});
