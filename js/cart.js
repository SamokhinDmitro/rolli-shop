    //Добавление товара в корзину

    const cartWrapper = document.querySelector('.cart-wrapper');

    window.addEventListener('click', function (event) {

        //Добавление товара в корзину
        if (event.target.hasAttribute('data-cart')) {

            const card = event.target.closest('.card');

            const productInfo = {
                id: card.dataset.id,
                img: {
                    src: card.querySelector('.product-img').getAttribute('src'),
                    alt: `Product`
                },
                title: card.querySelector('.item-title').innerText,
                itemsInBox: card.querySelector('[data-items-in-box]').innerText,
                counter: card.querySelector('[data-counter]').innerText,
                weight: card.querySelector('.price__weight').innerText,
                price: card.querySelector('.price__currency').innerText
            };

            const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

            if(itemInCart){
                //Если товар уже есть в корзине
                const counterElement = itemInCart.querySelector('[data-counter]');
                counterElement.textContent = Number(counterElement.textContent) + Number(productInfo.counter);

            }else{
                //Если товара отсутствует в корзине
                let cartItem = createCartItem(productInfo);
                cartWrapper.insertAdjacentHTML('beforeend', cartItem);
            }

            //Задаем начальное значение у карточки товара
            card.querySelector('[data-counter]').innerText = '1';

            toggleCartStatus();
        }


    });

    function createCartItem(obj) {
       return  `
    <div class="cart-item" data-id="${obj.id}">
    <div class="cart-item__top">
    <div class="cart-item__img">
        <img src="${obj.img.src}" alt="${obj.img.alt}">
    </div>
    <div class="cart-item__desc">
        <div class="cart-item__title">${obj.title}</div>
        <div class="cart-item__weight">${obj.itemsInBox} / ${obj.weight}</div>
    <div class="cart-item__details">

    <div class="items items--small counter-wrapper">
        <div class="items__control" data-action="minus">-</div>
        <div class="items__current" data-counter>${obj.counter}</div>
        <div class="items__control" data-action="plus">+</div>
    </div>

    <div class="price">
        <div class="price__currency">${obj.price}</div>
    </div>

        </div>
            </div>
        </div>
    </div>
           `;
    }

    //Показываем / скрываем блок Корзина пуста, пересчет стоимости товара

    function toggleCartStatus(){

        const cartEmpty = document.querySelector('[data-cart-empty]');
        const cartTotal = document.querySelector('.cart-total');
        const orderForm = document.querySelector('#order-form');
        const delivery = cartTotal.querySelector('.delivery-cost');

       //Показывем или скрываем определенные элементы корзины

        if(cartWrapper.querySelectorAll('.cart-item').length > 0){
            cartEmpty.classList.add('none');
            cartTotal.classList.remove('none');
            orderForm.classList.remove('none');
        }else{
            cartEmpty.classList.remove('none');
            cartTotal.classList.add('none');
            orderForm.classList.add('none');

        }

        //Пересчитываем стоимость заказа

        let totalPrice = 0;
        let deliveryPrice = 0;

        cartWrapper.querySelectorAll('.cart-item').forEach(item => {
            const counter = item.querySelector('[data-counter]').innerText;
            const priceOneItem = item.querySelector('.price__currency').innerText;
            const price = parseInt(priceOneItem) * parseInt(counter);

            totalPrice += price;
        });


        //Условия доставки
        if(totalPrice > 1000){
            delivery.innerText = 'бесплатно';
            totalPrice += deliveryPrice;
        }else{
            deliveryPrice = 200;
            delivery.innerText = deliveryPrice + ' ₽';
            totalPrice += deliveryPrice;
        }

        cartTotal.querySelector('.total-price').innerHTML = totalPrice ;

    }

