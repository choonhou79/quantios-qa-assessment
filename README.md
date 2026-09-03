# Quantios QA Analyst Assessment

This repository contains my solution for the Quantios QA Analyst take-home assessment.

The assessment includes:

- UI automation for a successful login using Playwright.
- REST API testing for `watchlist_post` and `watchlist_get` using Postman/Newman.

## Project Structure

```text
quantios-qa-assessment/
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── tests/
│   └── login.spec.ts
├── postman/
│   └── Quantios-Watchlist.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js
- npm
- Postman (optional, if running the API collection manually)

## Setup

Install the project dependencies:

```bash
npm install
```

Install the Playwright browser:

```bash
npx playwright install
```

Create a test account manually from the application's **Create new user** page if a valid account is not already available.

Copy `.env.example` to `.env` and provide the valid test credentials:

```env
BASE_URL=https://qainterview.netlify.app/
QA_USERNAME=<valid username>
QA_PASSWORD=<valid password>
```

The `.env` file is excluded from Git and should not be committed.

---

## UI Automation

The Playwright test covers a successful login using a valid test account.

### Test Flow

1. Open the login page.
2. Enter a valid username and password.
3. Verify the Login button is enabled.
4. Click Login.
5. Verify navigation to `dashboard.html`.
6. Verify the greeting contains the logged-in username.
7. Verify the Logout button is visible.

### Run UI Test

Run in headless mode:

```bash
npm test
```

Run with the browser visible:

```bash
npm run test:headed
```

Run in debug mode:

```bash
npm run test:debug
```

View the Playwright HTML report:

```bash
npm run report
```

---

## API Testing

The Postman collection contains automated tests for:

- `watchlist_post`
- `watchlist_get`

### watchlist_post

Adds Apple Inc. (`AAPL`) to the user's watchlist.

Request:

```text
POST {{baseUrl}}/watchlist_post
```

The test verifies:

- HTTP status code is `201`.
- Response message is `Added to watchlist.`

### watchlist_get

Retrieves the watchlist for the specified user.

Request:

```text
GET {{baseUrl}}/watchlist_get?username={{username}}
```

The test verifies:

- HTTP status code is `200`.
- Response body is an array.
- The watchlist contains `AAPL`.
- The returned stock name is `Apple Inc.`

### Run API Tests

The Postman collection can be executed from the command line using Newman:

```bash
npm run test:api
```

Expected result:

```text
watchlist_post
✓ Status code is 201
✓ Stock is added successfully

watchlist_get
✓ Status code is 200
✓ Response body is an array
✓ Watchlist contains AAPL
```

The collection can also be imported and executed manually in Postman.

If `AAPL` already exists in the user's watchlist, remove it before running `watchlist_post` again or use another test account.

---

## Run All Tests

To run both the Playwright UI test and the API tests:

```bash
npm run test:all
```

This executes:

```text
Playwright UI Test
        ↓
Successful Login
        ↓
Postman/Newman API Tests
        ↓
watchlist_post
        ↓
watchlist_get
```

## Notes

- Login credentials are stored locally in `.env` and are not committed to the repository.
- `.env.example` is provided as a reference for the required environment variables.
- Playwright is used for UI automation.
- Postman/Newman is used for REST API testing.