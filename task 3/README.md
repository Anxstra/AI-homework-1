# SQL Query Analysis: Online Store Sales

A collection of SQL queries to analyze sales data for an online store using SQLite.

## Database Schema

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);
```

## Sample Data

```sql
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');
```

## Analysis Tasks

1. Calculate total sales volume for March 2024
2. Find the customer with highest total spending
3. Calculate average order value

## SQL Queries and Results

### 1. Total Sales for March 2024

```sql
SELECT SUM(amount) as march_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
```

Expected Result: 27,000

### 2. Top-Spending Customer

```sql
SELECT customer, SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
```

Expected Result: Alice (20,000)

### 3. Average Order Value

```sql
SELECT ROUND(AVG(amount), 2) as avg_order_value
FROM orders;
```

Expected Result: 6,000

## How to Run

1. Visit [SQLite Online](https://sqliteonline.com/)
2. Copy and paste the table creation script
3. Copy and paste the data insertion script
4. Run each analysis query separately to see the results

## Notes

- All amounts are in currency units (e.g., dollars)
- Dates are in YYYY-MM-DD format
- The database contains orders from February and March 2024 