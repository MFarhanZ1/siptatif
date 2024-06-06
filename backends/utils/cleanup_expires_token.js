const cron = require('node-cron');
const db = require('../config/db');

const cleanUpExpiredTokens = async () => {
    try {
        const result = await db.query('DELETE FROM unverified_emails WHERE expires_at < NOW()');
        console.log(`Cleaned up ${result.rowCount} expired tokens`);
    } catch (err) {
        console.error('Error cleaning up expired tokens:', err);
    }
};

// Schedule the task to run every hour
cron.schedule('* * * * *', cleanUpExpiredTokens);