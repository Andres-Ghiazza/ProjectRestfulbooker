# RestfulBooker API Tests
Automated API testing project for the RestfulBooker public API using Playwright's built-in request context.
This project was created as part of my QA Automation portfolio to demonstrate:
- API test automation
- Authentication token handling
- CRUD operations testing (Create, Read, Update, Delete)
- Sequential test execution for stateful flows
- Assertions and validations
- Clean and maintainable test architecture
---
# Technologies Used
- JavaScript
- Playwright (API testing)
- Node.js
- Claude Sonnet 4.6 (Anthropic) - Error correction and good practices
- Git / GitHub - Version Control
---
# Project Structure
```bash
├── tests/
│   └── booking.spec.js
├── utils/
│   └── auth.js
├── playwright.config.js
└── README.md
```
---
# Endpoints Covered
| Method | Endpoint        | Requires Auth | Description                    |
|--------|-----------------|:---:|---------------------------------|
| POST   | `/booking`      | ❌ | Create a new booking            |
| GET    | `/booking/{id}` | ❌ | Retrieve a specific booking      |
| PUT    | `/booking/{id}` | ✅ | Fully update a booking           |
| PATCH  | `/booking/{id}` | ✅ | Partially update a booking       |
| DELETE | `/booking/{id}` | ✅ | Delete a booking                 |
| POST   | `/auth`         | ❌ | Retrieve an authentication token |
---
# Automated Test Scenarios
- Create a new booking
- Retrieve a specific booking by ID
- Update a booking with authentication
- Partially update a booking with authentication
- Delete a booking with authentication
- Verify a booking no longer exists after deletion
---
# Dependencies installation
- Clone the repository:
- git clone https://github.com/Covert-Flamingo/Restfulbooker.git
- npm install
- Install Playwright browsers:
- npx playwright install
---
# Run all tests
- npx playwright test
- Run tests in headed mode:
- npx playwright test --headed
- Open Playwright UI mode:
- npx playwright test --ui
---
Test Report
You can view the generated automation report here:
https://covert-flamingo.github.io/ProjectRestfulbooker/
