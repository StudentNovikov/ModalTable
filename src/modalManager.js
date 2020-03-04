/* eslint-disable import/prefer-default-export */

class ModalManager {
  constructor() {
    this.stack = [];
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
      <div class="modal-content confirm-window">
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
          <div class="modal-content add-confirm-modal">
            <span class="close">&times;</span>
            <div class="hide">
              <button class="btn btn-green" id="confirm-no"> NO </button>
            </div>
            <form>
              <p><label for="name">Name:</label></p>
              <input type="text" name="inputName" id="name">
              <p><label for="serialNumber">Serial Number:</label></p>
              <input type="text" name="inputSerialNumber" id="serialNumber">
              <p><label for="count">Count:</label></p>
              <input type="number" name="inputSerialNumber" id="count">
              <p><label for="price">Price:</label></p>
              <input type="text" name="inputPrice" id="price">
              <br>
              <label for="isAvaliable" class="my-1 inline-block va-sub">Is Avaliable:</label>
              <input type="checkbox" name="inputIsAvaliable" id="isAvaliable" value="isAvaliable">
              <p><label for="date">Date:</label></p>
              <input type="datetime-local" name="inputDate" id="date">
              <br>
            </form>
            <button class="btn btn-green mt-1" id="confirm-yes"> Confirm </button>
        </div>`;
      },
    };
    this.createModalContainer();
  }

  show = () => {
    this.renderModalTemplate(this.stack[this.stack.length - 1].type);
    this.subscribeToEvents();
    this.stack[this.stack.length - 1].render();
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

    if(this.stack[this.stack.length - 1].type === 'AddUpdate') {
     this.addFormValidation();
    }
  }

  addFormValidation(){
    document.getElementById('name').addEventListener('blur',() => {
      if(document.getElementById('name').value.length < 3 || document.getElementById('name').value.length > 20){
        this.disableSubmitAddUpdate();
        this.showToolTip('name','Name - required, min 3 chars, max 20 chars');
      }
    })
    document.getElementById('serialNumber').addEventListener('blur', () => {
      if(document.getElementById('serialNumber').value.toString().length !== 10){
        this.disableSubmitAddUpdate();
        this.showToolTip('serialNumber','SerialNumber - required, 10digits');
      }
    });
  }



  disableSubmitAddUpdate(){
    document.getElementById('confirm-yes').disabled = true;
  }

  showToolTip(index,message){
    console.log('-------------');
    console.log(index);
    console.log(message);
  }

  closeButtonClick = () => {
    document.getElementById('modal').querySelector('.close').addEventListener('click', () => {
      this.add({ type: 'Confirmation', onSuccess: this.closeModal ,render: () => {}})
      this.show();
    });
  }

  clickNotInModal() {
    this.modalRef.addEventListener('click', (e) => {
      if (e.target.classList == 'modal' && this.stack[this.stack.length - 1].type !== 'Confirmation') {
        this.add({ type: 'Confirmation', onSuccess: this.closeModal ,render: () => {}})
        this.show();
      } else if(e.target.classList == 'modal'){
        this.closeModal();
      }
    });
  }

  clickYesConfirm = () => {
    document.getElementById('confirm-yes').addEventListener('click', () => {
      this.stack[this.stack.length - 1].onSuccess();
      this.closeModal();
    });
  }

  clickNoConfirm = () => {
    document.getElementById('confirm-no').addEventListener('click', () => this.closeModal());
  }

  closeModal = () => {
    if (this.stack.length === 1) {
      this.modalRef.innerHTML = '';
    } else {
      this.remove();
    }
  }

  renderModalTemplate(type) {
    this.modalType[type]();
  }

  add(item) {
    this.stack.push(item);
  }

  remove() {
    this.stack.pop();
    this.show(this.stack[this.stack.length - 1]);
  }

}
export { ModalManager };
