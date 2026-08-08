const { createClient } = require('@supabase/supabase-js');

const url = 'https://kragyuyqdzcqtmvadshy.supabase.co';
const key = 'sb_publishable_1KIeYjyAB5Ll3MI49arBpQ_Jxo5AomX';

const supabase = createClient(url, key);

async function run() {
  console.log('Testing Supabase query on:', url);
  const { data, error, status } = await supabase.from('blogs').select('*');
  console.log('HTTP Status:', status);
  console.log('Data:', data);
  console.log('Error:', error);
}

run();
