let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;



next.onclick = () => {
    carousel.classList.remove('prev');
    carousel.classList.add('next');
    active =active + 1 >= countItem ? 0 : active + 1;
    other_1 =active - 1 < 0 ? countItem -1 : active - 1;
    other_2 = active + 1 >= countItem ? 0 : active + 1;
    changeSlider();
}
prev.onclick = () => {
    carousel.classList.remove('next');
    carousel.classList.add('prev');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}
const changeSlider = () => {
    let itemOldActive = document.querySelector('.carousel .item.active');
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

    let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

    items.forEach(e => {
        e.querySelector('.image img').style.animation = 'none';
        e.querySelector('.image figcaption').style.animation = 'none';
        void e.offsetWidth;
        e.querySelector('.image img').style.animation = '';
        e.querySelector('.image figcaption').style.animation = '';
    })

    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        next.click();
    }, 5000);
}
let autoPlay = setInterval(() => {
    next.click();
}, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".smooth-scroll .hero-scroller, .smooth-scroll .container, .smooth-scroll .column, .smooth-scroll .sidebar, .smooth-scroll .footer");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
});

function scrollSlider(direction) {
    const container = document.querySelector(".small-slider");
    const scrollAmount = 300;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}


function autoScrollSlider() {
    document.querySelector(".small-slider").classList.add("auto-scroll");
}


function fadeInOnScroll() {
    document.querySelectorAll(".fade-in").forEach((img) => {
        if (img.getBoundingClientRect().top < window.innerHeight * 0.9) {
            img.classList.add("visible");
        }
    });
}


document.addEventListener("scroll", fadeInOnScroll);
document.addEventListener("DOMContentLoaded", () => {
    fadeInOnScroll();
    setTimeout(autoScrollSlider, 1000);
});

let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');
let listProducts = [
    {
        id: 1,
        name: 'Name product white-black',
        price: 205600,
        quantity: 0,
        image: "./images/lb-1.jpg",
        nature: {
            color: ['white', 'black'],
            size: ['S', 'M', 'L'],
            type: 'T-shirt'
        }
    },
    {
        id: 2,
        name: 'Name product white-black-grey',
        price: 300000,
        quantiy: 30,
        image: 'img2.jpg',
        nature: {
            color: ['white', 'black', 'grey'],
            size: ['S', 'M', 'L'],
            type: 'Polo'
        }
    },
    {
        id: 3,
        name: 'Name product black',
        price: 200000,
        quantiy: 30,
        image: 'img3.jpg',
        nature: {
            color: ['black'],
            size: ['S', 'M', 'L'],
            type: 'T-shirt'
        }
    },
    {
        id: 4,
        name: 'Name product blue-black',
        price: 400000,
        quantiy: 30,
        image: 'img4.jpg',
        nature: {
            color: ['black', 'blue'],
            size: ['S', 'M', 'L'],
            type: 'T-shirt'
        }
    },
    {
        id: 5,
        name: 'Name product brown',
        price: 320000,
        quantiy: 30,
        image: 'img5.jpg',
        nature: {
            color: ['brown'],
            size: ['S', 'M', 'L'],
            type: 'Polo'
        }
    },
    {
        id: 6,
        name: 'Name product white-black',
        price: 100000,
        quantiy: 30,
        image: 'img6.jpg',
        nature: {
            color: ['white', 'black'],
            size: ['S', 'M', 'L'],
            type: 'Shirt'
        }
    },

];
let productFilter = listProducts;
showProduct(productFilter);
function showProduct(productFilter){
    count.innerText = productFilter.length;
    list.innerHTML = '';
    productFilter.forEach(item => {
        let newItem = document.createElement('div');
        newItem.classList.add('item-sr');

        // create image
        let newImage = new Image();
        newImage.src = item.image;
        newItem.appendChild(newImage);
        // create name product
        let newTitle = document.createElement('div');
        newTitle.classList.add('title');
        newTitle.innerText = item.name;
        newItem.appendChild(newTitle);
        // create price
        let newPrice = document.createElement('div');
        newPrice.classList.add('price');
        newPrice.innerText = item.price.toLocaleString() + ' đ';
        newItem.appendChild(newPrice);

        list.appendChild(newItem);
    });
}
filter.addEventListener('submit', function(event){
    event.preventDefault();
    let valueFilter = event.target.elements;
    productFilter = listProducts.filter(item => {
        // check category
        if(valueFilter.category.value != ''){
            if(item.nature.type != valueFilter.category.value){
                return false;
            }
        }
        // check color
        if(valueFilter.color.value != ''){
            if(!item.nature.color.includes(valueFilter.color.value)){
                return false;
            }
        }
        // check name
        if(valueFilter.name.value != ''){
            if(!item.name.includes(valueFilter.name.value)){
                return false;
            }
        }
        // check min price
        if(valueFilter.minPrice.value != ''){
            if(item.price < valueFilter.minPrice.value){
                return false;
            }
        }
        //  check max price
        if(valueFilter.maxPrice.value != ''){
            if(item.price > valueFilter.maxPrice.value){
                return false;
            }
        }


        return true;
    })
    showProduct(productFilter);
})