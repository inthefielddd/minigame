//fetch를 통해서 json data값을 받아온다
const loadItems = () => {
    return fetch("../data/data.json")
        .then((res) => res.json())
        .then((json) => json.items);
};

//items를 화면에 표기하기위해서 createHTML에 items의 각각의 요소를 전달해주기
const displayItems = (items) => {
    //ul 가져오기
    const container = document.querySelector(".items");
    container.innerHTML = items.map((item) => createHTML(item));
};

const createHTML = (item) => {
    return `
     <li class="item">
        <img src=${item.image} alt=${item.type} class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`;
};

const setEventListener = (items) => {
    const logo = document.querySelector(".logo");
    const buttons = document.querySelector(".buttons");
    logo.addEventListener("click", () => displayItems(items));
    buttons.addEventListener("click", (event) => onButtonClick(event, items));
};

const onButtonClick = (event, items) => {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    //button이 아닌 부분을 선택했을때는 함수를 종료한다
    if (key == null || value == null) {
        return;
    }
    const filtered = items.filter((item) => item[key] === value);
    displayItems(filtered);
};

loadItems() //
    .then((items) => {
        displayItems(items);
        setEventListener(items);
    })
    .catch(console.log);
