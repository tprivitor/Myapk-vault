
document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

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
      const xmlString = window.bxmlParser.parseBytes(manifestBuffer);

      const parser = new window.fxparser.XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
      });

      const manifestJson = parser.parse(xmlString);
      const manifest = manifestJson.manifest;
      const pkgName = manifest["@_package"] || "unknown";
      const versionCode = manifest["@_android:versionCode"] || "unknown";
      const versionName = manifest["@_android:versionName"] || "unknown";

      const perms = Array.isArray(manifest["uses-permission"])
        ? manifest["uses-permission"].map(p => p["@_android:name"])
        : [manifest["uses-permission"]?.["@_android:name"] || "none"];

      card.setAttribute("data-permissions", perms.join(" ").toLowerCase());

      html += "<strong>Package:</strong> " + pkgName + "<br>";
      html += "<strong>Version:</strong> " + versionName + " (" + versionCode + ")<br>";
      html += "<strong>Permissions:</strong><ul>";
      perms.forEach(p => html += "<li>" + p + "</li>");
      html += "</ul>";

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
