const { Pool } = require('pg');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://neondb_owner:npg_t0naGIiDgWx1@ep-divine-bread-atgnv0kk-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'ace_medicare_salt').digest('hex');
}

async function createUser() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  
  try {
    // First, check if users table exists
    const checkTable = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    
    if (!checkTable.rows[0].exists) {
      // Create users table if it doesn't exist
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
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
      const checkColumn = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'username'
        );
      `);
      
      if (!checkColumn.rows[0].exists) {
        // Add username column if it doesn't exist
        await pool.query(`ALTER TABLE users ADD COLUMN username TEXT UNIQUE;`);
        console.log('Added username column to users table');
      }
    }
    
    // Insert or update the user
    const username = 'Daniel';
    const password = '3776+dgf7ue';
    const passwordHash = hashPassword(password);
    
    const result = await pool.query(`
      INSERT INTO users (username, password_hash, role, first_name, last_name)
      VALUES ($1, $2, 'admin', 'Daniel', 'Admin')
      ON CONFLICT (username) DO UPDATE SET password_hash = $2
      RETURNING *;
    `, [username, passwordHash]);
    
    console.log('User created/updated:', result.rows[0]);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

createUser();
