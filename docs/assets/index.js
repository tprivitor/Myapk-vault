
function log(msg) {
  document.getElementById('log').textContent += msg + "\n";
}

document.getElementById('apkInput').addEventListener('change', async function (event) {
  log("File selected.");

  const files = Array.from(event.target.files);
  if (!window.JSZip) {
    log("JSZip not loaded.");
    return;
  } else {
    log("JSZip loaded.");
  }

  for (const file of files) {
    try {
      log("Reading file: " + file.name);
      const buffer = await file.arrayBuffer();
      log("Loaded file buffer.");

      const zip = await JSZip.loadAsync(buffer);
      log("APK unzipped.");

      const manifest = zip.file("AndroidManifest.xml");
      if (manifest) {
        log("AndroidManifest.xml found.");
      } else {
        log("No AndroidManifest.xml found.");
      }

    } catch (e) {
      log("Error: " + e.message);
    }
  }
});
