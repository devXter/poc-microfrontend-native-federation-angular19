const fs = require('fs-extra');
const concat = require('concat');

async function buildElement() {
  const files = [
    './dist/inline.bundle.js',
    './dist/polyfills.bundle.js',
    './dist/main.bundle.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/legacy-element.js');
  await fs.copyFile('./dist/styles.bundle.css', 'elements/styles.css');
  console.log('Elements created successfully');
}

buildElement();
