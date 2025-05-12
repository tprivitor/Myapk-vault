
function log(msg) {
  console.log(msg);
  const logDiv = document.getElementById('output');
  logDiv.innerHTML += "<div style='background:#eee;padding:6px;margin-top:4px;border-radius:4px'>" + msg + "</div>";
}

document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!window.JSZip) {
    log("JSZip failed to load.");
    return;
  }

  log("JSZip loaded.");

  for (const file of files) {
    log("Reading: " + file.name);

    try {
      const buffer = await file.arrayBuffer();
      log("Buffer loaded.");

      const zip = await JSZip.loadAsync(buffer);
      log("APK unzipped.");

      const manifestFile = zip.file("AndroidManifest.xml");
      if (manifestFile) {
        log("Manifest found.");

        const manifestBuffer = await manifestFile.async("uint8array");
        const preview = Array.from(manifestBuffer.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' ');

        const html = "<div class='card'>" +
          "<strong>File:</strong> " + file.name + "<br>" +
          "<strong>Size:</strong> " + (file.size / (1024 * 1024)).toFixed(2) + " MB<br>" +
          "<strong>Manifest:</strong> Found<br>" +
          "<strong>Preview:</strong> " + preview + "<br>" +
          "<strong>Package:</strong> [decoding next]<br>" +
          "<strong>Version:</strong> [decoding next]<br>" +
          "<strong>Permissions:</strong><ul><li>[decoding next]</li></ul>" +
          "</div>";

        output.innerHTML += html;
      } else {
        log("Manifest NOT found.");
      }

    } catch (e) {
      log("Error: " + e.message);
    }
  }
});
