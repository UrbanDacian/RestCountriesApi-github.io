function changeStyle(){
    if (document.body.style.backgroundColor === "rgb(32, 44, 55)"){
        document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
        document.body.style.color = "hsl(200, 15%, 8%)";
        document.getElementById("moon").style.color = "hsl(200, 15%, 8%)";
        document.getElementById("darkModeText").style.color = "hsl(200, 15%, 8%)"
        document.getElementById("darkBtn").style.backgroundColor = "hsl(0, 0%, 98%)"
    }
    else {
        document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
        document.body.style.color = "hsl(0, 0%, 95%))";
        document.getElementById("moon").style.color = "hsl(0, 0%, 95%)";
        document.getElementById("darkModeText").style.color = "hsl(0, 0%, 95%)";
        document.getElementById("darkBtn").style.backgroundColor = "hsl(207, 26%, 17%)";
    }
}

function drop(){
    if(document.getElementById("dropdown-menu").style.display === "flex"){
        document.getElementById("dropdown-menu").style.display = "none";
    }
    else{
        document.getElementById("dropdown-menu").style.display = "flex";
    }
}

function selectRegion(region){
    if (region === 'Any'){
        document.getElementById("dropBtn").textContent = "Filter by Region";
    }
    else {
        document.getElementById("dropBtn").textContent = region;
    }
    document.getElementById("dropdown-menu").style.display = "none";
    countries();
}

async function countries(){
    let url;
    if (document.getElementById("dropBtn").textContent === "Filter by Region"){
        url = "https://restcountries.com/v3.1/all";
    }
    else{
        url = "https://restcountries.com/v3.1/region/" + (document.getElementById("dropBtn").textContent).toLocaleLowerCase();
    }
    const request = await fetch(url , {
        mode : "cors",
        method : "Get",
    })
    const response = await request.json();
    console.log(response);
    let arr = [];
    while(arr.length < 8){
        let random = Math.floor(Math.random() * response.length);
        if(arr.includes(random)){
            continue;
        }
        else{
            arr.push(random);
            let name = "name" + arr.length;
            let image = "img" + arr.length;
            let population = "population" + arr.length;
            let capital = "capital" + arr.length;
            document.getElementById(image).src = response[random].flags.png;
            document.getElementById(name).textContent = response[random].name.common;
            document.getElementById(population).textContent = "Population: " + response[random].population;
            document.getElementById(capital).textContent = "Capital: " + response[random].capital;
        }
    }
}

async function showUp(country){
    let inputCountry = country;
    if (!inputCountry) {
        inputCountry = document.getElementById("inputBox").value;
    }
    const url = "https://restcountries.com/v3.1/name/" + (inputCountry).toLocaleLowerCase();
    const request = await fetch(url, {
        mode:"cors",
        method:"Get"
    })
    const response = await request.json();
    console.log(response);
    let random = Math.floor(Math.random() * response.length);
    document.getElementById("detailedImg").src = response[random].flags.png;
    document.getElementById("countryName").textContent = response[random].name.common;
    document.getElementById("population").textContent = "Population: " + response[random].population;
    document.getElementById("capital").textContent = "Capital: " + response[random].capital;
    document.getElementById("region").textContent = "Region: " + response[random].region;
    document.getElementById("subregion").textContent = "Subregion: " + response[random].subregion;
    document.getElementById("currency").textContent = "Currency: " + response[random].currencies;
    document.getElementById("languages").textContent = "Languages: " + response[random].languages;
    document.getElementById("footer").display = "flex";
    document.getElementById("main").display = "none";
}

document.addEventListener("DOMContentLoaded", countries);