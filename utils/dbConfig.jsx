import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://Expense-Tracker_owner:FPNWtLnmR7o8@ep-dark-darkness-a54tyy7u.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require');
export const db = drizzle(sql,{schema});