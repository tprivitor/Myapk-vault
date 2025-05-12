
document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  for (const file of files) {
    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);

      const manifestFile = zip.file('AndroidManifest.xml');
      const hasManifest = manifestFile ? 'Yes (binary)' : 'No';

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <strong>File:</strong> ${file.name}<br>
        <strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
        <strong>AndroidManifest.xml:</strong> ${hasManifest}<br>
        <strong>Package:</strong> <span class="package">parser coming</span><br>
        <strong>Version:</strong> <span class="version">parser coming</span><br>
        <strong>Permissions:</strong> <span class="perms">parser coming</span><br>
        <button class="scan-btn">Scan Online</button>
      `;

      const scanBtn = card.querySelector('.scan-btn');
      scanBtn.addEventListener('click', () => {
        alert('Online scan coming soon...');
      });

      output.appendChild(card);
    } catch (e) {
      console.error('Error reading APK:', e);
    }
  }
});
