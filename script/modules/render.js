import {randomizeId, calculateTotal} from './data.js';
import dom from './dom.js';

const {createRow} = dom;

export const toggleModal = (vendorId, total, overlay, {min, max}) => {
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

export const renderGoods = (objArr, totalField) => {
  const tbody = document.querySelector('.table__body');
  tbody.innerHTML = '';
  objArr.forEach((item, index) => {
    tbody.append(createRow(item, index));
  });

  totalField.textContent = `$ ${calculateTotal(objArr).toFixed(2)}`;
};
