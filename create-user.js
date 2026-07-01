const { Pool } = require('pg');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://neondb_owner:npg_t0naGIiDgWx1@ep-divine-bread-atgnv0kk-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'ace_medicare_salt').digest('hex');
}

async function createUser() {
  console.log('Connecting to Neon DB...');
  const pool = new Pool({ connectionString: DATABASE_URL });
  
  try {
    // First, test the connection
    const testQuery = await pool.query('SELECT NOW()');
    console.log('Connected to DB successfully, current time:', testQuery.rows[0].now);
    
    // Check if users table exists
    console.log('Checking if users table exists...');
    const checkTable = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    console.log('Users table exists:', checkTable.rows[0].exists);
    
    if (!checkTable.rows[0].exists) {
      // Create users table if it doesn't exist
      console.log('Creating users table...');
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'patient',
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          staff_id INTEGER,
          patient_id INTEGER,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        );
      `);
      console.log('Created users table');
    } else {
      // Check if username column exists
      console.log('Checking if username column exists...');
      const checkColumn = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'username'
        );
      `);
      console.log('Username column exists:', checkColumn.rows[0].exists);
      
      if (!checkColumn.rows[0].exists) {
        // Add username column if it doesn't exist
        console.log('Adding username column...');
        await pool.query(`ALTER TABLE users ADD COLUMN username TEXT UNIQUE;`);
        console.log('Added username column to users table');
      }

      // Check if email column exists
      console.log('Checking if email column exists...');
      const checkEmailColumn = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'email'
        );
      `);
      console.log('Email column exists:', checkEmailColumn.rows[0].exists);
      
      if (!checkEmailColumn.rows[0].exists) {
        // Add email column if it doesn't exist
        console.log('Adding email column...');
        await pool.query(`ALTER TABLE users ADD COLUMN email TEXT UNIQUE;`);
        console.log('Added email column to users table');
      }
    }
    
    // Insert or update the user
    const username = 'admin';
    const email = 'admin@acemedicare.nhs.uk';
    const password = 'password123';
    const passwordHash = hashPassword(password);
    console.log('Upserting user...');
    
    const result = await pool.query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name)
      VALUES ($1, $2, $3, 'admin', 'Admin', 'User')
      ON CONFLICT (username) DO UPDATE SET password_hash = $3, email = $2
      RETURNING *;
    `, [username, email, passwordHash]);
    
    console.log('User created/updated successfully:', result.rows[0]);
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Stack trace:', err.stack);
  } finally {
    console.log('Closing DB connection...');
    await pool.end();
  }
}

createUser();
