// podaci od interesa
var host = "http://localhost:";
var port = "57405/";
var filmoviEndpoint = "api/filmovi/";
var reziseriEndpoint="api/reziser/";
var formAction = "Create";
var editingId;




function loadReziseriTable(){
	// ucitavanje autora
	var requestUrl = host + port + reziseriEndpoint;
	console.log("URL zahteva: " + requestUrl);

	fetch(requestUrl)
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setReziseriTable);
			} else {
				console.log("Error occured with code " + response.status);
				showErrorReziser();
			}
		})
		.catch(error => console.log(error));
} 

function setReziseriTable(data) {
	var container = document.getElementById("data");
	container.innerHTML = "";

	console.log(data);

	// ispis naslova
	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var headingText = document.createTextNode("Reziser");
	h1.appendChild(headingText);
	div.appendChild(h1);

	// ispis tabele
	var table = document.createElement("table");
	var header = createHeaderReziser();
	table.append(header);

	var tableBody = document.createElement("tbody");

	for (var i = 0; i < data.length; i++)
	{
		// prikazujemo novi red u tabeli
		var row = document.createElement("tr");
		//prikaz podataka
		row.appendChild(createTableCellReziser(data[i].id));
		row.appendChild(createTableCellReziser(data[i].ime));
		row.appendChild(createTableCellReziser(data[i].prezime));
		row.appendChild(createTableCellReziser(data[i].starost));


		// prikaz dugmadi za izmenu i brisanje
		var stringId = data[i].id.toString();

		var buttonDelete = document.createElement("button");
		buttonDelete.name = stringId;
		buttonDelete.addEventListener("click", deleteReziser);
		var buttonDeleteText = document.createTextNode("Delete");
		buttonDelete.appendChild(buttonDeleteText);
		var buttonDeleteCell = document.createElement("td");
		buttonDeleteCell.appendChild(buttonDelete);
		row.appendChild(buttonDeleteCell);

		var buttonEdit = document.createElement("button");
		buttonEdit.name = stringId;
		buttonEdit.addEventListener("click", editReziser);
		var buttonEditText = document.createTextNode("Edit");
		buttonEdit.appendChild(buttonEditText);
		var buttonEditCell = document.createElement("td");
		buttonEditCell.appendChild(buttonEdit);
		row.appendChild(buttonEditCell);

		tableBody.appendChild(row);	
	}
	table.appendChild(tableBody);
	div.appendChild(table);

	// prikaz forme
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("formDivReziser").style.display = "block";
	container.appendChild(div)	
}

function showErrorReziser() {
	var container = document.getElementById("data");
	container.innerHTML = "";

	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var errorText = document.createTextNode("Greska prilikom preuzimanja Rezisera!");

	h1.appendChild(errorText);
	div.appendChild(h1);
	container.append(div);
}

// metoda za postavljanje autora u tabelu

function createHeaderReziser() {
	var thead = document.createElement("thead");
	var row = document.createElement("tr");
	
	row.appendChild(createTableCell("Id"));
	row.appendChild(createTableCell("Ime rezisera"));
	row.appendChild(createTableCell("Prezime rezisera"));
	row.appendChild(createTableCell("Starost"));

	thead.appendChild(row);
	return thead;
}

function createTableCellReziser(text) {
	var cell = document.createElement("td");
	var cellText = document.createTextNode(text);
	cell.appendChild(cellText);
	return cell;
}

// dodavanje novog autora
function submitReziserForm(){
	console.log("usao u kreiranje")
	var reziserime = document.getElementById("reziserIme").value;
	var reziserprezime = document.getElementById("reziserPrezime").value;
	var reziserstarost = document.getElementById("reziserStarost").value;
	
	var httpAction;
	var sendData;
	var url;
	console.log(reziserime);
	console.log(reziserprezime)
	console.log(reziserstarost);
	// u zavisnosti od akcije pripremam objekat
	if (formAction === "Create") {
		httpAction = "POST";
		url = host + port + reziseriEndpoint;
		sendData = {
			"ime": reziserime,
			"prezime":reziserprezime,
			"starost":reziserstarost,
			
		}}
	// }
	else {

		httpAction = "PUT";
		
		url = host + port + reziseriEndpoint + editingId.toString();
		sendData = {
			"Id": editingId,
			"ime": reziserime,
			"prezime":reziserprezime,
			"starost":reziserstarost,	
		};
		

	}

	console.log("Objekat za slanje");
	console.log(sendData);

	fetch(url, { method: httpAction, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200 || response.status === 201) {
				console.log("Successful action");
				formAction = "Create";
				refreshTableReziser();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
		refreshTableReziser();
	return false;
}

// brisanje autora
function deleteReziser() {
	// izvlacimo {id}
	var deleteID = this.name;
	// saljemo zahtev 
	var url = host + port + reziseriEndpoint + deleteID.toString();
	fetch(url, { method: "DELETE"})
		.then((response) => {
			if (response.status === 204) {
				console.log("Successful action");
				refreshTableReziser();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
		refreshTableReziser();
};

// izmena autora
function editReziser(){
	// izvlacimo id
	var editId = this.name;
	// saljemo zahtev da dobavimo tog autora

	var url = host + port + reziseriEndpoint + editId.toString();
	fetch(url)
		.then((response) => {
			if (response.status === 200) {
				console.log("Successful action");
				response.json().then(data => {
					console.log("put",data);
					document.getElementById("reziserIme").value = data.ime;
					document.getElementById("reziserPrezime").value = data.prezime;
					document.getElementById("reziserStarost").value = data.starost;

					editingId = data.id;
					formAction = "Update";
				});
			} else {
				formAction = "Create";
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
};



// osvezi prikaz tabele
function refreshTableReziser() {
	// cistim formu
	document.getElementById("reziserIme").value = "";
	document.getElementById("reziserPrezime").value = "";
	document.getElementById("reziserStarost").value = "";
	//document.getElementById("reziser").value = "";
	// osvezavam

	 document.getElementById("btnReziser").click();
};


