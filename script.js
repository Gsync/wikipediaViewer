const form = document.querySelector('.searchForm');
const input = document.querySelector('.search'); 
const btn = document.querySelector('.btn');

btn.addEventListener('click', function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
})

form.addEventListener('submit', function (e) {
    let query = input.value;
    e.preventDefault();
    if (query) {
        fetchData(query);
        input.value = "";
    }
});

function fetchData(q) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${q}`;
    fetch(url).then(res => res.json()).then(data => {
        
        const results = data.query.search;
        displayResults(results);
        
    });
}

function displayResults(arr) {
    arr.forEach(e => {
        const div = document.querySelector('.results');
        div.insertAdjacentHTML('afterbegin', `
            <div class="result">
                <a href="https://en.wikipedia.org/wiki/${e.title}" target="_blank">
                    <h2>${e.title}</h2> 
                </a>
                    <p>${e.snippet}</p>
            </div>
        `);
    });
}
