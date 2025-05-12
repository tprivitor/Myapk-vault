
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function APKVault() {
  const [results, setResults] = useState([]);

  const handleFiles = async (files) => {
    const parsed = [];
    for (const file of files) {
      const name = file.name;
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const modFlag = /mod|\[m0d\]/i.test(name) ? "[MOD]" : "";

      const parts = name.replace(/\.apk$/i, "").split(/[_\-\s]+/);
      let appName = parts[0];
      let version = parts.find((p) => /^\d+(\.\d+)+$/.test(p)) || "Unknown";

      parsed.push({
        name,
        appName,
        version,
        modFlag,
        sizeMB,
      });
    }
    setResults(parsed);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">APK Metadata Vault</h1>
      <input
        type="file"
        accept=".apk"
        multiple
        onChange={(e) => handleFiles(Array.from(e.target.files))}
        className="mb-4"
      />
      <div className="grid gap-2">
        {results.map((apk, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-1">
              <div><strong>File:</strong> {apk.name}</div>
              <div><strong>App:</strong> {apk.appName}</div>
              <div><strong>Version:</strong> {apk.version}</div>
              <div><strong>MOD:</strong> {apk.modFlag || "No"}</div>
              <div><strong>Size:</strong> {apk.sizeMB} MB</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {results.length > 0 && (
        <Button
          onClick={() => {
            const csv = [
              ["File", "App", "Version", "MOD", "Size (MB)"]
                .join(","),
              ...results.map(r => [r.name, r.appName, r.version, r.modFlag, r.sizeMB].join(","))
            ].join("\n");

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "apk_metadata.csv";
            a.click();
          }}
        >Export to CSV</Button>
      )}
    </div>
  );
}
