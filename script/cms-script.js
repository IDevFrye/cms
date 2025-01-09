'use strict';

{
  const jsonData = `[
    {
      "id": 234324234324545,
      "title": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "Личная техника",
      "discont": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 234324234324546,
      "title": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "Игрушки",
      "discont": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 234324234324547,
      "title": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "Техника для дома",
      "discont": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 234324234324548,
      "title": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "Кабели",
      "discont": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ]`;

  const createRow = (item, index) => {
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML('afterbegin', `
      <td class="table__cell">${index + 1}</td>
      <td class="table__cell table__cell_left table__cell_name" data-id="${item.id}">
        <span class="table__cell-id">id: ${item.id}</span>${item.title}</td>
      <td class="table__cell table__cell_left">${item.category}</td>
      <td class="table__cell">${item.units}</td>
      <td class="table__cell">${item.count}</td>
      <td class="table__cell">$${item.price}</td>
      <td class="table__cell">$${item.price * item.count}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>`);
    return tr;
  };

  const renderGoods = (objArr) => {
    const tbody = document.querySelector('.table__body');
    tbody.innerHTML = '';
    objArr.forEach((item, index) => {
      tbody.append(createRow(item, index));
    });
  };

  const toggleModal = (overlay) => {
    const openModal = () => {
      overlay.classList.add('active');
    };

    const closeModal = () => {
      overlay.classList.remove('active');
    };

    return {
      openModal,
      closeModal,
    };
  };

  const modalControl = (btnAdd, overlay, openModal, closeModal) => {
    btnAdd.addEventListener('click', openModal);
    overlay.addEventListener('click', e => {
      const target = e.target;
      if (target === overlay || target.closest('.modal__close')) {
        closeModal();
      };
    });
  };

  const deleteControl = (tableBody, goods) => {
    tableBody.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('table__btn_del')) {
        const row = target.closest('tr');
        const rowId = parseInt(row.children[1].dataset.id);
        row.remove();

        const indexToRemove = goods.findIndex(item => item.id === rowId);
        if (indexToRemove !== -1) {
          goods.splice(indexToRemove, 1);
        };
        renderGoods(goods);

        console.log('Обновлённые данные:', goods);
      };
    });
  };

  const init = () => {
    const modalTitle = document.querySelector('.modal__title');
    const modalForm = document.querySelector('.modal__form');
    const modalDiscountCheckbox = document.querySelector('.modal__checkbox');
    const modalDiscountInput = document.querySelector('.modal__input_discount');
    const overlay = document.querySelector('.overlay');
    const modalWindow = document.querySelector('.modal');
    const btnAdd = document.querySelector('.panel__add-goods');
    const tableBody = document.querySelector('.table__body');

    const {openModal, closeModal} = toggleModal(overlay);
    closeModal();

    const goods = JSON.parse(jsonData);
    renderGoods(goods);

    modalControl(btnAdd, overlay, openModal, closeModal);
    deleteControl(tableBody, goods);
  };

  window.cms = init;
};
