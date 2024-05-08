import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eeulpxntseojzlobwcac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldWxweG50c2Vvanpsb2J3Y2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NTkwMTAsImV4cCI6MjAzMDMzNTAxMH0.nyVPBa3fWeQSF_ddayH8nhS5BSUr1lz_TmuKGgwehsk';
const supabase = createClient(supabaseUrl, supabaseKey);




async function add_Vehicle(){
    document.getElementById("message").innerHTML = "";
    document.getElementById("second-form").innerHTML = '';
    const container = document.getElementById('second-form');

    var VehicleRego = document.getElementById("rego").value.trim();
    var VehicleMake = document.getElementById("make").value.trim();
    var VehicleModel = document.getElementById("model").value.trim();
    var VehicleColour = document.getElementById("colour").value.trim();
    var ownerName = document.getElementById("owner").value.trim();

    if (VehicleRego === "" || VehicleMake === "" || VehicleModel === "" || VehicleColour === "" || ownerName === "") {
        document.getElementById("message").innerHTML = "Error";
        console.error("Error: One or more fields are empty.");
        return;
    }

    const { data: peopledata, error:peopleError } = await supabase
        .from('People')
        .select('')
        .eq('Name', ownerName);
    

    if (peopleError) { 
        console.error('Error fetching data:', peopleError);
        return;
    }

    if (peopledata.length === 0) {
        const formHTML = `
        <p>PersonID: <input type="text" id="personid" placeholder="Enter PersonID..."></p>
        <p>Name: <input type="text" id="name" placeholder="Enter name..."></p>
        <p>Address: <input type="text" id="address" placeholder="Enter address..."></p>
        <p>DOB: <input type="text" id="dob" placeholder="Enter DOB..."></p>
        <p>License number: <input type="text" id="license" placeholder="Enter license number..."></p>
        <p>Expiry date: <input type="text" id="expire" placeholder="Enter expiry date..."></p>
        <button id="addOwner">Add owner</button>
        `;
        document.getElementById("second-form").innerHTML = formHTML;

        document.getElementById("rego").disabled = true;
        document.getElementById("make").disabled = true;
        document.getElementById("model").disabled = true;
        document.getElementById("colour").disabled = true;
        document.getElementById("owner").disabled = true;
        document.getElementById("addVehicle").disabled = true;

        document.getElementById('addOwner').addEventListener('click', add_Owner);
    }
    else{// add new vehicle for owner
       
        const { data: vehicleData, error: vehicleError } = await supabase
        .from('Vehicles')
        .insert([
           {VehicleID: VehicleRego, 
            Make: VehicleMake, 
            Model: VehicleModel, 
            Colour: VehicleColour, 
            OwnerID: peopledata[0].PersonID }
        ]);

        if (vehicleError) {
            console.error('Error inserting vehicle data:', vehicleError);
            document.getElementById("message").innerHTML = "Error inserting vehicle data. Please try again.";
            return;
        }

        document.getElementById("message").innerHTML = "Vehicle added successfully";
    }
}

async function add_Owner(){
    

    var VehicleRego = document.getElementById("rego").value.trim();
    var VehicleMake = document.getElementById("make").value.trim();
    var VehicleModel = document.getElementById("model").value.trim();
    var VehicleColour = document.getElementById("colour").value.trim();
    var ownerName = document.getElementById("owner").value.trim();

    var personID = document.getElementById("personid").value.trim();
    var ownerName_again = document.getElementById("name").value.trim();
    var ownerAddress = document.getElementById("address").value.trim();
    var ownerDOB = document.getElementById("dob").value.trim();
    var ownerLicense = document.getElementById("license").value.trim();
    var ownerExpiry = document.getElementById("expire").value.trim();


    if (personID === "" || ownerName_again === "" || ownerAddress === "" || ownerDOB === "" || ownerLicense === "" || ownerExpiry === "") {
        document.getElementById("message").innerHTML = "Error";
        console.error("Error: One or more fields are empty.");
        return;
    }

    const { data: vehicleData, error: vehicleError } = await supabase
        .from('Vehicles')
        .insert([
           {VehicleID: VehicleRego, 
            Make: VehicleMake, 
            Model: VehicleModel, 
            Colour: VehicleColour, 
            OwnerID: personID }
        ]);

        if (vehicleError) {
            console.error('Error inserting vehicle data:', vehicleError);
            document.getElementById("message").innerHTML = "Error inserting vehicle data. Please try again.";
            return;
        }

        const { data: peopleData, error: peopleError } = await supabase
        .from('People')
        .insert([
           {PersonID: personID, 
            Name: ownerName_again, 
            Address: ownerAddress, 
            DOB: ownerDOB, 
            LicenseNumber: ownerLicense,
            ExpiryDate: ownerExpiry}
        ]);

        if (peopleError) {
            console.error('Error inserting vehicle data:', vehicleError);
            document.getElementById("message").innerHTML = "Error inserting vehicle data. Please try again.";
            return;
        }
        document.getElementById("message").innerHTML = "Vehicle added successfully";
}


document.getElementById('addVehicle').addEventListener('click', add_Vehicle);