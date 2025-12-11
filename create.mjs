#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const args = process.argv.slice(2)
const command = args[0]
const name = args[1]

if (!command || !name) {
  console.log(`
Usage: npm run create -- <command> <name>

Commands:
  tool    Create a new tool
  doc     Create a new documentation page

Examples:
  npm run create -- tool my-calculator
  npm run create -- doc deployment-guide
  `)
  process.exit(1)
}

// Normalize name (kebab-case)
const normalizedName = name.toLowerCase().replace(/\s+/g, '-')

if (command === 'tool') {
  createTool(normalizedName)
} else if (command === 'doc') {
  createDoc(normalizedName)
} else {
  console.error(`Unknown command: ${command}`)
  process.exit(1)
}

function createTool(toolName) {
  const toolDir = path.join(__dirname, 'tools', toolName)

  if (fs.existsSync(toolDir)) {
    console.error(`❌ Tool ${toolName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(toolDir, { recursive: true })

  // Create component template
  const componentContent = `<template>
  <div class="tool-container">
    <h2>${toolName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
    <!-- Add your tool content here -->
    <p>Your tool implementation goes here</p>
  </div>
</template>

<script setup>
// Add your tool logic here
</script>

<style scoped>
.tool-container {
  padding: 2rem;
}
</style>
`

  // Create README
  const readmeContent = `# ${toolName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

## Description
Brief description of what this tool does.

## Features
- Feature 1
- Feature 2

## Usage
Explain how to use this tool.

## API Endpoints
If your tool has backend integration:
- \`GET /api/tools/${toolName}\` - Get tool details
- \`POST /api/tools/${toolName}/data\` - Submit data

## Testing
\`\`\`bash
npm test
\`\`\`
`

  // Create test file
  const testContent = `import { describe, it, expect } from 'vitest'

describe('${toolName} tool', () => {
  it('should render the component', () => {
    // Add your tests here
    expect(true).toBe(true)
  })
})
`

  fs.writeFileSync(path.join(toolDir, 'index.vue'), componentContent)
  fs.writeFileSync(path.join(toolDir, 'README.md'), readmeContent)
  fs.writeFileSync(path.join(toolDir, '${toolName}.spec.js'), testContent)

  console.log(`✅ Tool '${toolName}' created successfully!`)
  console.log(`📁 Location: tools/${toolName}/`)
  console.log(`\nNext steps:
1. Edit tools/${toolName}/index.vue to build your tool
2. Add backend route in backend/routes/tools.js if needed
3. Register in frontend/src/App.vue
  `)
}

function createDoc(docName) {
  const docDir = path.join(__dirname, 'docs')
  const docPath = path.join(docDir, `${docName}.md`)

  if (fs.existsSync(docPath)) {
    console.error(`❌ Document ${docName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(docDir, { recursive: true })

  const docContent = `# ${docName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

## Overview
Brief overview of this documentation.

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Advanced Topics](#advanced-topics)

## Introduction
Detailed introduction here.

## Getting Started
Step-by-step guide here.

## Advanced Topics
More advanced information here.

## Troubleshooting
Common issues and solutions.

## Resources
- Link 1
- Link 2
`

  fs.writeFileSync(docPath, docContent)

  console.log(`✅ Document '${docName}' created successfully!`)
  console.log(`📄 Location: docs/${docName}.md`)
  console.log(`\nNext steps:
1. Edit docs/${docName}.md to add your content
2. Update docs/README.md if needed to link to this doc
  `)
}
