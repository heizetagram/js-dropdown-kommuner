const urlMunicipality = "http://localhost:8080/municipalities"
const ddMunicipalities = document.getElementById("ddMunicipalities")
const aTag = document.getElementById("aTag")
const inpMunicipality = document.getElementById("inpMunicipality")
let munArr = [];

/////////////////////////////////////////////////

function fetchMunicipalities(any) {
    return fetch(any).then(response => response.json());
}

function unpackMunicipality(mun) {
    //console.log(mun)
    const element = document.createElement("option")
    element.textContent = mun.navn;
    element.value = mun;
    element.href = mun.href;
    ddMunicipalities.appendChild(element)
    munArr.push(element)
}

function actionFetch() {
    const promMunicipalities = fetchMunicipalities(urlMunicipality)
    promMunicipalities.then(response => {
        response.forEach(unpackMunicipality)
    })
}

function getMunicipalityLink() {
    const selIndex = ddMunicipalities.selectedIndex
    const selOption = ddMunicipalities.options[selIndex]
    createHrefLinkTag(selOption)
}

function createHrefLinkTag(selOption) {
    aTag.href = selOption.href
    aTag.innerText = selOption.innerText
}

function hrefError() {
    // Href that does nothing
    aTag.href = "javascript:void(0)"
    aTag.textContent = "Kommunen kunne ikke findes"
}

function findMunicipality() {
    const mun = munArr.find(mun => mun.textContent === inpMunicipality.value)
    if (mun) {
        createHrefLinkTag(mun)
    } else {
        hrefError()
    }
}

/////////////////////////////////////////////////

pbFetchMunicipalities = document.getElementById("pbFetchMunicipalities")
pbFetchMunicipalities.addEventListener('click', actionFetch)
ddMunicipalities.addEventListener('change', getMunicipalityLink)
inpMunicipality.addEventListener('change', findMunicipality)