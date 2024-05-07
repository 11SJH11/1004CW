import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eeulpxntseojzlobwcac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldWxweG50c2Vvanpsb2J3Y2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NTkwMTAsImV4cCI6MjAzMDMzNTAxMH0.nyVPBa3fWeQSF_ddayH8nhS5BSUr1lz_TmuKGgwehsk';
const supabase = createClient(supabaseUrl, supabaseKey);



async function fetchVehicleData() {
    const container = document.getElementById('results');
    container.innerHTML = '';
  
    const driverNameInput = document.getElementById("name").value.trim();
    const vehicleRegoInput = document.getElementById("rego").value.trim();
  
    if (vehicleRegoInput === "") {
      document.getElementById("message").innerHTML = "Error";
      return;
    }
    
    document.getElementById("message").innerHTML = "";
    const { data: peopleData, error: peopleError } = await supabase
      .from('People')
      .select('PersonID, Name, LicenseNumber')
      .ilike('Name', `%${driverNameInput}%`)
      .eq('LicenseNumber', vehicleRegoInput)
  
    if (peopleError) {
      console.error('Error fetching person data:', peopleError);
      return;
    }
  
    if (peopleData.length === 0) {
      document.getElementById("message").innerHTML = "No result found";
      return;
    }
    const personID = peopleData[0].PersonID; 
  
    const { data: vehicleData, error: vehicleError } = await supabase
      .from('Vehicles')
      .select('')
      .eq('OwnerID', personID);
  
    if (vehicleError) {
      console.error('Error fetching vehicle data:', vehicleError);
      return;
    }
    
    if (vehicleData.length > 0) {
      document.getElementById("message").innerHTML = "Search successful";
      container.innerHTML += `
          ${vehicleData.map(vehicle => `
            <div style="border: 1px solid black; padding: 10px; margin: 10px;">
              <p>VehicleID: ${vehicle.VehicleID}</p>
              <p>Make: ${vehicle.Make}</p>
              <p>Model: ${vehicle.Model}</p>
              <p>Colour: ${vehicle.Colour}</p>
              <p>OwnerID: ${vehicle.OwnerID}</p>
              <p>Name: ${peopleData[0].Name}</p>
              <p>LicenceNumber: ${peopleData[0].LicenseNumber}</p>
            </div>
          `).join('')}
      `;
    } else {
      document.getElementById("message").innerHTML = "No result found";
    }
  }
  
  document.getElementById('submit-info-vehicle').addEventListener('click', fetchVehicleData);
  