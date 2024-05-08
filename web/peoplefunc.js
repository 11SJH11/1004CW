import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eeulpxntseojzlobwcac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldWxweG50c2Vvanpsb2J3Y2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NTkwMTAsImV4cCI6MjAzMDMzNTAxMH0.nyVPBa3fWeQSF_ddayH8nhS5BSUr1lz_TmuKGgwehsk';
const supabase = createClient(supabaseUrl, supabaseKey);


async function fetchPeopleData() {
  document.getElementById("message").innerHTML = "";
  const container = document.getElementById('results');
  container.innerHTML = '';

  var nameInput = document.getElementById("name").value.trim();
  var licenseInput = document.getElementById("license").value.trim();
  var column = '';
  if (nameInput === "" && licenseInput === "") {
    document.getElementById("message").innerHTML = "Error";
    return;
  } else if (nameInput !== "" && licenseInput !== "") {
    document.getElementById("message").innerHTML = "Error";
    return;
  } 
  if (nameInput !== "") {
    column = 'Name';
    var input = nameInput;
  }
  else{
    column = 'LicenseNumber';
    var input = licenseInput;
  }
  document.getElementById("message").innerHTML = "";
  const { data, error } = await supabase
    .from('People')
    .select('')
    .ilike(column, `%${input}%`);
  
  if (error) {
    console.error('Error fetching data:', error);
    document.getElementById("message").innerHTML = "Error: Failed to fetch data.";
    return;
  }

  if (data.length > 0) {
    document.getElementById("message").innerHTML = "Search successful";
    data.forEach(person => {
      const personDetails = `
        <div style="border: 1px solid black; padding: 10px; margin: 10px;">
          <p>PersonID: ${person.PersonID}</p>
          <p>Name: ${person.Name}</p>
          <p>Address: ${person.Address}</p>
          <p>DOB: ${person.DOB}</p>
          <p>LicenseNumber: ${person.LicenseNumber}</p>
          <p>ExpiryDate: ${person.ExpiryDate}</p>
        </div>
      `;
      container.innerHTML += personDetails;
    });
  } else {
    document.getElementById("message").innerHTML = "No result found";
  }
  
}

document.getElementById('submit-info-people').addEventListener('click', fetchPeopleData);
