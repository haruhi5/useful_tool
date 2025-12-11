# Testing & Pre-Commit Enforcement

Tests run automatically before commits and before deployment.

## Local Testing (Pre-Commit Hook)

When you run `git commit`:

1. **Pre-commit hook runs tests** automatically
2. **Only tests changed code** (backend OR frontend)
3. Tests fail → **Commit BLOCKED** ❌
4. Tests pass → **Commit allowed** ✅

## Test Commands

```bash
npm test              # All tests
cd frontend && npm test  # Frontend only
cd backend && npm test   # Backend only
```

## GitHub Actions (Remote Testing)

On every push to `main`:

1. Frontend workflow runs tests
2. Backend workflow runs tests
3. If tests fail → **Deployment blocked** ❌
4. If tests pass → **Auto-deploys** ✅

## Setup (One Time)

```bash
npm install
```

Husky automatically configures git hooks. No additional setup needed!

## Emergency Bypass

```bash
git commit --no-verify
```

⚠️ Not recommended - defeats the purpose of testing

## Configuration Files

- **Pre-commit hook:** `.husky/pre-commit.js`
- **Frontend tests:** `frontend/src/**/*.spec.js` (Vitest)
- **Backend tests:** `backend/**/*.test.js` (Vitest)
- **Deploy workflow:** `.github/workflows/deploy-frontend.yml`
- **Backend workflow:** `.github/workflows/test-backend.yml`
npm test

# Test only backend
cd backend && npm test

# Test only frontend
cd frontend && npm test

# Run with UI (frontend)
cd frontend && npm run test:ui
```

## Bypassing (Emergency Only)

If you absolutely must commit without tests:

```bash
git commit --no-verify
```

⚠️ **Not recommended** - defeats the purpose!

## Troubleshooting

**"npm: command not found" in pre-commit hook**
- Make sure Node.js is installed: `node --version`
- Reinstall: `npm install`

**"Permission denied" on Windows**
- Husky should handle this automatically
- If issues: `npx husky install`

**Tests not running before commit**
- Check hooks are installed: `ls .git/hooks/pre-commit`
- Reinstall Husky: `npm run prepare`

## Project Safety

You now have **two layers of protection**:

```
Your Computer          →  GitHub
  ↓                         ↓
git commit             github push
  ↓                         ↓
[TESTS RUN]            [TESTS RUN]
  ↓                         ↓
commit allowed?        push allowed?
  ↓                         ↓
YES → commit          YES → deploy
NO → BLOCKED          NO → BLOCKED
```

This ensures:
- ✅ No broken code gets committed locally
- ✅ No broken code gets pushed to GitHub
- ✅ No broken code gets deployed
