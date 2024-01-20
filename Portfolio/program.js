const tables = {}
let photos
let photoIndex = 0
const masterTable = {}
async function getTable(tableName) {
    const response = await fetch(`https://api.airtable.com/v0/app3xgnAFHws6c6d6/${tableName}`, {
        headers: { 'Authorization': 'Bearer pati10jdEauLNzrgF.0d6e7b7f633a73682bda5e0c4e7c6da2afd79e0214b0d97fc9314da73608ed9b' }
    })
    if (response.status === 200) {
        const data = response.json()
        return data
    }
    return null
}
function filter(conditions, search) {
    document.getElementById('infoContainer').style.display = 'None'
    document.getElementById('searchContainer').style.width = 'calc(85% - 20px)'
    return Object.keys(masterTable).reduce(function (r, e) {
        let meetsCriteria = true
        let found = false
        for (key in conditions) {
            if (!conditions[key].includes(masterTable[e][key])) { meetsCriteria = false; break }
        }
        if (meetsCriteria) {
            found = masterTable[e]['Name'].toLowerCase().includes(search.toLowerCase())
        }
        if (meetsCriteria && found) r[e] = masterTable[e]
        return r
    }, {})
}
function displayPhoto(photoIndex) {
    const photo = photos[photoIndex]
    return `<strong class="large" style="max-width: 80%; margin: auto;"><img alt="${photo.Title}" src="${photo.Photo[0].url}" class="photo" style="max-width: 100%; max-height: 40vh"><br><br>${photo.Title} (${photoIndex + 1}/${photos.length})</strong>`
}
function display(id) {
    document.getElementById('infoContainer').style.display = 'inline-block'
    document.getElementById('searchContainer').style.width = '15%'
    photoIndex = 0
    const displaying = masterTable[id]
    const photoContainer = document.getElementById('photoContainer')
    const dataContainer = document.getElementById('dataContainer')
    dataContainer.innerHTML = ''
    photos = []
    if (displaying.photos) {
        for (i = 0; i < displaying.photos.length; i++) {
            photos.push(masterTable[displaying.photos[i]])
        }
        photoContainer.innerHTML = displayPhoto(0)
    } else {
        photoContainer.innerHTML = `<strong class="large">No Photos Found</strong>`
    }
    if (displaying.type === 'Projects') {
        dataContainer.innerHTML += `<strong class="large">${displaying['Project Name']}</strong>`
        if (displaying['Project location'] && displaying['End date'])
            dataContainer.innerHTML += `${displaying['Project location']}, ${displaying['End date']}<br>`
        if (displaying['Funding'])
            dataContainer.innerHTML += `Project Funding: ${displaying['Funding']}<br>`
        if (displaying['Themes']) {
            dataContainer.innerHTML += '<strong>Themes</strong>: '
            for (i = 0; i < displaying['Themes'].length; i++) {
                dataContainer.innerHTML += masterTable[displaying['Themes'][i]].Name
                if (i != displaying['Themes'].length - 1) {
                    dataContainer.innerHTML += ', '
                } else {
                    dataContainer.innerHTML += '<br>'
                }
            }
        }
        dataContainer.innerHTML += '<br><strong>Description</strong>: <br>'
        if (displaying['Description of project'])
            dataContainer.innerHTML += displaying['Description of project'] + '<br>'
        if (displaying['Link'])
            dataContainer.innerHTML += `<a href=${displaying['Link']}>${displaying['Link']}</a><br>`
        if (displaying['Impacts']) {
            for (i = 0; i < displaying['Impacts'].length; i++) {
                let impact = masterTable[displaying['Impacts'][i]]
                dataContainer.innerHTML += `<img style="max-height: 20px" src=${masterTable[impact['impact_type_icon']]['Icon'][0].url}>  ${impact['Title']}<br>`
            }
        }
        if (displaying['Role'])
            dataContainer.innerHTML += `<strong>Project role</strong>: ${displaying['Role']}<br>`
        if (displaying['Skillset']) {
            dataContainer.innerHTML += '<strong>Featured skills</strong>: '
            for (i = 0; i < displaying['Skillset'].length; i++) {
                dataContainer.innerHTML += displaying['Skillset'][i]
                if (i != displaying['Skillset'].length - 1) {
                    dataContainer.innerHTML += ', '
                } else {
                    dataContainer.innerHTML += '<br>'
                }
            }
        }
        dataContainer.innerHTML += '<br>'
        if (displaying['Employer1']) {
            let employer = masterTable[displaying['Employer1'][0]]
            let institution = masterTable[employer['Institutions/Organizations']]
            dataContainer.innerHTML += `<strong>${employer.Employer}</strong>: ${institution.Sector}<br>`
            dataContainer.innerHTML += `<strong>${institution.institution}</strong>, ${institution.City}, ${institution.State}<br>`
        }
    }
    if (displaying.type === 'Impacts') {
        let adding1 = ''
        let adding2 = ''
        if (displaying['Link']) {
            adding1 = `<a href=${displaying['Link']}>`
            adding2 = `</a>`
        }
        dataContainer.innerHTML += adding1 + `<strong class="large">${displaying['Title']}<img style="max-height: 25px" src=${masterTable[displaying['impact_type_icon']]['Icon'][0].url}></strong>${adding2}<br><br>`
        if (displaying['Projects']) {
            let project = masterTable[displaying['Projects'][0]]
            let employer = masterTable[project['Employer1'][0]]
            let institution = masterTable[employer['Institutions/Organizations']]
            dataContainer.innerHTML += `<strong>${employer.Employer}</strong>: ${institution.Sector}<br>`
            dataContainer.innerHTML += `<strong>${institution.institution}</strong>, ${institution.City}, ${institution.State}<br>`
        }
        if (displaying['Description'])
            dataContainer.innerHTML += displaying['Description'] + '<br>'
        if (displaying['Projects']) {
            for (i = 0; i < displaying['Projects'].length; i++) {
                let project = masterTable[displaying['Projects'][i]]
                dataContainer.innerHTML += `<br><strong>${project['Project Name']}</strong><br>`
                if (project['Project location'] && project['End date'])
                    dataContainer.innerHTML += `${project['Project location']}, ${project['End date']}<br>`
                if (project['Themes']) {
                    dataContainer.innerHTML += '<strong>Themes</strong>: '
                    for (i = 0; i < project['Themes'].length; i++) {
                        dataContainer.innerHTML += masterTable[project['Themes'][i]].Name
                        if (i != project['Themes'].length - 1) {
                            dataContainer.innerHTML += ', '
                        } else {
                            dataContainer.innerHTML += '<br>'
                        }
                    }
                }
                if (project['Skillset']) {
                    dataContainer.innerHTML += '<strong>Featured skills</strong>: '
                    for (i = 0; i < project['Skillset'].length; i++) {
                        dataContainer.innerHTML += project['Skillset'][i]
                        if (i != project['Skillset'].length - 1) {
                            dataContainer.innerHTML += ', '
                        } else {
                            dataContainer.innerHTML += '<br>'
                        }
                    }
                }
            }
        }
    }
}
(async function () {
    const tableNames = { 'Impact Icon': 'impact_type_icon', 'Projects': 'tblOcD3LEkOqBnNEc', 'Teaching': 'tblZnAAY7y1moFRxh', 'Courses': 'tbl5V5znRDpEUXiaq', 'Impacts': 'tbl8Uz1nKYjAKrJ6F', 'Skills': 'tbln7FBtnN52sgo6L', 'Employers': 'tblnDRdAD60GWT44l', "Organizations": 'tblywl7oH38Dt1IkX', 'Themes': 'tblRnPDB0PO33KY76', 'Job Search Resources': 'tblPshXYvK7O3Sq8q', 'Photos': 'tblWOSwKNv0nHrVjC', 'Programs': 'tbl0QqTgzJ2aBIFKL' }
    for (let key in tableNames) {
        tables[key] = await getTable(tableNames[key])
    }
    for (let table in tables) {
        let temp = []
        for (let key in tables[table].records) {
            field = tables[table].records[key]
            masterTable[field.id] = field.fields
            if (!masterTable[field.id].Name) {
                if (masterTable[field.id]['Project Name']) {
                    masterTable[field.id].Name = masterTable[field.id]['Project Name']
                }
                if (masterTable[field.id]['Name*']) {
                    masterTable[field.id].Name = masterTable[field.id]['Name*']
                }
            }
            masterTable[field.id].id = field.id
            masterTable[field.id].type = table
            temp.push(masterTable[field.id])
        }
        tables[table] = temp
    }
    document.getElementById('loader').style.display = 'None'
    const resultsContainer = document.getElementById('resultsContainer')
    results = filter({ type: ['Projects', 'Impacts'] }, '')
    for (id in results) {
        resultsContainer.innerHTML += (`<button onclick="display('${id}')" class="data">${masterTable[id].Name}</button>`)
    }
    if (!resultsContainer.innerHTML) resultsContainer.innerHTML = '<strong class="large header" class="data">No Results Found</strong>'
})()
