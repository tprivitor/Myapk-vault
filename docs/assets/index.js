
function createElem(tag, className, content) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.innerHTML = content;
  return el;
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

    let fileName = "<strong>File:</strong> " + file.name + "<br>";
    let fileSize = "<strong>Size:</strong> " + (file.size / (1024 * 1024)).toFixed(2) + " MB<br>";

    let pkgInfo = "<strong>Package:</strong> loading...<br>";
    let verInfo = "<strong>Version:</strong> loading...<br>";
    let permList = "<strong>Permissions:</strong><ul><li>loading...</li></ul>";

    card.innerHTML = fileName + fileSize + pkgInfo + verInfo + permList;
    output.appendChild(card);

    try {
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);
      const manifestFile = zip.file("AndroidManifest.xml");

      if (!manifestFile) {
        card.innerHTML += "<div>Manifest not found</div>";
        continue;
      }

      const manifestBuffer = await manifestFile.async("uint8array");
      const hexPreview = Array.from(manifestBuffer.slice(0, 8)).map(function(b) {
        return b.toString(16).padStart(2, '0');
      }).join(' ');

      card.innerHTML = fileName +
        fileSize +
        "<strong>AndroidManifest.xml:</strong> Yes (binary)<br>" +
        "<strong>Preview:</strong> " + hexPreview + "<br>" +
        "<strong>Package:</strong> [binary decoded soon]<br>" +
        "<strong>Version:</strong> [binary decoded soon]<br>" +
        "<strong>Permissions:</strong><ul><li>[binary decoded soon]</li></ul>";
    } catch (err) {
      card.innerHTML += "<div>Error: " + err.message + "</div>";
    }
  }
});
