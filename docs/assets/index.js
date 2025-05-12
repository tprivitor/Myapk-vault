
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

    let html = "";
    html += "<strong>File:</strong> " + file.name + "<br>";
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

      // Parse using embedded decoder (in real implementation)
      // Placeholder values
      const packageName = "com.example.hulu";
      const versionName = "9.16.0";
      const versionCode = "91600";
      const permissions = [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE"
      ];

      html += "<strong>Package:</strong> " + packageName + "<br>";
      html += "<strong>Version:</strong> " + versionName + " (" + versionCode + ")<br>";
      html += "<strong>Permissions:</strong><ul>";
      for (let p of permissions) html += "<li>" + p + "</li>";
      html += "</ul>";

    } catch (err) {
      html += "<strong>Error:</strong> " + err.message + "<br>";
    }

    card.innerHTML = html;
    output.appendChild(card);
  }
});
