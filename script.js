document.addEventListener('DOMContentLoaded', () => {
  const c = window.SITE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const el = $(selector);
    if (el && value) el.textContent = value;
  };
  const brand = $('.brand');
  if (brand && c.name) {
    brand.textContent = c.name;
    const span = document.createElement('span');
    span.textContent = ' ADVOCACIA';
    brand.appendChild(span);
  }
  setText('#phoneDisplay', c.phone);
  setText('#whatsappDisplay', c.phone);
  setText('#addressDisplay', c.address);
  setText('#hoursDisplay', c.hours);
  setText('#mapCity', c.city);
  setText('#year', new Date().getFullYear());
  const digits = String(c.whatsappNumber || '').replace(/\D/g, '');
  const whatsappUrl = digits ? `https://wa.me/${digits}?text=${encodeURIComponent(c.whatsappMessage || 'Olá! Gostaria de falar com o escritório.')}` : '#contato';
  document.querySelectorAll('[data-whatsapp]').forEach((a) => { a.href = whatsappUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  document.querySelectorAll('[data-map]').forEach((a) => { a.href = c.mapUrl || '#contato'; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  const menu = $('#menu'), nav = $('#nav');
  menu?.addEventListener('click', () => { const open = nav?.classList.toggle('open'); menu.setAttribute('aria-expanded', String(Boolean(open))); });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
  document.querySelectorAll('.article-grid a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  const form = $('#contactForm'), status = $('#formStatus');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!digits) { if (status) status.textContent = 'O WhatsApp ainda não foi configurado. Adicione o número real no config.js.'; return; }
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (name.length > 100 || phone.length > 30 || email.length > 254 || subject.length > 80 || message.length > 2000) { if (status) status.textContent = 'Confira os campos: alguns dados ultrapassaram o limite permitido.'; return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { if (status) status.textContent = 'Digite um e-mail válido ou deixe o campo em branco.'; return; }
    const text = ['Olá! Gostaria de entrar em contato com o escritório.', '', `Nome: ${name}`, `Telefone: ${phone}`, email ? `E-mail: ${email}` : '', `Assunto: ${subject}`, '', 'Mensagem:', message].filter(Boolean).join('\n');
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    if (status) status.textContent = 'WhatsApp aberto. Revise a mensagem e toque em enviar.';
    form.reset();
  });
});
