
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
      const reader = new axp.AXMLParser(manifestBuffer);
      const xmlDoc = reader.parse();

      const manifestTag = xmlDoc.find(tag => tag.name === "manifest");
      const pkgName = manifestTag.attrs["package"] || "unknown";
      const versionCode = manifestTag.attrs["android:versionCode"] || "unknown";
      const versionName = manifestTag.attrs["android:versionName"] || "unknown";

      const perms = xmlDoc
        .filter(tag => tag.name === "uses-permission")
        .map(tag => tag.attrs["android:name"]);

      card.setAttribute("data-permissions", perms.join(" ").toLowerCase());

      html += "<strong>Package:</strong> " + pkgName + "<br>";
      html += "<strong>Version:</strong> " + versionName + " (" + versionCode + ")<br>";
      html += "<strong>Permissions:</strong><ul>";
      for (let p of perms) html += "<li>" + p + "</li>";
      html += "</ul>";
      html += "<button class='scan-btn'>Scan Online</button>";

    } catch (e) {
      html += "<strong>Error:</strong> " + e.message + "<br>";
    }

    card.innerHTML = html;
    output.appendChild(card);

    card.querySelector('.scan-btn').addEventListener('click', () => {
      alert("VirusTotal scan feature coming soon...");
    });
  }
});

document.getElementById('permFilter').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const perms = card.getAttribute("data-permissions");
    if (!query || perms.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
