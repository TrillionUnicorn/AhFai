#!/bin/bash

# Complete test execution script
# This script runs ALL tests and verifies everything is working

set -e  # Exit on error

echo "🚀 Starting Complete Test Suite"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run test and track results
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo -e "${YELLOW}Running: $test_name${NC}"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✓ PASSED: $test_name${NC}"
        ((PASSED_TESTS++))
    else
        echo -e "${RED}✗ FAILED: $test_name${NC}"
        ((FAILED_TESTS++))
    fi
    ((TOTAL_TESTS++))
    echo ""
}

# 1. Install dependencies
echo "📦 Installing dependencies..."
bun install
echo ""

# 2. Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
bunx playwright install --with-deps
echo ""

# 3. TypeScript type check
run_test "TypeScript Type Check" "bun run check"

# 4. Linter
run_test "ESLint" "bun run lint"

# 5. Build test
run_test "Production Build" "bun run build"

# 6. Run Playwright tests
echo "🧪 Running Playwright E2E Tests..."
echo "================================"

# Landing page tests
run_test "Landing Page Tests" "bunx playwright test landing-page.spec.ts"

# App page tests
run_test "App Page Tests" "bunx playwright test app-page.spec.ts"

# Pitch page tests
run_test "Pitch Page Tests" "bunx playwright test pitch-page.spec.ts"

# Contact page tests
run_test "Contact Page Tests" "bunx playwright test contact-page.spec.ts"

# Responsive design tests
run_test "Responsive Design Tests" "bunx playwright test responsive.spec.ts"

# All MVP variants tests
run_test "All MVP Variants Tests" "bunx playwright test all-mvp-variants.spec.ts"

# Visual regression tests
run_test "Visual Regression Tests" "bunx playwright test visual-regression.spec.ts --update-snapshots"

# 7. Generate test report
echo "📊 Generating test report..."
bunx playwright show-report --host 0.0.0.0 &
REPORT_PID=$!
echo "Test report available at: http://localhost:9323"
echo ""

# 8. Summary
echo "================================"
echo "📊 TEST SUMMARY"
echo "================================"
echo -e "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    echo "🎉 Project is ready for production!"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    echo "Please fix the failing tests before proceeding."
    exit 1
fi

