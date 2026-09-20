// Lọc bài theo tag (chỉ chạy ở trang có <div id="tags">, ví dụ /ctf-writeups/)
(() => {
  const box = document.getElementById("tags");
  const posts = [...document.querySelectorAll("article[data-tags]")];
  if (!box || !posts.length) return;
  const has = (p, t) => p.dataset.tags.split(" ").includes(t);
  const tags = [...new Set(posts.flatMap(p => p.dataset.tags.split(" ").filter(Boolean)))].sort();
  if (!tags.length) return;
  const pick = t => {
    posts.forEach(p => (p.hidden = !!t && !has(p, t)));
    box.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.t === t));
  };
  ["", ...tags].forEach(t => {
    const b = document.createElement("button");
    b.textContent = t || "all";
    b.dataset.t = t;
    b.onclick = () => pick(t);
    box.append(b);
  });
  pick("");
})();
