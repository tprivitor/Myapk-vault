
document.getElementById('apkInput').addEventListener('change', handleFiles);
const output = document.getElementById('output');
const exportBtn = document.getElementById('exportBtn');
let results = [];

function handleFiles(event) {
  const files = Array.from(event.target.files);
  results = files.map(file => {
    const name = file.name;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const modFlag = /(mod|m0d|mod|noad|unlocked|premium|pro|crack|patch|paid|remove ads|crackshash|full)/i.test(name) ? "[MOD]" : "";
    const parts = name.replace(/\.apk$/i, "").split(/[_\-\s]+/);
    const appName = parts[0];
    const version = parts.find(p => /^\d+(\.\d+)+$/.test(p)) || "Unknown";
    return { name, appName, version, modFlag, sizeMB };
  });

  renderResults();
  exportBtn.style.display = 'inline-block';
}

function renderResults() {
  output.innerHTML = '';
  results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>File:</strong> ${r.name}<br>
      <strong>App:</strong> ${r.appName}<br>
      <strong>Version:</strong> ${r.version}<br>
      <strong>MOD:</strong> ${r.modFlag || "No"}<br>
      <strong>Size:</strong> ${r.sizeMB} MB
    `;
    output.appendChild(card);
  });
}

exportBtn.addEventListener('click', () => {
  const csv = [
    ["File", "App", "Version", "MOD", "Size (MB)"],
    ...results.map(r => [r.name, r.appName, r.version, r.modFlag, r.sizeMB])
  ].map(row => row.join(",")).join("\n");

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'apk_metadata.csv';
  a.click();
});
