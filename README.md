# Playwright Demo
created by: Budi Sugianto

[![E2E Tests](https://github.com/mcbuddy/playwright-demo/actions/workflows/main.yml/badge.svg)](https://github.com/mcbuddy/playwright-demo/actions/workflows/main.yml)

This Playwright Test build using NodeJS Version: `v14.16.1`.

#### Project Structure

    playwright-demo
    ├─> .github/
    │   └─> workflows/main.yml        // Github Actions workflows 
    ├─> pages/                        // Page Object Directory Files
    │   ├─> app-manager.page.ts
    │   ├─> dashboard.page.ts
    │   ├─> live-app.page.ts
    │   ├─> login.page.ts   
    ├─> tests/
    │   ├─> filter_inventory.spec.ts          // 2nd Test
    │   ├─> randomize_color_warning.spec.ts   // 1st Test
    ├── playwright.config.ts
    ├── package-lock.json
    ├── package.json
    └── README.md

#### Setup and Install programs to Unix-based Machine
Prerequisite:
- NodeJS [Installation](https://nodejs.org/en/download/)

Install all dependecies:
```
npm install
```

To run the test locally:
```
// To Run all tests
TEST_EMAIL=<your_email> TEST_PASSWORD=<your_password> npx playwright test --workers=1 
  
  - OR -

// To Run specific test  
TEST_EMAIL=<your_email> TEST_PASSWORD=<your_password> npx playwright test <filename> --workers=1
```

#### Github Action CI Build [![E2E Tests](https://github.com/mcbuddy/playwright-demo/actions/workflows/main.yml/badge.svg)](https://github.com/mcbuddy/playwright-demo/actions/workflows/main.yml)
The CI Build included and basically it will run all the test for each push and pull-request. 
Feel free to acess and check that out, Click the Github Action badge on this README file. 

 > *Feel free to ask/send me any questions or concerns to my email: budisugianto777@gmail.com*
