const API_KEY = "2d5c49a45ff345fc862808bcb4027b3e"
const container = document.getElementById("container")
const mySearch = document.getElementById("my-search")
const mySearchBtn = document.getElementById("search-btn")
const myLinks = document.querySelectorAll(".link")
const showResults = document.getElementById("results")

async function fetchData(query = "Ballari") {
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.status == "ok") {
            showResults.innerHTML = `Showing Results For: ${query}`
            bindData(data.articles)
        }
        else {
            container.innerHTML = data.message
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
            if (article.urlToImage) {
                let artDate = new Date(article.publishedAt)
                container.innerHTML += `
        <div class="card">
                <img src="${article.urlToImage}" alt="news img">
                <h1>${article.title}</h1>
                <p class="date">Published at: ${artDate.toDateString()}</p>
                <p class="source">Source: ${article.source.name}</p>
                <p class="desc">${article.description}</p>
                <p class="article-content">
                ${article.content}
                </p>
                <a href="${article.url}" target="_blank"><button class="read-more">Read More >></button></a>
        </div>
        `
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchData()

    mySearchBtn.addEventListener("click", (e) => {
        e.preventDefault()
        myLinks.forEach((ele) => {
            ele.classList.remove("active")
        })
        if (mySearch.value.trim()) {
            fetchData(mySearch.value)
        } else {
            alert("Please enter a search term");
        }
    })

    myLinks.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            myLinks.forEach((ele) => {
                ele.classList.remove("active")
            })
            fetchData(e.target.innerText)
            e.target.classList.add("active")
        })
    })

})