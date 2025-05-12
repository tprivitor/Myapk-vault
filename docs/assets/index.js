
import JSZip from 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm';
import ApkReader from 'https://cdn.jsdelivr.net/npm/apk-parser-js@1.0.4/+esm';

document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);

    let manifestInfo = {
      package: 'N/A',
      versionName: 'N/A',
      versionCode: 'N/A',
      permissions: []
    };

    try {
      const reader = await ApkReader.readFile(new Uint8Array(buffer));
      const manifest = reader.readManifestSync();

      manifestInfo.package = manifest.package || 'N/A';
      manifestInfo.versionName = manifest.versionName || 'N/A';
      manifestInfo.versionCode = manifest.versionCode || 'N/A';
      manifestInfo.permissions = manifest.usesPermissions?.map(p => p.name) || [];
    } catch (err) {
      console.error('Manifest parse error:', err);
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>File:</strong> ${file.name}<br>
      <strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
      <strong>Package:</strong> ${manifestInfo.package}<br>
      <strong>Version:</strong> ${manifestInfo.versionName} (${manifestInfo.versionCode})<br>
      <strong>Permissions:</strong><br><ul>${manifestInfo.permissions.map(p => `<li>${p}</li>`).join('')}</ul>
      <button class="scan-btn">Scan Online</button>
    `;

    const scanBtn = card.querySelector('.scan-btn');
    scanBtn.addEventListener('click', () => {
      alert('Online scan coming soon...');
    });

    output.appendChild(card);
  }
});
