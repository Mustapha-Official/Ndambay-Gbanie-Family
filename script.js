const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const track = document.querySelector('.gallery-track');
const cards = [...document.querySelectorAll('.member-card')];
const prev = document.querySelector('.slider-btn.prev');
const next = document.querySelector('.slider-btn.next');
let index = 0;

function visibleCards() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateSlider() {
  if (!track || !cards.length) return;
  const visible = visibleCards();
  const maxIndex = Math.max(0, cards.length - visible);
  index = Math.min(index, maxIndex);
  const gap = 18;
  const cardWidth = cards[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  prev.disabled = index === 0;
  next.disabled = index === maxIndex;
  prev.style.opacity = prev.disabled ? '.45' : '1';
  next.style.opacity = next.disabled ? '.45' : '1';
}
next?.addEventListener('click', () => { index++; updateSlider(); });
prev?.addEventListener('click', () => { index--; updateSlider(); });
window.addEventListener('resize', updateSlider);
updateSlider();

document.getElementById('year').textContent = new Date().getFullYear();
