# Prism — Complete User Stories

> **Prism: See your finances from every angle.**
> Full-stack personal finance dashboard with auth, CRUD, search/filter, and projections.

---

## 1. Authentication

### 1.1 Sign Up
As a new user, I want to create an account with my email and password so I can access the dashboard.

- I can navigate to `/signup` from the sign-in page
- I enter my email and password (minimum 6 characters)
- The form validates input and shows errors inline
- On success, I am automatically signed in and redirected to the dashboard
- Duplicate emails show an error message

### 1.2 Sign In
As a returning user, I want to sign in with my credentials so I can access my data.

- I can navigate to `/signin` from the sign-up page or the sidebar
- I enter my email and password
- Invalid credentials show an error message
- If I just signed up, a success banner appears at the top of the sign-in form
- On success, I am redirected to the dashboard

### 1.3 Session Persistence
As an authenticated user, I want my session to persist across page reloads so I don't have to sign in repeatedly.

- My session is maintained via JWT stored in an httpOnly cookie
- The sidebar shows my user info (initials avatar, name, email) when signed in
- Unauthenticated users see a "Sign In" link instead

### 1.4 Sign Out
As an authenticated user, I want to sign out with a confirmation step so I don't log out accidentally.

- I click "Sign Out" in the sidebar's Account section
- A confirmation dialog asks "Are you sure you want to sign out?"
- Confirming signs me out and returns me to the sign-in page
- Cancelling closes the dialog without signing out

### 1.5 Delete Account
As a user, I want to permanently delete my account and all associated data.

- I click "Delete Account" in the sidebar's Account section
- A confirmation dialog requires me to type **DELETE** to confirm
- The "Confirm Delete" button is disabled until I type the exact word
- Confirming deletes all my transactions, budgets, pots, and account data
- I am signed out automatically after deletion

---

## 2. Navigation

### 2.1 Responsive Sidebar
As a user, I want to navigate between pages through a sidebar on desktop and a bottom bar on mobile.

- On desktop (≥768px): a vertical sidebar on the left with all page links
- On mobile (<768px): a horizontal bottom navigation bar
- The active page is highlighted with a green accent bar
- Hovering shows a subtle highlight

### 2.2 User Indicator
As an authenticated user, I want to see which account I'm logged into.

- My initials avatar and email are displayed in a glass card below the brand
- The card is visible on desktop, hidden on mobile

### 2.3 Account Section
As a user, I want sign-out and account-deletion grouped together and visually separated from main navigation.

- A gradient divider separates nav items from account actions
- An "ACCOUNT" section header labels the group
- Sign Out and Delete Account sit below the header

---

## 3. Overview Page (`/`)

### 3.1 Summary Cards
As a user, I want to see my key financial metrics at a glance.

- Current Balance card (dark background, prominent)
- Total Income card (white background)
- Total Expenses card (white background)
- All values are formatted as currency

### 3.2 Recent Transactions
As a user, I want to see my most recent 5 transactions on the overview.

- Each transaction shows: avatar/initials, name, category, date, amount
- Positive amounts (income) are green, negative (expenses) are black
- Long transaction names are truncated to fit the layout

### 3.3 Budget Summary
As a user, I want to see a donut chart of my budget spending on the overview.

- A Recharts donut chart shows spending by category with theme colors
- A legend lists each category with its theme color, spent amount, and maximum
- The chart center shows total spent vs total budgeted

### 3.4 Pots Summary
As a user, I want to see my savings pots summary on the overview.

- A "Total Saved" box shows the sum of all pots
- A 2x2 grid shows the four most recent pots with name, amount, and progress bar
- Each pot uses its theme color for the progress bar

### 3.5 Recurring Bills Summary
As a user, I want to see a summary of my recurring bills on the overview.

- Count of paid bills
- Count of upcoming bills (next 30 days)
- Count of overdue bills (past due)
- Each count links to the bills page

### 3.6 Net Worth Card
As a user, I want to see my total net worth (total income − total expenses) on the overview.

- A card displays the net worth figure
- Calculated as total income minus total expenses across all transactions
- Updated automatically as transactions change

### 3.7 Cash Flow Card
As a user, I want to see a 90-day cash flow projection on the overview.

- A card shows projected future income and expenses
- Based on recurring patterns from historical transaction data
- Helps anticipate future account balance

---

## 4. Transactions Page (`/transactions`)

### 4.1 Paginated Transaction List
As a user, I want to browse all my transactions with pagination.

- Table columns: avatar, transaction name, category, date, amount, recurring badge
- 10 transactions per page
- "Prev" and "Next" buttons to navigate pages
- Current page is clearly indicated

### 4.2 Search
As a user, I want to search transactions by name.

- A search input filters transactions in real-time
- Matches against transaction names (case-insensitive)

### 4.3 Category Filter
As a user, I want to filter transactions by category.

- A dropdown with all available categories (e.g. Entertainment, Food, Transport, etc.)
- Selecting a category shows only matching transactions
- "All" option resets the filter

### 4.4 Subtype Filter
As a user, I want to filter by transaction subtype (income or expense).

- A dropdown with "All Transactions", "Income", and "Expense" options
- Shows only transactions matching the selected subtype

### 4.5 Tag Filter
As a user, I want to filter transactions by tags.

- A dropdown with all available tags
- Selecting a tag shows transactions with that tag
- Tag badges are visible on each transaction row

### 4.6 Date Range Filter
As a user, I want to filter transactions by a date range.

- Start date and end date inputs
- Only transactions within the range are shown
- Cleared when not in use

### 4.7 Sort
As a user, I want to sort transactions by date, amount, or name.

- A sort dropdown with options: Latest, Oldest, A-Z, Z-A, Highest, Lowest
- Transactions reorder based on the selected option

### 4.8 Recurring Badge
As a user, I want to see which transactions are recurring at a glance.

- Recurring transactions show a "Recurring" badge
- Non-recurring transactions show no badge
- Badge is visible in the table row

### 4.9 CSV Export
As a user, I want to export all my transactions to a CSV file.

- An "Export CSV" link is available on the transactions page
- Clicking downloads a CSV with all transactions
- CSV includes: date, name, category, amount, subtype, tags

---

## 5. Budgets Page (`/budgets`)

### 5.1 Budget Cards
As a user, I want to see all my budgets as cards with progress.

- Each card shows: category name, theme color (as an accent), maximum amount, spent amount
- A progress bar visually shows spending vs maximum
- The progress bar uses the category's theme color
- The remaining amount is shown

### 5.2 Create Budget
As a user, I want to create a new budget with a category and spending limit.

- A button opens a form dialog
- I select a category from a predefined list
- Selecting a category auto-fills the theme color
- I enter a maximum spending amount
- The form validates that both fields are provided
- On submit, the budget is saved and appears in the list
- Zod validation ensures correct data types

### 5.3 Spend Calculation
As a user, I want each budget to accurately reflect my current spending.

- Spending is calculated from transactions in that category for the current month
- Auto-updates as new transactions are added

---

## 6. Pots Page (`/pots`)

### 6.1 Pot Cards
As a user, I want to see all my savings pots with progress.

- Each card shows: pot name, theme color (as an accent), saved amount, target amount
- A progress bar shows saved amount vs target
- The progress bar uses the pot's theme color
- The percentage saved is displayed

### 6.2 Create Pot
As a user, I want to create a new savings pot.

- A button opens a form dialog
- I enter a pot name, target amount, and select a theme color
- All fields are required with Zod validation
- On submit, the pot is saved and appears in the list

### 6.3 Add to Pot
As a user, I want to add money to an existing pot.

- Each pot card has an "Add" button
- Clicking opens a dialog with an amount input
- The amount is validated (positive number, required)
- On confirm, the pot's saved amount increases

### 6.4 Withdraw from Pot
As a user, I want to withdraw money from a pot.

- Each pot card has a "Withdraw" button
- Clicking opens a dialog with an amount input
- The amount is validated (positive number, can't exceed saved amount)
- On confirm, the pot's saved amount decreases

---

## 7. Recurring Bills Page (`/bills`)

### 7.1 Bill List
As a user, I want to see all my recurring bills with their payment status.

- Each bill shows: avatar, name, amount, due date
- Status badges: "Paid" (green), "Upcoming" (grey), "Overdue" (red)
- Bills are searchable by name

### 7.2 Status Summary Counts
As a user, I want to see summary counts of my bill statuses.

- Total count of paid bills
- Total count of upcoming bills (due within 30 days)
- Total count of overdue bills

### 7.3 Subscription Radar
As a user, I want to auto-detect potential subscriptions from my transaction history.

- A widget on the bills page shows detected subscriptions
- Subscriptions are identified by recurring patterns (same amount, monthly cadence)
- Each detected subscription shows: merchant name, amount, frequency

---

## 8. Data Model

### 8.1 User
Each user has:
- Email (unique, used for authentication)
- Hashed password (bcrypt)
- Name (auto-derived from email)
- Associated transactions, budgets, pots
- One-click export and deletion of all data

### 8.2 Transaction
Each transaction has:
- Avatar, name, category, amount, date
- Subtype (income/expense) and tags
- Recurring flag
- User association

### 8.3 Budget
Each budget has:
- Category, maximum amount
- Theme color (auto-assigned from category)
- User association
- Spent amount (calculated from transactions)

### 8.4 Pot
Each pot has:
- Name, target amount, saved amount
- Theme color
- User association
- Add/withdraw capability

---

## 9. Technical Notes

- **Stack**: Next.js App Router, TypeScript, Tailwind CSS, tRPC, Prisma, PostgreSQL/SQLite
- **Auth**: NextAuth.js v5 with Credentials provider, JWT strategy, bcrypt password hashing
- **Validation**: Zod schemas for all form inputs
- **State**: TanStack Query for server state, Server Actions for mutations
- **Testing**: Vitest + React Testing Library + MSW — 163+ tests covering all critical paths
- **Accessibility**: WCAG 2.2 AA — semantic HTML, keyboard navigation, 4.5:1 contrast, touch targets ≥48dp
- **Responsive**: Mobile-first — 320px to ultrawide, three viewport classes
