import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const supabase = createClient('https://eeulpxntseojzlobwcac.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldWxweG50c2Vvanpsb2J3Y2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NTkwMTAsImV4cCI6MjAzMDMzNTAxMH0.nyVPBa3fWeQSF_ddayH8nhS5BSUr1lz_TmuKGgwehsk')


async function fetchData() {
    const { data, error } = await supabase.from('People').select();
    console.log('Fetched data:', data);
}

document.querySelector('#button1').addEventListener('click', fetchData);