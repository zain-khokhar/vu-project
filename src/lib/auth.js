/**
 * Admin Authentication Utilities
 * Simple authentication for admin routes
 */

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

export function validateAdminCredentials(username, password) {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    // Set session in localStorage (in production, use secure cookies)
    localStorage.setItem('adminSession', 'true');
    localStorage.setItem('adminTimestamp', Date.now().toString());
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminTimestamp');
  }
}

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem('adminSession');
  const timestamp = localStorage.getItem('adminTimestamp');
  
  if (!session || !timestamp) return false;
  
  // Check if session is older than 24 hours
  const sessionAge = Date.now() - parseInt(timestamp);
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxAge) {
    clearAdminSession();
    return false;
  }
  
  return session === 'true';
}

export function requireAdminAuth() {
  if (!isAdminAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return false;
  }
  return true;
}