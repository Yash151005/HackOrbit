const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const generatePDF = async ({ car, parts, totalCost }) => {
  const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #2b6cb0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f3f4f6; text-align: left; }
      </style>
    </head>
    <body>
      <h1>AutoFix AI - Damage Report</h1>
      <p><strong>Car:</strong> ${car.name} ${car.model} (${car.year})</p>
      <table>
        <thead>
          <tr>
            <th>Part</th>
            <th>Estimated Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(parts)
            .map(([part, cost]) => `<tr><td>${part}</td><td>${cost}</td></tr>`)
            .join('')}
        </tbody>
      </table>
      <h3>Total Estimated Cost: ₹${totalCost}</h3>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const outputPath = path.join(__dirname, '../reports/report-' + Date.now() + '.pdf');
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
  return outputPath;
};

module.exports = generatePDF;
