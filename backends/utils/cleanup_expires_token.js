const cron = require('node-cron');
const db = require('../config/db');

const cleanUpExpiredTokens = async () => {
    try {
        const result_token_register = await db.query('DELETE FROM unverified_email_register WHERE expires_at < NOW()');
        const result_token_lupa_password = await db.query('DELETE FROM unverified_email_lupa_password WHERE expires_at < NOW()');
        console.log(`Cleaned up ${result_token_register.rowCount} expired register tokens and ${result_token_lupa_password.rowCount} expired lupa password tokens`);
    } catch (err) {
        console.error('Error cleaning up expired tokens:', err);
    }
};

// Schedule the task to run every hour
cron.schedule('*/3 * * * *', cleanUpExpiredTokens);