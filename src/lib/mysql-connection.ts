// MySQL Connection Utility
// IMPORTANT: This file is for reference only
// To use this, you need to install mysql2: npm install mysql2
// Usage: Import and use the query function to execute SQL queries

// Uncomment the import below after installing mysql2
// import mysql from 'mysql2/promise';

// Type definitions for when mysql2 is installed
type Pool = any;
type PoolConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
};

// MySQL Connection Configuration
const dbConfig: PoolConfig = {
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
let pool: Pool | null = null;

export const getPool = () => {
  if (!pool) {
    // Uncomment after installing mysql2
    // pool = mysql.createPool(dbConfig);
    throw new Error('MySQL not configured. Install mysql2 and uncomment the import.');
  }
  return pool;
};

// Execute a query
export const query = async (sql: string, params?: any[]) => {
  try {
    const connection = getPool();
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Example usage:
// const results = await query('SELECT * FROM questions WHERE topic = ?', ['Inheritance']);
