
document.getElementById('apkInput').addEventListener('change', async function (event) {
  const files = Array.from(event.target.files);
  const output = document.getElementById('output');
  output.innerHTML = '';

  for (const file of files) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>File:</strong> ${file.name}<br>
      <strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB<br>
      <strong>Package:</strong> <em>coming soon...</em><br>
      <strong>Version:</strong> <em>coming soon...</em><br>
      <strong>Permissions:</strong> <em>coming soon...</em>
    `;
    output.appendChild(card);
  }
});
