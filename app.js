const input = document.querySelector('#input');
const resultatDone = document.querySelector('.grid')


input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchMeal(input.value)
      }
})


async function searchMeal(input) {
    const requete = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}` , {
        method : 'GET'
    })

    if(!requete.ok) {
        alert('un problème est survenue')
    } else {
        let data = await requete.json()
        data.meals.forEach(element => {
            // console.log(element.strMeal)
            console.log(element)
            const card = document.createElement('div');
            card.classList.add('card')
            
            const img = document.createElement('img');
            img.src = element.strMealThumb;
            img.alt = element.strMeal;
            card.appendChild(img);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h2')
            title.innerText = element.strMeal;
            cardContent.appendChild(title)

            const main = document.querySelector('main');
            card.appendChild(cardContent)
            main.appendChild(card)
            
        });
    }
};

