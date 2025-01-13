
//state and city dropdown
const states = ["Gujarat", "Maharashtra", "Assam", "Bihar", "Andhra Pradesh", "Madhya Pradesh"];
const cities = {"Gujarat":["Surat","Ahmedabad","Gandhinagar","Bharuch","Vodadara"],
        "Maharashtra":["Mumbai","Nashik","Pune","Nagpur","Kolapur"],
        "Assam":["Guwahati","Tezpur","Jorhat","Golapura","Nagaon"],
        "Bihar":["Patna","Bhagalpur","Gaya","Darbhanga","Nalanda"],
        "Andhra Pradesh":["Tirupati","Visakhapatam"],
        "Madhya Pradesh":["Indore","Ujjain","Bhopal"]}

const stateContainer = document.getElementById("state");
const cityContainer = document.getElementById("city");

//display the state
states.forEach(state => {
    const option = document.createElement("option");
    option.textContent = state; 
    option.value = state;       
    stateContainer.appendChild(option);
});

//event listener and according to that city display
stateContainer.addEventListener("change",function(){
    const selectedState = stateContainer.value

    cityContainer.innerHTML = `<option value="">--Select a City--</option>`;

    if(selectedState){
        cities[selectedState].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            cityContainer.appendChild(option);
        })
    }
});

//stored the record
const form = document.querySelector("form");
let Data=[{"name":"Dhruti" , "email":"dhruti@gmail.com" , "age":"22" , "gender":"female" , "hobby":"playing" , "state":"Gujarat" , "city":"Surat"}];
form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.querySelector("input[name='gender']:checked")?.value || "Not Selected";
    const hobby = Array.from(document.querySelectorAll("input[name='hobby']:checked")).map(hobby => hobby.id);
    const state = document.getElementById("state").value || "Not Selected";
    const city = document.getElementById("city").value || "Not Selected";
    const createdTime = new Date().toLocaleString();

    //validation 
    if( !age || (gender === "Not Selected") || (state === "Not Selected") || (city === "Not Selected") || (hobby.length === 0))
    {
        msg="please fill up the field";
        alert(msg);
    } 
    
    //name validation
    else if (!name || !/^[a-zA-Z\s]+$/.test(name))
    {
        alert("Name is required and must contain only letters.");
    }

    //email validation
    else if(!email || !/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email))
    {
        alert("please enter the valid email")
    }
    
    //stored the record 
    else
    {
        FormData = {name,email,gender,hobby,age,state,city,createdTime};
        Data.push(FormData);
        console.log(Data);
        form.reset();
        displayTable();
    }
});

//display the table
function displayTable(filter = "")
{
    const container = document.getElementById("dynamic-table");
    container.innerHTML="";
    Data.forEach((item,index) => {
        if (!filter || item.name.toLowerCase().includes(filter.toLowerCase())) 
        {
            const row = document.createElement("tr");
            row.innerHTML=`
            <td>${index+1}</td>
            <td>${item.createdTime}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.gender}</td>
            <td>${item.hobby}</td>
            <td>${item.age}</td>
            <td>${item.state}</td>
            <td>${item.city}</td>
            <td><button id=remove onclick="deleteRecord(${index})">Delete</button></td>
            <td><button id=edit onclick="editRecord(${index})">Edit</button></td>
            `
            container.appendChild(row);
        };
    });
};

window.onload = displayTable();

//edit the record when click on edit button
function editRecord(index)
{
    const record = Data[index];
    document.getElementById("name").value = record.name;
    document.getElementById("email").value = record.email;
    document.getElementById("age").value = record.age;
    const genderatio = document.getElementById(record.gender);
    if(genderatio)
    {
        genderatio.checked = true;
    };
    document.querySelectorAll("input[name='hobby']:checked").forEach(hobby => {
        const hobbyCheckbox = document.getElementById(record.hobby);
        if (hobbyCheckbox) 
        {
            hobbyCheckbox.checked = true; 
        };
    });
    document.getElementById("state").value = record.state;
    stateContainer.dispatchEvent(new Event("change"))
    document.getElementById("city").value = record.city;
    
    //create the update button
    const update = document.getElementById("submit");
    update.textContent = "Update";
    update.onclick = updateEdit;
    
    //create the cancel button
    if (!document.getElementById("cancel"))
    {
        const cancelButton = document.createElement("button");
        cancelButton.id ="cancel";
        cancelButton.textContent="Cancel";
        cancelButton.type = "button";
        cancelButton.onclick = cancelEdit;
        document.getElementById("dataform").appendChild(cancelButton);  

        deleteRecord(index);
    }
}

//update the record
function updateEdit()
{
    document.getElementById("submit").textContent="Submit";
    document.getElementById("cancel").remove(); 
};

//clear the form when click on cancel
function cancelEdit()
{
    document.getElementById("dataform").reset();
    document.getElementById("submit").textContent="Submit";
    document.getElementById("cancel").remove();
};

//delete the record when click on delete buttton
function deleteRecord(index)
{
    Data.splice(index,1);
    displayTable();
};

//sort the data by name
let arr3 = ["ascending" , "descending"];
const dropDown = document.getElementById("sort");
for(i = 0;i<arr3.length;i++)
{
    const op = document.createElement("option");
    op.innerHTML = `
    ${arr3[i]}`  
    dropDown.appendChild(op);
};
dropDown.addEventListener("change",function(){
    const selectedSort = dropDown.value;
    if(selectedSort === "ascending")
    {
        sortFunction(Data,"name");
        displayTable();
    }
    else if(selectedSort === "descending")
    {
        sortFunction(Data,"name");
        Data.reverse();
        displayTable();
    }
});
function sortFunction(Data,key)
{
    let sortedData;
    if(key === "name")
    {
        sortedData = Data.sort(function(a,b)
        {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if(x>y){return 1;}
            if(x<y){return -1;}
            return 0;
        }) 
    }
}

//search the data by name
search.addEventListener("input", () => {
    const filter = search.value.trim();
    displayTable(filter);
});

