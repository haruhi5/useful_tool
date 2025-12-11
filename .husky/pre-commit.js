const { execSync } = require('child_process');
const fs = require('fs');

console.log('\n🧪 Running tests before commit...\n');

const getChangedFiles = () => {
  try {
    return execSync('git diff --cached --name-only', { encoding: 'utf-8' }).split('\n');
  } catch {
    return [];
  }
};

const changedFiles = getChangedFiles();
let hasBackendChanges = false;
let hasFrontendChanges = false;

changedFiles.forEach(file => {
  if (file.startsWith('backend/')) hasBackendChanges = true;
  if (file.startsWith('frontend/')) hasFrontendChanges = true;
});

try {
  // Test backend if changed
  if (hasBackendChanges) {
    console.log('📦 Testing backend...');
    execSync('cd backend && npm test', { stdio: 'inherit' });
    console.log('✅ Backend tests passed\n');
  }

  // Test frontend if changed
  if (hasFrontendChanges) {
    console.log('💻 Testing frontend...');
    execSync('cd frontend && npm test', { stdio: 'inherit' });
    console.log('✅ Frontend tests passed\n');
  }

  if (!hasBackendChanges && !hasFrontendChanges) {
    console.log('✨ No code changes detected, skipping tests\n');
  }

  console.log('✨ All tests passed! Commit allowed.\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Tests failed! Commit blocked.');
  process.exit(1);
}
