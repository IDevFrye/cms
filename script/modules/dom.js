const getElements = () => ({
  modalTitle: document.querySelector('.modal__title'),
  modalDiscountCheckbox: document.querySelector('.modal__checkbox'),
  modalDiscountInput: document.querySelector('.modal__input_discount'),
  modalWindow: document.querySelector('.modal'),
  overlay: document.querySelector('.overlay'),
  modalForm: document.querySelector('.modal__form'),
  modalTotal: document.querySelector('.modal__total-price'),
  btnAdd: document.querySelector('.panel__add-goods'),
  tableBody: document.querySelector('.table__body'),
  vendorId: document.querySelector('.vendor-code__id'),
  totalField: document.querySelector('.cms__total-price'),
});

const createRow = (item, index) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
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
    </td>`;
  return tr;
};

export default {
  getElements,
  createRow,
};
