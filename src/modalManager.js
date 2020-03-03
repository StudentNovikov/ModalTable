/* eslint-disable import/prefer-default-export */


class ModalManager {
  constructor() {
    this.queue = [];
    this.modalType = {
      Table: () => {
        this.modalRef.innerHTML = `<div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Test text..</p>
        </div>
        </div>`;
      },
      Confirmation: () => {
        this.modalRef.innerHTML = `<div class="modal">
      <div class="modal-content updateAdd">
        <span class="close">&times;</span>
        <p>Test text..</p>
      </div>
      </div>`;
      },
      AddUpdate: () => {
        this.modalRef.innerHTML = `<div class="modal">
      <div class="modal-content confirm">
        <span class="close">&times;</span>
        <p>Test text..</p>
      </div>
      </div>`;
      },
    };
    this.createModalContainer();
  }

  show({
    type, params, onClose, onCalcel, onSuccess, render,
  }) {
    this.renderModalTemplate(type);
    this.subscribeToEvents();
    render();
    this.queue.push(type);
    console.log(this.queue);
  }

  createModalContainer() {
    document.body.innerHTML += '<div id="modal"></div>';
    this.modalRef = document.getElementById('modal');
  }

  subscribeToEvents() {
    this.closeButtonClick();
    this.clickNotInModal();
  }

  closeButtonClick() {
    document.getElementById('modal').querySelector('.close').addEventListener('click', this.closeModal);
  }

  clickNotInModal() {
    this.modalRef.addEventListener('click', (e) => {
      if (e.target.classList == 'modal') {
        this.closeModal();
      }
    });
  }

  closeModal = () => {
    this.queue = [];
    this.modalRef.innerHTML = '';
  }

  renderModalTemplate(type) {
    this.modalType[type]();
  }

  add(item) {
    this.queue.push(item);
  }

  remove() {
    this.queue.pop();
    this.show();
  }

  drawModalContainer() {
    // TODO
  }
}
export { ModalManager };
