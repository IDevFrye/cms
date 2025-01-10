import {renderGoods} from './render.js';
import {createGood} from './data.js';

export const modalControl = (btnAdd, overlay, openModal, closeModal) => {
  btnAdd.addEventListener('click', openModal);
  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      closeModal();
    };
  });
};

export const deleteControl = (tableBody, goods, total) => {
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

export const formControl = (form, goods, cmsTotal,
    vendorId, total, closeModal) => {
  const {
    name: title,
    category,
    description,
    units,
    discount,
    discount_count: discountCount,
    count,
    price,
    image,
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
    const newGood = createGood(formData, parseInt(vendorId.textContent));
    goods.push(newGood);
    renderGoods(goods, cmsTotal);
    console.log('Обновлённые данные:', goods);

    form.reset();
    closeModal();
  });
};
