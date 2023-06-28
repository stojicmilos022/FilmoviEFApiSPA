// podaci od interesa
var host = "http://localhost:";
var port = "57405/";
var filmoviEndpoint = "api/filmovi/";
var reziseriEndpoint="api/reziser/";
var formAction = "Create";
var editingId;


// prikaz autora
(function loadFilmovi(){
	// ucitavanje autora
	var requestUrl = host + port + filmoviEndpoint;
	console.log("URL zahteva: " + requestUrl);
	fetch(requestUrl)
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setFilmovi);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
		loadReziseri();
	
})()

// za rucni klik
function loadFilmoviClick(){
	// ucitavanje filmovi
	var requestUrl = host + port + filmoviEndpoint;
	console.log("URL zahteva: " + requestUrl);
	fetch(requestUrl)
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setFilmovi);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
		loadReziseri();
	
}

function loadReziseri(){
	// ucitavanje autora
	var requestUrl = host + port + reziseriEndpoint;
	console.log("URL zahteva: " + requestUrl);

	fetch(requestUrl)
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setReziseri);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
}


function showError() {
	var container = document.getElementById("data");
	container.innerHTML = "";

	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var errorText = document.createTextNode("Greska prilikom preuzimanja Filmova!");

	h1.appendChild(errorText);
	div.appendChild(h1);
	container.append(div);
}

// metoda za postavljanje autora u tabelu
function setFilmovi(data) {
	var container = document.getElementById("data");
	container.innerHTML = "";

	console.log(data);

	// ispis naslova
	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var headingText = document.createTextNode("Filmovi");
	h1.appendChild(headingText);
	div.appendChild(h1);

	// ispis tabele
	var table = document.createElement("table");
	var header = createHeader();
	table.append(header);

	var tableBody = document.createElement("tbody");

	for (var i = 0; i < data.length; i++)
	{
		// prikazujemo novi red u tabeli
		var row = document.createElement("tr");
		// prikaz podataka
		row.appendChild(createTableCell(data[i].id));
		row.appendChild(createTableCell(data[i].ime));
		row.appendChild(createTableCell(data[i].reziserIme));
		row.appendChild(createTableCell(data[i].reziserPrezime));


		// prikaz dugmadi za izmenu i brisanje
		var stringId = data[i].id.toString();

		var buttonDelete = document.createElement("button");
		buttonDelete.name = stringId;
		buttonDelete.addEventListener("click", deleteFilm);
		var buttonDeleteText = document.createTextNode("Delete");
		buttonDelete.appendChild(buttonDeleteText);
		var buttonDeleteCell = document.createElement("td");
		buttonDeleteCell.appendChild(buttonDelete);
		row.appendChild(buttonDeleteCell);

		var buttonEdit = document.createElement("button");
		buttonEdit.name = stringId;
		buttonEdit.addEventListener("click", editFilm);
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
	document.getElementById("formDiv").style.display = "block";
	document.getElementById("formDivReziser").style.display = "none";

	// ispis novog sadrzaja
	container.appendChild(div);
};
function setReziseri(data)
{
	var selectElement=document.getElementById("reziser");
	for (var i=0;i<data.length;i++)
	{
		console.log(data[i])
		var option = document.createElement('option');
		option.value = data[i].id;
		option.text = data[i].ime+' '+data[i].prezime;
		selectElement.appendChild(option);
	}
}
function createHeader() {
	var thead = document.createElement("thead");
	var row = document.createElement("tr");
	
	row.appendChild(createTableCell("Id"));
	row.appendChild(createTableCell("Ime"));
	row.appendChild(createTableCell("Ime rezisera"));
	row.appendChild(createTableCell("Prezime rezisera"));

	thead.appendChild(row);
	return thead;
}

function createTableCell(text) {
	var cell = document.createElement("td");
	var cellText = document.createTextNode(text);
	cell.appendChild(cellText);
	return cell;
}

// dodavanje novog autora
function submitFilmForm(){

	var filmIme = document.getElementById("ime").value;
	var filmZanr = document.getElementById("zanr").value;
	var filmGodina = document.getElementById("godina").value;
	var filmReziser = document.getElementById("reziser").value;
	var httpAction;
	var sendData;
	var url;

	// u zavisnosti od akcije pripremam objekat
	if (formAction === "Create") {
		httpAction = "POST";
		url = host + port + filmoviEndpoint;
		sendData = {
			"ime": filmIme,
			"zanr":filmZanr,
			"godina":filmGodina,
			"reziserId":filmReziser			
		};
	}
	else {
		httpAction = "PUT";
		url = host + port + filmoviEndpoint + editingId.toString();
		sendData = {
			"Id": editingId,
			"ime": filmIme,
			"zanr":filmZanr,
			"godina":filmGodina,
			"reziserId":filmReziser		
		};
	}

	console.log("Objekat za slanje");
	console.log(sendData);

	fetch(url, { method: httpAction, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200 || response.status === 201) {
				console.log("Successful action");
				formAction = "Create";
				refreshTable();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
		//refreshTable();
	return false;
}

// brisanje autora
function deleteFilm() {
	// izvlacimo {id}
	var deleteID = this.name;
	// saljemo zahtev 
	var url = host + port + filmoviEndpoint + deleteID.toString();
	fetch(url, { method: "DELETE"})
		.then((response) => {
			if (response.status === 204) {
				console.log("Successful action");
				refreshTable();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
		refreshTable();
};

// izmena autora
function editFilm(){
	// izvlacimo id
	var editId = this.name;
	// saljemo zahtev da dobavimo tog autora

	var url = host + port + filmoviEndpoint + editId.toString();
	fetch(url)
		.then((response) => {
			if (response.status === 200) {
				console.log("Successful action");
				response.json().then(data => {
					console.log("put",data);
					document.getElementById("ime").value = data.ime;
					document.getElementById("zanr").value = data.zanr;
					document.getElementById("godina").value = data.godina;
					document.getElementById("reziser").value = data.reziserId;

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
		//refreshTable();
};

// osvezi prikaz tabele
function refreshTable() {
	// cistim formu
	document.getElementById("ime").value = "";
	document.getElementById("zanr").value = "";
	document.getElementById("godina").value = "";
	document.getElementById("reziser").value = "";
	// osvezavam
	const currentRoute = window.location.pathname;
  
	// Navigate to the same route
	window.location.href = currentRoute;
	// document.getElementById("btnFilmovi").click();
};


