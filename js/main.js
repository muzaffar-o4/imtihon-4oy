const tBody = document.querySelector('.t-body');
const modalBtn = document.querySelector('.modal__btn')

const loader = document.querySelector('.spinner__div');



const localCurrencies = localStorage.getItem('currencies')


let currencies = [];



if (localCurrencies) currencies = JSON.parse(localCurrencies);

async function getData(url) {
    try {
        const newData = await fetch(url);
        const { data } = await newData.json();

        currencies = data;

        if (currencies.length > 0) {
            render(currencies)
        }
        localStorage.setItem('currencies', JSON.stringify(data));

        if (newData.status == 200) {
            loader.classList.add('d-none')
        }

    } catch (err) {
        console.error(err)
        console.log('Internet mavjud emas' + " " + err);
    }
}

getData('https://pressa-exem.herokuapp.com/api-49');



function render(currencies) {
    tBody.innerHTML = "";

    const fragment = document.createDocumentFragment();

    currencies.forEach(el => {

        let cardContent = document.createElement('tr');
        cardContent.className = '.card__content';

        let cardNumber = document.createElement('th');
        cardNumber.className = '.card__number';
        cardNumber.textContent = el.Code;

        let cardName = document.createElement('td');
        cardName.className = '.card__name';
        cardName.textContent = el.CcyNm_UZ;

        let cardAlphabet = document.createElement('td');
        cardAlphabet.className = '.card__alphabet';
        cardAlphabet.textContent = el.Ccy;

        let cardCurrencie = document.createElement('td');
        cardCurrencie.className = '.card__currencie';
        cardCurrencie.textContent = el.Rate;

        let cardUpdate = document.createElement('td');
        cardUpdate.className = '.card__update';
        cardUpdate.textContent = el.Date;

        // Bookmark button
        let bookmarkBtn = document.createElement('td');
        bookmarkBtn.className = 'bookmark__btn';
        let bookmarkButton = document.createElement('button');
        bookmarkButton.className = 'btn btn-primary';
        let bookmarkBtnIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let bookmarkBtnIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        bookmarkBtnIconPath.setAttribute('d', 'M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z');
        bookmarkBtnIcon.setAttribute('width', '16')
        bookmarkBtnIcon.setAttribute('height', '16')
        bookmarkBtnIcon.setAttribute('id', 'bookmark__add')
        bookmarkBtnIcon.setAttribute('fill', 'currentColor')
        bookmarkBtnIcon.setAttribute('class', 'bi bi-bookmark-star-fill')
        bookmarkBtnIcon.setAttribute('viewBox', '0 0 16 16')
        bookmarkBtnIcon.append(bookmarkBtnIconPath)

        bookmarkButton.append(bookmarkBtnIcon)
        bookmarkBtn.append(bookmarkButton)



        // bookmark 

        const spanAdd = document.querySelector('#span__num');
        const visual = document.querySelector('#visual')
        bookmarkButton.addEventListener('click', (e) => {
            const target = e.target.className;
            // let count = 0;

            if (target == 'btn btn-primary') {
                bookmarkButton.className = 'btn btn-warning';
                visual.classList.add('badge')
                spanAdd.innerHTML++;
                bookmarkBtnIcon.setAttribute('fill', 'red')
            }
            if (target == 'btn btn-warning') {
                bookmarkButton.className = 'btn btn-primary';
                visual.classList.add('badge')
                spanAdd.innerHTML--;
                bookmarkBtnIcon.setAttribute('fill', 'currentColor')
            }

            // spanAdd.innerHTML--;
        })


        cardContent.append(cardNumber, cardName, cardAlphabet, cardCurrencie, cardUpdate, bookmarkBtn);
        fragment.append(cardContent);
        tBody.appendChild(fragment);
    });

}

render(currencies);

// sort
const sortPrice = document.querySelector('.form-select');

sortPrice.addEventListener("change", (e) => {
    const sortingType = e.target.value;
    let newData = [...currencies];

    newData.sort((a, b) => {
        if (sortingType === 'up') {
            return b.Rate - a.Rate
        } else if (sortingType === 'down') {
            return a.Rate - b.Rate;
        } else {
            newData = currencies;
        }
    })

    render(newData)
});


// search Filter
const searchFilter = document.querySelector('#searchFilter');

searchFilter.addEventListener('input', (e) => {
    const searchType = e.target.value.trim();

    let newData;

    newData = [...currencies].filter((el) => {
        let rate = +el.Rate; // + this is numaber
        // rate = Number(rate); 
        if (rate >= searchType) return el;

    })

    render(newData)
});

const token = window.localStorage.getItem('token')

setTimeout(() => {

    if (!token) {
        modalBtn.click()
        localStorage.setItem('token', 'Activited success!')
    }
}, 10000);



