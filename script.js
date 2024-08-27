const API_KEY = "c3a7a1e9415e4c3539cab051b76deb24"
const container = document.getElementById("container")
const mySearch = document.getElementById("my-search")
const mySearchBtn = document.getElementById("search-btn")
const myLinks = document.querySelectorAll(".link")
const showResults = document.getElementById("results")

async function fetchData(query = "Ballari") {
    let url = `https://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&countries=in`
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.data.length !== 0) {
            showResults.innerHTML = `Showing Results For: ${query.replace("%20"," ")}`
            bindData(data.data)
        }
        else {
            container.innerHTML = "OOPS Something went wrong!"
        }
    }
    catch {
        container.innerHTML = ("Error Fetching Data")
    }
}

function bindData(articles) {

    if (articles.length === 0) {
        container.innerHTML = "No Data Found"
    }
    else {
        container.innerHTML = ""
        articles.forEach(article => {
            let artDate = new Date(article.published_at)
            container.innerHTML += `
        <div class="card">
                <img src=${article.image ? article.image : "https://via.placeholder.com/300X250"} alt="news img">
                <h1>${article.title}</h1>
                <p class="date">Published at: ${artDate.toDateString()}</p>
                <p class="source">Source: ${article.source}</p>
                <p class="desc">${article.description}</p>
                <a href="${article.url}" target="_blank"><button class="read-more">Read More >></button></a>
        </div>
        `

        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchData()

    mySearchBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (mySearch.value) {
            myLinks.forEach((ele) => {
                ele.classList.remove("active")
            })
            fetchData(mySearch.value.replace(" ","%20"))
        } else {
            alert("Please enter a search term");
        }
    })

    myLinks.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            myLinks.forEach((ele) => {
                ele.classList.remove("active")
            })
            mySearch.value = ""
            fetchData(e.target.innerText)
            e.target.classList.add("active")
        })
    })

})