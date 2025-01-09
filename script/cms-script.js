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

  const renderGoods = (objArr, totalField) => {
    const tbody = document.querySelector('.table__body');
    tbody.innerHTML = '';
    objArr.forEach((item, index) => {
      tbody.append(createRow(item, index));
    });

    const total = [...objArr].reduce(
      (acc, item) => acc + item.count * item.price,
      0);
    totalField.textContent = `$ ${(Number(total)).toFixed(2)}`;
  };

  const randomizeId = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  const toggleModal = (vendorId, total, overlay, {min, max}) => {
    const openModal = () => {
      overlay.classList.add('active');
      const newId = randomizeId(min, max);
      vendorId.textContent = newId;
      total.textContent = '$ 0.00';
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

  const deleteControl = (tableBody, goods, total) => {
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
        renderGoods(goods, total);

        console.log('Обновлённые данные:', goods);
      };
    });
  };

  const toggleInput = (input) => {
    input.disabled = !input.disabled;
  };

  const setFormAttributes = (form) => {
    Array.from(form.elements).forEach(input => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(input.tagName)) {
        if (!['image', 'discount', 'discount_count'].includes(input.name)) {
          input.required = true;

          if (input.tagName === 'INPUT') {
            if (['count', 'price'].includes(input.name)) {
              input.type = 'number';
            } else {
              input.type = 'text';
            }
          }
        } else if (input.name === 'discount') {
          input.type = 'checkbox';
        } else if (input.name === 'discount_count') {
          input.type = 'number';
        };
      };
    });
  };

  const formControl = (form, goods, cmsTotal, vendorId, total, closeModal) => {
    const {
      name: title,
      category,
      description,
      units,
      discount,
      discount_count: discountCount,
      count,
      price,
      image
    } = form;

    setFormAttributes(form);

    discount.addEventListener('change', e => {
      if (!discountCount.disabled) {
        discountCount.value = '';
      }
      toggleInput(discountCount);
    });

    count.addEventListener('change', () => {
      total.textContent = `$ ${(count.value * price.value).toFixed(2)}`;
    });

    price.addEventListener('change', () => {
      total.textContent = `$ ${(count.value * price.value).toFixed(2)}`;
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newGood = {
        id: Number(vendorId.textContent),
        title: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        units: formData.get('units'),
        discont: Number(formData.get('discount_count')) ||
          Boolean(formData.get('discount')),
        count: Number(formData.get('count')),
        price: Number(formData.get('price')),
        images: {
          small: formData.get('image') || 'img/default-small.jpg',
          big: formData.get('image') || 'img/default-big.jpg',
        },
      };
      goods.push(newGood);
      renderGoods(goods, cmsTotal);
      console.log('Обновлённые данные:', goods);

      form.reset();
      closeModal();
    });
  };

  const init = (idBounds) => {
    const modalTitle = document.querySelector('.modal__title');
    const modalDiscountCheckbox = document.querySelector('.modal__checkbox');
    const modalDiscountInput = document.querySelector('.modal__input_discount');
    const modalWindow = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const modalForm = document.querySelector('.modal__form');
    const modalTotal = document.querySelector('.modal__total-price');
    const btnAdd = document.querySelector('.panel__add-goods');
    const tableBody = document.querySelector('.table__body');
    const vendorId = document.querySelector('.vendor-code__id');
    const totalField = document.querySelector('.cms__total-price');

    const {openModal, closeModal} = toggleModal(vendorId, modalTotal,
      overlay, idBounds);
    closeModal();

    const goods = JSON.parse(jsonData);
    renderGoods(goods, totalField);

    modalControl(btnAdd, overlay, openModal, closeModal);
    deleteControl(tableBody, goods, totalField);
    formControl(modalForm, goods, totalField, vendorId, modalTotal, closeModal);
  };

  window.cms = init;
};
