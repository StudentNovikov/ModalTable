/* eslint-disable import/prefer-default-export */

class ModalManager {
  constructor() {
    this.queue = [];
    this.modalType = {
      Table: () => {
        this.modalRef.innerHTML = `<div class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <button class="btn btn-green" id="confirm-no"> NO </button>
            <button class="btn btn-red" id="confirm-yes"> YES </button>
          </div>
        </div>`;
      },
      Confirmation: () => {
        this.modalRef.innerHTML = `<div class="modal">
      <div class="modal-content updateAdd">
        <span class="close" hidden>&times;</span>
        <h2 class="text-center my-1"> Are you sure? </h2>
        <div class="flex">
          <button class="btn btn-green" id="confirm-no" > NO </button>
          <button class="btn btn-red" id="confirm-yes"> YES </button>
        </div>
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

  show = () => {
    this.renderModalTemplate(this.queue[this.queue.length - 1].type);
    this.subscribeToEvents();
    this.queue[this.queue.length - 1].render();
  }

  createModalContainer() {
    document.body.innerHTML += '<div id="modal"></div>';
    this.modalRef = document.getElementById('modal');
  }

  subscribeToEvents() {
    this.closeButtonClick();
    this.clickNotInModal();
    this.clickYesConfirm();
    this.clickNoConfirm();
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

  clickYesConfirm = () => {
    document.getElementById('confirm-yes').addEventListener('click', () => {
      this.queue[this.queue.length - 1].onSuccess();
      this.closeModal();
    });
  }

  clickNoConfirm = () => {
    document.getElementById('confirm-no').addEventListener('click', () => this.closeModal());
  }

  closeModal = () => {
    if (this.queue.length === 1) {
      this.modalRef.innerHTML = '';
    } else {
      this.remove();
    }
  }

  renderModalTemplate(type) {
    this.modalType[type]();
  }

  add(item) {
    this.queue.push(item);
  }

  remove() {
    this.queue.pop();
    this.show(this.queue[this.queue.length - 1]);
  }

}
export { ModalManager };
