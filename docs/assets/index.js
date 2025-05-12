
import JSZip from 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm';

document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    let manifestContent = 'N/A';

    if (zip.file("AndroidManifest.xml")) {
      manifestContent = "(Binary AndroidManifest.xml found)";
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>File:</strong> ${file.name}<br>
      <strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
      <strong>Package:</strong> <span class="package">${manifestContent}</span><br>
      <strong>Version:</strong> <span class="version">N/A</span><br>
      <strong>Permissions:</strong> <span class="perms">N/A</span><br>
      <button class="scan-btn">Scan Online</button>
    `;

    const scanBtn = card.querySelector('.scan-btn');
    scanBtn.addEventListener('click', () => {
      alert('Online scan coming soon...');
    });

    output.appendChild(card);
  }
});
