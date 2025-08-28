
(function(){
  // Inject FAB and Panel
  const fab = document.createElement('button');
  fab.id = 'toc-fab'; fab.textContent = '☰ TOC';
  const panel = document.createElement('div');
  panel.id = 'toc-panel'; panel.style.display = 'none';
  panel.innerHTML = '<h3>Table of Contents</h3><ul id="toc"></ul>';
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(fab);
    document.body.appendChild(panel);
    buildTOC();
  });

  function slugify(text){
    return String(text).toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g,'')
      .trim().replace(/\s+/g,'-').slice(0,80);
  }

  function buildTOC(){
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
      .filter(h => (h.textContent || '').trim().length > 0);
    const ul = document.getElementById('toc');
    if (!headings.length || !ul) { fab.style.display='none'; return; }
    headings.forEach(h => {
      if (!h.id) h.id = slugify(h.textContent);
      const li = document.createElement('li');
      const a  = document.createElement('a'); a.href = '#' + h.id; a.textContent = h.textContent.trim();
      a.className = h.tagName.toLowerCase();
      li.appendChild(a); ul.appendChild(li);
    });
    // Smooth scroll
    ul.addEventListener('click', (e)=>{
      const t = e.target;
      if (t.tagName === 'A') {
        e.preventDefault();
        const id = t.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' });
      }
    });
  }

  fab.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });
})();
