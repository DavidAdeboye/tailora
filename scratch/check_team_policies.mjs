import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lxbijlrjjtamiyefdohs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmlqbHJqanRhbWl5ZWZkb2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM5MTk5NCwiZXhwIjoyMDk2OTY3OTk0fQ.CRgp4iigm2V8FsgW0KxwSKBilCpvhkJlr-U5JoLnoNU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const { data: policies, error } = await supabase.rpc('get_policies_for_team_members'); // Wait, get_policies might not exist.
  // Instead, let's select from pg_policies using an RPC if available, or just query team_members table directly.
  console.log('Querying team_members table using service key:');
  const { data, error: err } = await supabase.from('team_members').select('*');
  console.log('Result length:', data ? data.length : 0);
  console.log(data);
}

main();
