const baseUrl = 'http://localhost:3000/api/records';
/* FONCTIONS AUTRES */
function remiseDefaut(){
    let divs=[];
    let buttons=[];
    const div1=document.getElementById("allDP");
    const div11=document.getElementById("vizDP");
    const div2=document.getElementById("DP");
    const div3=document.getElementById("createDP");
    const div4=document.getElementById("modifieDP");
    const div5=document.getElementById("deleteDP");
    const but1=document.getElementById("but1");
    const but2=document.getElementById("but2");
    const but3=document.getElementById("but3");
    const but4=document.getElementById("but4");
    const but5=document.getElementById("but5");

    divs.push(div1,div11,div2,div3,div4,div5);
    buttons.push(but1,but2,but3,but4,but5);
    for (element of divs){
        element.style.display="none";
    }
    for (element of buttons){
        element.classList.remove("clicked")
        element.classList.add("default");
    }
    const span_id=document.getElementById('id');
    span_id.innerHTML="";

}

function affichageDP(id, divID){
    const span_id=document.getElementById('id');
    span_id.innerHTML="Dossier patient n°"+id;

    var div=document.getElementById(divID)
    div.style.display="block";

    fetch(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
        const inputs = document.querySelectorAll(`#${divID} input`); // on récupère tous les inputs
        inputs[0].value = data.name || '';
        inputs[1].value = Number(data.age) || '';
        inputs[2].value = data.medicalHistory || '';
        inputs[3].value = data.currentMedications || '';
        inputs[4].value = data.allergies || '';
    }    
    )
    .catch(error => console.error('Error:', error));
}

/*OBTENIR TOUS LES DP*/
function getAllRecords() {
    remiseDefaut();

    const button= document.getElementById("but1");
    button.classList.remove("default");
    button.classList.add("clicked");

    var div=document.getElementById("allDP");
    div.style.display="block"; //j'affiche la div en question

    var liste=document.getElementById("dp-select");
    liste.innerHTML='';
    var optionDepart = document.createElement("option");
    optionDepart.textContent="--Choisissez un dossier à visualiser--";
    liste.add(optionDepart);
    fetch(baseUrl) //envoie la requête http avec l'url, directement en requete get par défaut
    .then(response => response.json()) //réponse retourné par fetch .json extrait la réponse sous format JSON
    .then(data => {
        data.forEach(element => {
            var option = document.createElement("option"); //crée un nouvel element option
            option.value=element.id; //valeur de l'option à ID
            option.textContent=element.name; //texte de l'option à ID aussi
            liste.add(option); //on l'ajoute à la liste
        });
    })
    .catch(error => console.error('Error:', error));

    liste.addEventListener("change", (event)=>{
        affichageDP(event.target.value, "vizDP");
    });
}

/*OBTENIR UN DP AVEC SON ID */
function getRecordById() {
    remiseDefaut();
    
    const button= document.getElementById("but2");
    button.classList.remove("default");
    button.classList.add("clicked");

    const id = prompt("Entrez l'ID du patient: ");
    const span_id = document.getElementById("id");
    span_id.innerHTML="Dossier patient n°"+id
    
    var div=document.getElementById("DP");
    div.style.display="block";
    affichageDP(id,"DP");

}

/* CREER UN NOUVEAU DP */
function createRecord() {
    remiseDefaut();
    const button= document.getElementById("but3");
    button.classList.remove("default");
    button.classList.add("clicked");

    const span_id = document.getElementById("id");
    span_id.innerHTML="Création d'un dossier patient"

    var div = document.getElementById("createDP");
    div.style.display="block";
}

function createRecord2(){
    const inputs=document.querySelectorAll('#createDP input');
    const record = {
        name: inputs[0].value,
        age: Number(inputs[1].value),
        medicalHistory: inputs[2].value.split(','),
        currentMedications: inputs[3].value.split(','),
        allergies: inputs[4].value.split(','),
    };

    fetch(baseUrl, {
        method: 'POST', // on précise que l'on envoie une requete post
        headers: {
            'Content-Type': 'application/json' //précision sur le format, ici JSON
        },
        body: JSON.stringify(record) //on encode notre dossier en json 
        }) 
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));   
    remiseDefaut();
    for(elements of inputs){
        elements.value=""; //on vide les champs une fois qu'on a validé la création
    }      

}

/* METTRE A JOUR UN DP */

function updateRecord() {
    remiseDefaut();
    const button= document.getElementById("but4");
    button.classList.remove("default");
    button.classList.add("clicked");

    const id= prompt("Entrer l'ID du DP à modifier:");
    affichageDP(id,"modifieDP");
    const span_id = document.getElementById("id");
    span_id.innerHTML="Modification du patient n°"+id;

}

function updateRecord2(){
    const span_id = document.getElementById("id");
    const textSpan=span_id.innerText;
    const id=textSpan[textSpan.length-1];

    console.log("id recup:", id);
    const inputs=document.querySelectorAll('#modifieDP input');
    const record = {
        id: Number(id),
        name: inputs[0].value,
        age: Number(inputs[1].value), 
        medicalHistory: inputs[2].value.split(','), 
        currentMedications: inputs[3].value.split(','), 
        allergies:inputs[4].value.split(',')
    };
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    remiseDefaut();
    for(elements of inputs){
        elements.value=""; //on vide les champs une fois qu'on a validé la création
    }

}

/* SUPPRIMER UN DP */
function deleteRecord() {
    remiseDefaut();
    const button= document.getElementById("but5");
    button.classList.remove("default");
    button.classList.add("clicked");

    const id = prompt("Entrer l'ID du dossier à supprimer:");
    affichageDP(id,"deleteDP");
    const span_id = document.getElementById("id");
    span_id.innerHTML="Dossier à supprimer, patient n°"+id;
}

function deleteRecord2(){
    const span_id = document.getElementById("id");
    const textSpan=span_id.innerText;
    const id=textSpan[textSpan.length-1];
    
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
        })
        .then(() => console.log('Record deleted'))
        .catch(error => console.error('Error:', error));
   remiseDefaut();

}