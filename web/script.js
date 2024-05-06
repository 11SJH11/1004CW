import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eeulpxntseojzlobwcac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldWxweG50c2Vvanpsb2J3Y2FjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDc1OTAxMCwiZXhwIjoyMDMwMzM1MDEwfQ.X6joe6twApzLHR4GvQECDppGO581cIvISkh50kEeYhw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPeopleData() {
  const container = document.getElementById('results');
  container.innerHTML = ''; // Clear previous content
  
  try {
    const { data, error } = await supabase
      .from('People')
      .select('*'); // Select all columns

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      container.textContent = 'No data available';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>PersonID</th>
      <th>Name</th>
      <th>Address</th>
      <th>DOB</th>
      <th>License Number</th>
      <th>Expiry Date</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(person => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${person.PersonID}</td>
        <td>${person.Name}</td>
        <td>${person.Address}</td>
        <td>${person.DOB}</td>
        <td>${person.LicenseNumber}</td>
        <td>${person.ExpiryDate}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

document.getElementById('submit-info').addEventListener('click', fetchPeopleData);