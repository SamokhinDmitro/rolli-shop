document.addEventListener('DOMContentLoaded', function(){

    //Универсальное решение для всех карточек

    window.addEventListener('click', function(event){

        //Счетчик количества  товара
        if(event.target.hasAttribute('data-action')){

            //Обертка кнопки
            const counterWrapper = event.target.closest('.counter-wrapper');
            //Счетчик
            const counter = counterWrapper.querySelector('[data-counter]');

            if(event.target.dataset.action === 'plus'){
                counter.textContent = ++counter.textContent;

                if(event.target.closest('.cart-wrapper')){
                    toggleCartStatus();
                }



            }else if(event.target.dataset.action === 'minus'){

                //Проверка где находиться товар в каталоге или в корзине
                if(event.target.closest('.cart-wrapper')){
                    //Если товар в корзине - уменьшаем до 1 иначе потом удаляем
                    if(Number(counter.textContent) > 1){
                        counter.textContent = --counter.textContent;
                    }else{
                        //Если количество равно 1 - удаляем товар из корзины
                        event.target.closest('.cart-item').remove();
                    }
                    //Пересчитываем стоимость товара
                    toggleCartStatus();

                }else{
                    //Если товар в каталоге - то уменьшаем до 1
                    if(Number(counter.textContent) > 1){
                        counter.textContent = --counter.textContent;
                    }


                }


            }
        }
    });







    /*
    //Счетчик для одной карточки товара
    const btnPlus = document.querySelector('[data-action="plus"]');
    const btnMinus = document.querySelector('[data-action="minus"]');

    btnPlus.addEventListener('click', function(event){

        //Обертка кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');
        //Счетчик
        const counter = counterWrapper.querySelector('[data-counter]');

        counter.textContent = ++counter.textContent;

    });

    btnMinus.addEventListener('click', function(event){

        //Обертка кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');
        //Счетчик
        const counter = counterWrapper.querySelector('[data-counter]');

        if(Number(counter.textContent) > 1 ){
            counter.textContent = --counter.textContent;
        }
    });
     */





    
});
