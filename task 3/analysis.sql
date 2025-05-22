-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Insert sample data
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Analysis Queries

-- 1. Total sales volume for March 2024
SELECT 
    SUM(amount) as march_sales,
    'Total sales for March 2024' as description
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent,
    'Top spending customer' as description
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Calculate the average order value
SELECT 
    ROUND(AVG(amount), 2) as avg_order_value,
    'Average order value' as description
FROM orders;

-- Additional Analysis (Bonus)

-- Monthly sales breakdown
SELECT 
    strftime('%Y-%m', order_date) as month,
    SUM(amount) as total_sales,
    COUNT(*) as number_of_orders,
    ROUND(AVG(amount), 2) as avg_order_value
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month;

-- Customer order frequency
SELECT 
    customer,
    COUNT(*) as number_of_orders,
    SUM(amount) as total_spent,
    ROUND(AVG(amount), 2) as avg_order_value
FROM orders
GROUP BY customer
ORDER BY total_spent DESC; 