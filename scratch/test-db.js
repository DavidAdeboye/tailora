const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lxbijlrjjtamiyefdohs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmlqbHJqanRhbWl5ZWZkb2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTE5OTQsImV4cCI6MjA5Njk2Nzk5NH0.kTsIcP6N2MPqFP0lLvNdr2Dzlsamg7XtXDvW0AHZKrc';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function run() {
  console.log('Connecting to Supabase...');
  try {
    const start = Date.now();
    const { data, error } = await supabase.rpc('verify_signup_otp', {
      p_email: 'test@example.com',
      p_otp: '123456'
    });
    console.log('RPC execution time:', Date.now() - start, 'ms');
    if (error) {
      console.error('RPC Error:', error);
    } else {
      console.log('RPC Result:', data);
    }
  } catch (err) {
    console.error('Catch Error:', err);
  }
}

run();
