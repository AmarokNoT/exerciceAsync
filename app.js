const input = document.querySelector('#search');
const resultatDone = document.querySelector('.grid');
const searchBtn = document.getElementById('search-icon');
const search = document.getElementById('search');
const searchAnimation = document.getElementById('search-animation');
const tip = document.getElementById('tip');

searchBtn.addEventListener('click', ()=>{
    search.style.animation = 'none';
    search.style.width = '50%';
    search.style.paddingLeft = '50px';
    search.style.cursor = 'text';
    search.focus();
    searchAnimation.style.animation = 'none';
    searchAnimation.style.zIndex = "-1";
});
 search.addEventListener('blur',()=>{
    search.style.width = '20px';
    search.style.paddingLeft = '20px';
    search.style.cursor = 'pointer';
    search.value = ""; 
    searchAnimation.style.animation = 'grow 1s infinite 2s';
 });


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
            const card = document.createElement('a');
            card.classList.add('card')
            
            const img = document.createElement('div');
            img.style.backgroundImage = `url(${element.strMealThumb})`;
            img.alt = element.strMeal;
            img.classList.add('card__background')
            card.appendChild(img);

            const cardContent = document.createElement('div');
            cardContent.classList.add('card__content');

            const cat = document.createElement('p');
            cat.innerText = element.strCategory;
            cat.classList.add('card__category');
            cardContent.appendChild(cat);

            const title = document.createElement('h3')
            title.innerText = element.strMeal;
            title.classList.add('card__heading')
            cardContent.appendChild(title);

            const cardGrid = document.querySelector('.card-grid');
            card.appendChild(cardContent)
            cardGrid.appendChild(card)
            
        });
    }
};

