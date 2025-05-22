# API Testing: Product Data Validation

An automated testing suite for validating product data from the FakeStore API.

## Features

- Validates server response code
- Checks product data integrity:
  - Title validation (non-empty)
  - Price validation (non-negative)
  - Rating validation (not exceeding 5)
- Generates detailed defect reports

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the project directory:
   ```bash
   cd task\ 2
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Tests

Execute the test suite:
```bash
npm test
```

The test output will show:
- Test results for API response
- Test results for product data validation
- A detailed report of any defective products found

## Test Cases

1. Server Response Test
   - Verifies that the API responds with status code 200

2. Product Attribute Tests
   - Validates that each product has:
     - Non-empty title
     - Non-negative price
     - Rating not exceeding 5

3. Defect Reporting
   - Generates a list of products with defects
   - Shows detailed information about each defect

## Technologies Used

- TypeScript
- Jest
- Axios
- ts-jest 