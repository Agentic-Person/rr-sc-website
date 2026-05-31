#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const MarkdownIt = require('markdown-it');

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);
const title = process.argv[4] || path.basename(inputPath, '.md');

if (!fs.existsSync(inputPath)) {
  console.error(`Input not found: ${inputPath}`);
  process.exit(1);
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: true, breaks: false });
const body = md.render(fs.readFileSync(inputPath, 'utf8'));

const css = `
  @page { size: Letter; margin: 0.75in 0.7in 0.85in 0.7in; }
  html, body { font-family: 'Georgia', 'Times New Roman', serif; color: #1f2937; font-size: 11pt; line-height: 1.55; }
  body { margin: 0; padding: 0; }
  h1 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 24pt; color: #0f172a; margin: 0 0 6pt; letter-spacing: -0.01em; border-bottom: 2px solid #0f172a; padding-bottom: 8pt; }
  h2 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 16pt; color: #0f172a; margin: 22pt 0 8pt; letter-spacing: -0.005em; border-bottom: 1px solid #cbd5e1; padding-bottom: 4pt; page-break-after: avoid; break-after: avoid; }
  h3 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12.5pt; color: #1e293b; margin: 16pt 0 4pt; page-break-after: avoid; break-after: avoid; }
  h4 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11pt; color: #1e293b; margin: 12pt 0 2pt; }
  p { margin: 0 0 8pt; orphans: 2; widows: 2; }
  ul, ol { margin: 0 0 8pt; padding-left: 22pt; }
  li { margin: 0 0 3pt; }
  strong { color: #0f172a; font-weight: 600; }
  em { color: #334155; }
  code { font-family: 'Consolas', 'Monaco', monospace; font-size: 9.5pt; background: #f1f5f9; padding: 1pt 4pt; border-radius: 3px; color: #0f172a; }
  pre { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10pt; border-radius: 4px; font-size: 9pt; overflow-x: auto; page-break-inside: avoid; }
  hr { border: none; border-top: 1px solid #cbd5e1; margin: 18pt 0; }
  blockquote { margin: 10pt 0; padding: 6pt 14pt; border-left: 3px solid #94a3b8; color: #475569; font-style: italic; background: #f8fafc; }
  a { color: #1e40af; text-decoration: none; }
  table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 9.5pt; page-break-inside: auto; break-inside: auto; }
  table thead { display: table-header-group; }
  table tr { page-break-inside: avoid; break-inside: avoid; }
  table th { background: #0f172a; color: #fff; padding: 6pt 8pt; text-align: left; font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 600; font-size: 9pt; letter-spacing: 0.02em; }
  table td { padding: 5pt 8pt; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  table tr:nth-child(even) td { background: #f8fafc; }
  table tr:last-child td { border-bottom: 1px solid #cbd5e1; }
  .cover { text-align: left; padding: 0 0 10pt; margin-bottom: 18pt; border-bottom: 3px solid #0f172a; }
  .cover .badge { display: inline-block; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 8pt; letter-spacing: 0.14em; text-transform: uppercase; color: #64748b; margin-bottom: 6pt; }
  h2 + p, h3 + p { margin-top: 4pt; }
  input[type="checkbox"] { margin-right: 4pt; }
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>${css}</style>
</head>
<body>
<div class="cover"><span class="badge">Agentic Personnel — Independent Audit</span></div>
${body}
</body>
</html>`;

const tmpHtml = outputPath + '.tmp.html';
fs.writeFileSync(tmpHtml, html, 'utf8');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + tmpHtml.replace(/\\/g, '/');

try {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--virtual-time-budget=5000',
      `--print-to-pdf=${outputPath}`,
      fileUrl,
    ],
    { stdio: 'inherit' }
  );
  fs.unlinkSync(tmpHtml);
  console.log(`PDF written: ${outputPath}`);
} catch (err) {
  console.error('Chrome print failed:', err.message);
  process.exit(1);
}
