#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/../.."
pnpm install --frozen-lockfile
pnpm run verify:layout
