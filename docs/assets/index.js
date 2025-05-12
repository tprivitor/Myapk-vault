
document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  for (const file of files) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>File:</strong> ${file.name}<br>
      <strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
      <strong>Package:</strong> <span class="package">Reading...</span><br>
      <strong>Version:</strong> <span class="version">Reading...</span><br>
      <strong>Permissions:</strong> <span class="perms">Reading...</span><br>
      <button class="scan-btn">Scan Online</button>
    `;
    output.appendChild(card);

    // Hooks for future local manifest parsing and scan trigger
    const scanBtn = card.querySelector('.scan-btn');
    scanBtn.addEventListener('click', () => {
      alert('Online scan coming soon...');
    });
  }
});
