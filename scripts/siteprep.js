#!/usr/bin/env node
'use strict';

/**
* This script creates pages for all examples for the website.
*/

const fs = require('fs');
const examples = require('../_data/figures.json');
//const { execSync } = require('child_process');
// const svg2png = require('svg2png-many');

function createPage(example) {
  return (`---
layout: page
menu: examples
${example.caption ? `description: ${example.caption}`: ''}
title: ${example.title}
permalink: /examples/${example.name}.html
image: /img/${example.name}.png
number: ${example.number}
spec: ${example.spec}
---
${example.caption || ''}
`);
}

//${example.caption || ''}
// {% include example.html spec='${example.spec}'%}
//`);
//}


//const fileMap = {};


for (const group of examples) {
        for (const child of group.children ) {
                const example  = Object.assign({}, child);
                child.name = child.spec.split(".")[0];
                console.log( child.name );
                fs.writeFileSync(`examples/${child.name}.md`, createPage(child));
//    fileMap[`examples/compiled/${name}.svg`] = `examples/compiled/${name}.png`;
  }
}

// svg2png.svg2PngFiles(fileMap)

