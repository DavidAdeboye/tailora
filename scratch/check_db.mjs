import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lxbijlrjjtamiyefdohs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmlqbHJqanRhbWl5ZWZkb2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM5MTk5NCwiZXhwIjoyMDk2OTY3OTk0fQ.CRgp4iigm2V8FsgW0KxwSKBilCpvhkJlr-U5JoLnoNU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('--- Profiles ---');
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
  console.log(pErr || profiles);

  console.log('--- Clients ---');
  const { data: clients, error: cErr } = await supabase.from('clients').select('*');
  console.log(cErr || clients);

  console.log('--- Orders ---');
  const { data: orders, error: oErr } = await supabase.from('orders').select('*');
  console.log(oErr || orders);

  console.log('--- Team Members ---');
  const { data: team, error: tErr } = await supabase.from('team_members').select('*');
  console.log(tErr || team);
}

main();
