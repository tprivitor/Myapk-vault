
function log(msg) {
  console.log(msg);
}

document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!window.JSZip) {
    output.innerHTML = "JSZip failed to load.";
    return;
  }

  for (const file of files) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = \`
      <strong>File:</strong> \${file.name}<br>
      <strong>Size:</strong> \${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
      <strong>Package:</strong> <span class="package">loading...</span><br>
      <strong>Version:</strong> <span class="version">loading...</span><br>
      <strong>Permissions:</strong><ul class="perms"><li>loading...</li></ul>
    \`;
    output.appendChild(card);

    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);
      const manifestFile = zip.file("AndroidManifest.xml");

      if (!manifestFile) {
        card.querySelector(".package").textContent = "Manifest missing";
        card.querySelector(".version").textContent = "N/A";
        card.querySelector(".perms").innerHTML = "<li>N/A</li>";
        continue;
      }

      const manifestBuffer = await manifestFile.async("uint8array");

      // Basic binary parser logic (placeholder) — real decoding needs apk-parser-js or WASM
      const pkg = Array.from(manifestBuffer.slice(0, 8)).map(b => b.toString(16)).join(' ');
      card.querySelector(".package").textContent = "Binary manifest parsed (preview: " + pkg + ")";
      card.querySelector(".version").textContent = "Binary XML - full parser coming";
      card.querySelector(".perms").innerHTML = "<li>Declared in binary XML</li>";

    } catch (err) {
      card.querySelector(".package").textContent = "Error reading";
      card.querySelector(".version").textContent = "Error";
      card.querySelector(".perms").innerHTML = "<li>Error</li>";
    }
  }
});
