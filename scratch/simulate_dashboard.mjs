import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lxbijlrjjtamiyefdohs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmlqbHJqanRhbWl5ZWZkb2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM5MTk5NCwiZXhwIjoyMDk2OTY3OTk0fQ.CRgp4iigm2V8FsgW0KxwSKBilCpvhkJlr-U5JoLnoNU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function simulate(workspaceOwnerId, role = 'Owner', memberName = '') {
  console.log(`\n================ SIMULATING FOR owner_id: ${workspaceOwnerId}, role: ${role} ================`);
  
  // 1. Clients count
  const { count: cCount, error: cCountErr } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', workspaceOwnerId);
  console.log(`Clients Count (exact select count): ${cCount}, error:`, cCountErr);

  // 2. Team count
  const { count: tCount, error: tCountErr } = await supabase
    .from('team_members')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', workspaceOwnerId);
  console.log(`Team Count (exact select count): ${tCount}, error:`, tCountErr);

  // 3. Client Map
  let clientMap = {};
  const { data: clientsData, error: clientsErr } = await supabase
    .from('clients')
    .select('id, name, phone, email, gender, outfit_type, status, created_at')
    .eq('user_id', workspaceOwnerId);
  
  if (clientsData) {
    clientsData.forEach(c => {
      clientMap[c.id] = c;
    });
  }
  console.log(`Clients fetched for Map: ${clientsData ? clientsData.length : 0}, error:`, clientsErr);

  // 4. Orders Data
  const { data: ordersData, error: ordersErr } = await supabase
    .from('orders')
    .select('id, client_id, client_name, phone, gender, outfit, status, status_type, measurements, assigned_team, created_at')
    .eq('user_id', workspaceOwnerId)
    .order('created_at', { ascending: false });
  console.log(`Orders fetched: ${ordersData ? ordersData.length : 0}, error:`, ordersErr);

  if (ordersData) {
    const validOrdersData = ordersData.filter(
      (o) => o.client_id && clientMap[o.client_id]
    );
    console.log(`Valid Orders (client_id in clientMap): ${validOrdersData.length}`);

    let ordersList = validOrdersData.map((o) => {
      const meas = o.measurements || {};
      const clientInfo = clientMap[o.client_id];
      const rawStatus = o.status || clientInfo?.status || 'Due';
      let statusTypeVal = 'collected';
      const normalized = rawStatus.toLowerCase();
      if (normalized.includes('overdue')) {
        statusTypeVal = 'overdue';
      } else if (
        normalized.includes('due') ||
        normalized.includes('pending') ||
        normalized.includes('progress') ||
        normalized.includes('active') ||
        normalized.includes('processing') ||
        normalized.includes('new')
      ) {
        statusTypeVal = 'due';
      } else if (normalized.includes('collected') || normalized.includes('done') || normalized.includes('completed')) {
        statusTypeVal = 'collected';
      }

      return {
        id: o.id,
        clientId: o.client_id,
        friendlyOrderId: meas.friendlyOrderId || '',
        client: o.client_name || clientInfo?.name || 'Unknown',
        phone: o.phone || clientInfo?.phone || '',
        email: clientInfo?.email || '',
        gender: o.gender || clientInfo?.gender || '',
        outfit: o.outfit || clientInfo?.outfit_type || '',
        status: rawStatus,
        statusType: statusTypeVal,
        assignedTeam: o.assigned_team || [],
        collectionDate: meas.collectionDate || '',
        dateReceived: meas.dateReceived || '',
      };
    });

    if (role === 'Tailor' || role === 'Assistant') {
      ordersList = ordersList.filter((o) => {
        if (!o.assignedTeam) return false;
        if (Array.isArray(o.assignedTeam)) {
          return o.assignedTeam.some((name) => 
            typeof name === 'string' && name.toLowerCase() === memberName.toLowerCase()
          );
        }
        const assignedStr = JSON.stringify(o.assignedTeam).toLowerCase();
        return assignedStr.includes(memberName.toLowerCase());
      });
      console.log(`Filtered Orders for ${role} (${memberName}): ${ordersList.length}`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    ordersList = ordersList.map((o) => {
      if (o.statusType === 'due' && o.collectionDate) {
        const colDate = new Date(o.collectionDate);
        colDate.setHours(0, 0, 0, 0);
        if (colDate < today) {
          return { ...o, statusType: 'overdue', status: 'Overdue' };
        }
      }
      return o;
    });

    const clientIdsWithOrders = new Set(validOrdersData.map((o) => o.client_id).filter(Boolean));
    const orphanClients = Object.values(clientMap).filter((c) => !clientIdsWithOrders.has(c.id));
    orphanClients.forEach((c) => {
      const rawStatus = c.status ?? 'Pending';
      let statusTypeVal = 'due';
      const normalized = rawStatus.toLowerCase();
      if (normalized.includes('overdue')) statusTypeVal = 'overdue';
      else if (normalized.includes('collected') || normalized.includes('done') || normalized.includes('completed')) statusTypeVal = 'collected';

      ordersList.push({
        id: c.id,
        clientId: c.id,
        friendlyOrderId: '',
        client: c.name,
        phone: c.phone ?? '',
        email: c.email ?? '',
        gender: c.gender ?? '',
        outfit: c.outfit_type ?? '',
        status: rawStatus,
        statusType: statusTypeVal,
        assignedTeam: [],
        collectionDate: '',
        dateReceived: '',
      });
    });

    console.log(`Total Orders in list (including orphans): ${ordersList.length}`);
    
    // Counts calculation
    const pendingCount = ordersList.filter(o => o.statusType === "due").length;
    const progressCount = ordersList.filter(o => o.statusType === "due" || o.statusType === "overdue").length;
    const clientsCountVal = Object.keys(clientMap).length;
    const teamCountVal = tCount || 0;
    
    const activeClients = Math.max(clientsCountVal, ordersList.length);
    const activeTeam = Math.max(teamCountVal, 1);

    console.log(`Stats - activeClients: ${activeClients}, pendingCount: ${pendingCount}, progressCount: ${progressCount}, activeTeam: ${activeTeam}`);
  }
}

async function main() {
  await simulate('8101393b-e673-4969-9fa8-9e8f632b01e0');
  await simulate('c7d8e90e-e463-406c-b6fa-30ca929267ab');
}

main();
