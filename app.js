const div = document.querySelector('.data');
const form = document.querySelector('form');

const getInfo = async(name) => {
    const respond = await fetch(`https://api.github.com/users/${name}`);
    const data = await respond.json();
    return data;
}

const getRepos = async(url) => {
    const respond = await fetch(url);
    const data = await respond.json();
    return data;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    getData(form.username.value);
    form.reset();
})

const getData = (username) => {
    getInfo(username).then(d => {
        console.log(d.repos_url);
        getRepos(d.repos_url).then(d => {
            console.log(d)
            printData(d);
        }).catch(e => {
            console.log(e)
        });
    }).catch(e => {
        console.log(e)
    })
}


const printData = (data) => {
    div.innerHTML = ' ';
    for (let i = 0; i <= data.length; i++) {
        div.innerHTML += 
        `
            <li>${data[i].name}</li>
        `
    }

}
