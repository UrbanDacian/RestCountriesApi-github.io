function changeStyle(){
    if (document.body.style.backgroundColor === "rgb(32, 44, 55)"){
        document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
        document.body.style.color = "hsl(200, 15%, 8%)";
        document.getElementById("moon").style.color = "hsl(200, 15%, 8%)";
        document.getElementById("darkModeText").style.color = "hsl(200, 15%, 8%)";
        document.getElementById("darkBtn").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("dropdown-menu").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("dropBtn").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("dropBtn").style.color = "black";
        document.getElementById("SectionRow1").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("SectionRow2").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("section").style.backgroundColor = "hsl(0, 0%, 98%)";
        document.getElementById("main").style.backgroundColor = "hsl(0, 0%, 98%)";
        for(let i = 1; i <=8; ++i){
            let cnt = "country" + i;
            let name = "name" + i;
            document.getElementById(cnt).style.backgroundColor = "hsl(0, 0%, 98%)";
            document.getElementById(name).style.backgroundColor = "hsl(0, 0%, 98%)";
            document.getElementById(name).style.color = "black";
        }
        const element = document.getElementsByClassName("dropdown");
        element[0].style.backgroundColor = "hsl(0, 0%, 98%)";
        let nr = document.getElementsByClassName("dropSelector");
        for (let i = 0; i <= nr.length; ++i) {
            nr[i].style.color = "black";
            nr[i].style.backgroundColor = "hsl(0, 0%, 98%)";
        }
    }
    else {
        document.body.style.backgroundColor = "rgb(32, 44, 55)";
        document.body.style.color = "hsl(0, 0%, 95%)";
        document.getElementById("moon").style.color = "hsl(0, 0%, 95%)";
        document.getElementById("darkModeText").style.color = "hsl(0, 0%, 95%)";
        document.getElementById("darkBtn").style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById("main").style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById("SectionRow1").style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById("SectionRow2").style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById("section").style.backgroundColor = "hsl(207, 26%, 17%)";
        document.getElementById("dropdown-menu").style.backgroundColor = "rgb(32, 44, 55)";
        document.getElementById("dropdown-menu").style.color = "white";
        document.getElementById("dropBtn").style.color = "white";
        document.getElementById("dropBtn").style.backgroundColor = "rgb(32, 44, 55)";
        const element = document.getElementsByClassName("dropdown");
        element[0].style.backgroundColor = "rgb(32, 44, 55)";
        for (let i = 1; i <= 8; ++i) {
            let cnt = "country" + i;
            let name = "name" + i;
            document.getElementById(cnt).style.backgroundColor = "hsl(207, 26%, 17%)";
            document.getElementById(name).style.backgroundColor = "hsl(207, 26%, 17%)";
            document.getElementById(name).style.color = "white";
        }
        let nr = document.getElementsByClassName("dropSelector");
        for (let i = 0; i <= nr.length; ++i) {
            nr[i].style.color = "white";
            nr[i].style.backgroundColor = "rgb(32, 44, 55)";
        }
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
    let currencys = Object.keys(response[0].currencies);
    let languages = Object.values(response[0].languages);
    if(response[0].borders.length){
        let border = Object.values(response[0].borders);
        for(let i = 0; i < border.length; ++i){
            doc = document.createElement("p");
            doc.className = "borderCountry";
            doc.textContent = border[i];
            document.getElementById("bordersExtended").appendChild(doc);
        }
    }
    currencys = currencys.map(arr => arr).join(', ');
    languages = languages.map(arr => arr).join(', ');
    document.getElementById("footer").style.display = "flex";
    document.getElementById("main").style.display = "none";
        document.getElementById("detailedImg").src = response[0].flags.png;
        document.getElementById("countryName").textContent = response[0].name.common;
        document.getElementById("population").textContent = "Population: " + response[0].population;
        document.getElementById("capital").textContent = "Capital: " + response[0].capital;
        document.getElementById("region").textContent = "Region: " + response[0].region;
        document.getElementById("subregion").textContent = "Subregion: " + response[0].subregion;
        document.getElementById("topLevel").textContent = "Top Level Domain: " + response[0].tld;
        document.getElementById("currency").textContent = "Currency: " + currencys;
        document.getElementById("languages").textContent = "Languages: " + languages;
}

function showDown(){
    document.getElementById("footer").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("inputBox").value = '';
    document.getElementById("bordersExtended").innerHTML = '';
}

document.addEventListener("DOMContentLoaded", countries);