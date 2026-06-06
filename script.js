
// ── Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2400);
});

// ── Custom Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,[class*="btn"]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '8px'; cursor.style.height = '8px';
    cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    cursorRing.style.width = '40px'; cursorRing.style.height = '40px'; cursorRing.style.opacity = '0.5';
  });
});

// ── Particles
const pContainer = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.cssText = `
    width:${size}px;height:${size}px;
    left:${Math.random()*100}%;
    bottom:-10px;
    animation-duration:${8 + Math.random()*12}s;
    animation-delay:${Math.random()*8}s;
    opacity:${Math.random()*0.6+0.2};
  `;
  pContainer.appendChild(p);
}

// ── Spotlight / parallax on hero
const hero = document.getElementById('hero');
const spotlight = document.getElementById('spotlight');
hero.addEventListener('mousemove', e => {
  const rect = hero.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
  const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
  spotlight.style.background = `radial-gradient(ellipse 40% 60% at ${x}% ${y}%, rgba(212,175,55,0.07) 0%, transparent 65%)`;
  const heroContent = document.getElementById('heroContent');
  const dx = (e.clientX/window.innerWidth - 0.5) * 18;
  const dy = (e.clientY/window.innerHeight - 0.5) * 10;
  heroContent.style.transform = `translate(${dx}px, ${dy}px)`;
});
hero.addEventListener('mouseleave', () => {
  spotlight.style.background = 'radial-gradient(ellipse 40% 60% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 70%)';
  document.getElementById('heroContent').style.transform = '';
});

// ── Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
});

// ── Overlay
function openOverlay() {
  const panel = document.getElementById('overlay-panel');
  panel.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeOverlay() {
  document.getElementById('overlay-panel').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeOverlay(); });

// ── Cast drag scroll
const track = document.getElementById('castTrack');
let isDown=false, startX, scrollLeft;
track.addEventListener('mousedown', e => {
  isDown=true; track.classList.add('dragging');
  startX=e.pageX-track.offsetLeft; scrollLeft=track.scrollLeft;
});
track.addEventListener('mouseleave', () => { isDown=false; track.classList.remove('dragging'); });
track.addEventListener('mouseup', () => { isDown=false; track.classList.remove('dragging'); });
track.addEventListener('mousemove', e => {
  if(!isDown) return; e.preventDefault();
  const x = e.pageX-track.offsetLeft;
  track.scrollLeft = scrollLeft - (x-startX)*1.5;
});
// Auto-scroll cast
let autoScroll = setInterval(() => {
  if(!isDown) {
    track.scrollLeft += 1;
    if(track.scrollLeft >= track.scrollWidth - track.clientWidth) track.scrollLeft = 0;
  }
}, 30);

// ── Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Stagger children in grids
document.querySelectorAll('.cast-full-grid, .gallery-grid').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = (i * 80) + 'ms';
  });
});



let currentCard = 0;

function slideCast(direction){

    const track = document.getElementById('castTrack');
    const cards = track.querySelectorAll('.cast-card');

    currentCard += direction;

    if(currentCard < 0){
        currentCard = cards.length - 1;
    }

    if(currentCard >= cards.length){
        currentCard = 0;
    }

    track.style.transform =
        `translateX(-${currentCard * 220}px)`;
}

function openOverlay() {
    document.getElementById('overlay-panel').classList.add('active');

    const track = document.getElementById('castTrack');
    track.style.transform = 'translateX(0)';

    currentCard = 0;

    document.body.style.overflow = 'hidden';
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');

    const hamburger = document.getElementById('hamburger');
    hamburger.classList.toggle('active');
}
function toggleMenu() {
    document.getElementById("navbar").classList.toggle("active");
    document.getElementById("hamburger").classList.toggle("active");
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {

        document.getElementById('navbar').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');

    });
});