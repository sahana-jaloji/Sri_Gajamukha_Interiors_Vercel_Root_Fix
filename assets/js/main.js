
const menu=document.querySelector('.menu'),mobile=document.querySelector('.mobile-nav');
if(menu&&mobile)menu.addEventListener('click',()=>{mobile.classList.toggle('open');menu.setAttribute('aria-expanded',mobile.classList.contains('open'))});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

// Count-up animation for the homepage highlights.
// Values remain visible even if IntersectionObserver is unavailable.
const stats = document.querySelector('.stats');
if (stats) {
  const runCounter = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const format = value => value.toFixed(decimals) + suffix;

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };
    requestAnimationFrame(tick);
  };

  const startStats = () => {
    stats.classList.add('is-counted');
    stats.querySelectorAll('[data-count]').forEach(runCounter);
  };

  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    statObserver.observe(stats);
  } else {
    startStats();
  }
}

const form=document.querySelector('#enquiry-form');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Sri Gajamukha Interiors,%0AName: ${encodeURIComponent(d.get('name'))}%0APhone: ${encodeURIComponent(d.get('phone'))}%0AService: ${encodeURIComponent(d.get('service'))}%0AMessage: ${encodeURIComponent(d.get('message'))}`;window.open(`https://wa.me/919880322036?text=${msg}`,'_blank')});
