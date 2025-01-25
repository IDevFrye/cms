import {jsonData} from './modules/data.js';
import dom from './modules/dom.js';
import {renderGoods, toggleModal} from './modules/render.js';
import * as control from './modules/controllers.js';

const {getElements} = dom;

export const init = (idBounds) => {
  const {
    overlay,
    modalForm,
    modalTotal,
    btnAdd,
    tableBody,
    vendorId,
    totalField,
  } = getElements();

  const {openModal, closeModal} = toggleModal(vendorId, modalTotal,
    overlay, idBounds);
  closeModal();

  const goods = JSON.parse(jsonData);
  renderGoods(goods, totalField);

  control.modalControl(btnAdd, overlay, openModal, closeModal);
  control.deleteControl(tableBody, goods, totalField);
  control.formControl(modalForm, goods, totalField,
    vendorId, modalTotal, closeModal);
  control.openImageControl(tableBody);
};

window.cms = init;
