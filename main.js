// Language Switcher
document.getElementById('lang-en').onclick = () => {
  localStorage.setItem('lang', 'en');
  location.reload();
};
document.getElementById('lang-de').onclick = () => {
  localStorage.setItem('lang', 'de');
  location.reload();
};

// Particle Effect (simple)
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 200;
  const particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  }));
  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = "rgba(201,166,107,0.5)";
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
