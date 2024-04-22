//http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok
document.addEventListener("DOMContentLoaded", function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");    
    const selectButton = document.getElementById("select");

    createButton.addEventListener("click", async function () {
        let nev = document.createElement("nev").value;
        const baseUrl ="http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok/" + nev;
        const formdata = new FormData(document.getElementById("dolgozoForm"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés");
        }else{
            console.error("Sikertelen feltöltés");
        }
        return response;
    });

    updateButton.addEventListener("click", async function(){        
        const baseUrl ="http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok/" + nev;
        let object = {
            nev: document.getElementById("nev").value,
            neme: document.getElementById("neme").value,
            reszleg: document.getElementById("reszleg").value,
            belepesev: document.getElementById("belepesev").value,
            ber: document.getElementById("ber").value
        };
        let body = JSON.stringify(object);
        let options = {
            method: "PUT",
            mode: "cors",            
            body: body
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    readButton.addEventListener("click", async function(){
        const baseUrl ="http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok";
        let options = {
            method: "GET",
            mode: "cors"
        }
        let response = await fetch(baseUrl, options);
        if(response.ok){
            let data = await response.json();
            dolgozoListazas(data);
        }else{
            console.error("Hiba a szerver válaszában");
        }

    });

    function dolgozoListazas(dolgozok){
        let dolgozoDiv = document.getElementById("dolgozoklista");
        let tablazat = dolgozoFejlec();
        for(let dolgozo of dolgozok){
            tablazat += dolgozoSor(dolgozo);
        }
        dolgozoDiv.innerHTML = tablazat + "</tbody></tbody>";
        return dolgozoDiv;
    };

    function dolgozoSor(dolgozo){
        let sor = `<tr>
        <td>${dolgozo.nev}</td>
        <td>${dolgozo.neme}</td>
        <td>${dolgozo.reszleg}</td>
        <td>${dolgozo.belepesev}</td>
        <td>${dolgozo.ber}</td>
        <td>
            <button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes('${dolgozo.nev}', '${dolgozo.neme}', '${dolgozo.reszleg}', '${dolgozo.belepesev}', '${dolgozo.ber}')"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>
            <button type="button" class="btn btn-outline-secondary" onclick="adatTorles(${dolgozo.nev}"><i class="fa-solid fa-trash"></i>Törlés</button>
        </td>
        </tr>`;
        return sor;
    };

    function dolgozoFejlec(){
        let fejlec = `<table class="table table-striped">
        <thead>
            <tr>
                <th>Név: </th>
                <th>Neme: </th>
                <th>Részleg: </th>
                <th>Belépésév: </th>
                <th>Bér: </th>
                <th>Művelet: </th>
            </tr>
        </thead>
        <tbody>`;
        return fejlec;
    };
    
});

function adatBetoltes(nev, neme, reszleg, belepesev, ber){
    let baseUrl="http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok/" + nev;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options)
    document.getElementById("nev").value=nev;
    document.getElementById("neme").value=neme;
    document.getElementById("reszleg").value=reszleg;
    document.getElementById("belepesev").value=belepesev;
    document.getElementById("ber").value=ber;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }else{
            console.error("Hiba a szerverben!");
        }
    });
}

function adatTorles(nev){
    let baseUrl="http://localhost/_dolgozok_vizsgaszeru_/backenddolgozok/index.php?dolgozok/" + nev;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}