
//navigation bar funtion
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle("scroller", window.scrollY > 0);
});

//Variable arrays
const menu = [
    {
        name: 'Pizza Marinara',
        price: 22.5,
        image: 'img/Pizza-Marinara.jpg',
    },
    {
        name: 'Pizza Margherita',
        price: 29,
        image: 'img/Pizza-Margherita.jpg',
    },
    {
        name: 'Pizza alla Napoletana',
        price: 25,
        image: 'img/Pizza-alla-Napoletana.jpg',
    },
    {
        name: 'Pizza al Prosciutto',
        price: 20,
        image: 'img/Pizza-al-Prosciutto.jpg',
    },
    {
        name: 'Pizza ai quattro formaggi',
        price: 32.75,
        image: 'img/Pizza-ai-quattro-formaggi.jpg',
    },
    {
        name: 'Pizza ai Funghi',
        price: 35,
        image: 'img/Pizza-ai-Funghi.jpg',
    },
]

//Literal object
let cart = {
    dishes: [],
    totalPrice: 0,
}

//Function show all menus
showAllMenus()

function showAllMenus() {
    const menuList = document.getElementById('menu-list')
    menuList.innerHTML = ''
    menu.forEach((food, index) => {
        menuList.innerHTML += `
            <div class="imgMenu">
                <img src="${food.image}" alt="Pizza image">
            </div>
            <div class="text">
                <h3>${food.name}</h3>
                <h3>$${food.price}</h3>
                <div>
                    <button class="btn btn-add-to-cart" onclick="addToCart(${index})">
                        ADD TO CART
                    </button>
                </div>
            </div>
        `
    })
}

//Function show menus in cart
showMenuInCart()

function showMenuInCart() {
    const cartList = document.getElementById('cart-list')
    const totalPriceElement = document.getElementById('total-price')
    let totalPrice = 0
    cartList.innerHTML = ''
    
    cart.dishes.forEach((cartDish) => {
        totalPrice += cartDish.totalEach
        cartList.innerHTML += `
            <div class="imgMenu">
                <img src="${cartDish.image}" alt="Pizza image">
            </div>
            <div class="text">
                <h3>${cartDish.name}</h3>
                <h3>Amount: ${cartDish.amount} Dish(es)</h3>
                <h3>Cost: ${cartDish.totalEach}</h3>
                <div>
                    <button class="btn btn-remove-from-cart" onclick="removeFromCart('${cartDish.name}')">
                        REMOVE FROM CART
                    </button>
                </div>
            </div>    
        `
    })
    totalPriceElement.innerText = `Total Price: $${totalPrice}`
}

//Function add to cart
function addToCart(menuItem) {
    const dish = menu[menuItem]
    let alreadyInCart = false

    let newDish = cart.dishes.reduce((order, foodItem) => {
        if(foodItem.name === dish.name) {
            alreadyInCart = true
            const addDish = {
                ...foodItem, amount: foodItem.amount +1,
                totalEach: (foodItem.amount +1) * foodItem.price
            }
            return [...order, addDish]; 
        }
        return [...order, foodItem]
    }, [])

    if(!alreadyInCart) {
        newDish.push({
            ...dish, amount: 1, totalEach: dish.price
        })
    }

    cart = {
        dishes: newDish,
    }
    showMenuInCart();
}

//Function remove from cart
function removeFromCart(dishName) {
    let newDish = cart.dishes.reduce((order, foodItem) => {
        if(foodItem.name === dishName) {
            const addDish = {
                ...foodItem, amount: foodItem.amount -1,
                totalEach: (foodItem.amount -1) * foodItem.price
            }
            if(addDish.amount > 0) {
                return [...order, addDish];
            }
            return order
        }
        return [...order, foodItem]
    }, [])

    cart = {
        dishes: newDish,
    }
    showMenuInCart();
}