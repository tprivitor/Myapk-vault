
document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');

  for (const file of files) {
    const card = document.createElement('div');
    card.className = 'card';
    let html = "<strong>File:</strong> " + file.name + "<br>";
    html += "<strong>Size:</strong> " + (file.size / (1024 * 1024)).toFixed(2) + " MB<br>";

    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);
      const manifestFile = zip.file("AndroidManifest.xml");

      if (!manifestFile) {
        html += "<strong>Manifest:</strong> Not found<br>";
        card.innerHTML = html;
        output.appendChild(card);
        continue;
      }

      const manifestBuffer = await manifestFile.async("uint8array");

      // This is a placeholder until real binary-to-text parser is available
      throw new Error("binaryXmlToText not yet implemented");

    } catch (e) {
      html += "<strong>Error:</strong> " + e.message + "<br>";
    }

    card.innerHTML = html;
    output.appendChild(card);
  }
});

document.getElementById('permFilter').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const perms = card.getAttribute("data-permissions") || "";
    card.style.display = !query || perms.includes(query) ? "block" : "none";
  });
});
