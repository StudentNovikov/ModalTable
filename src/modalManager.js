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
              <div>
                <p><label for="name">Name:</label></p>
                <input type="text" name="inputName"  id="name">
              </div>
              <div>
                <p><label for="serialNumber">Serial Number:</label></p>
                <input type="text" name="inputSerialNumber" id="serialNumber">
              </div>
              <div>
                <p><label for="count">Count:</label></p>
                <input type="number" name="inputSerialNumber" placeholder="0" id="count">
              </div>
               <div>
                <p><label for="price">Price:</label></p>
                <input type="text" name="inputPrice" placeholder="-.--" id="price">
              </div>
              <br>
              <label for="isAvaliable" class="my-1 inline-block va-sub">Is Avaliable:</label>
              <input type="checkbox" name="inputIsAvaliable" id="isAvaliable" value="isAvaliable">
              <div>
                <p><label for="date">Date:</label></p>
                <input type="datetime-local" name="inputDate" id="date">
              </div>
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
    this.disableSubmitAddUpdate();
    document.getElementById('name').addEventListener('blur',() => {
      if(document.getElementById('name').value.length < 3 || document.getElementById('name').value.length > 20 || document.getElementById('name').value == '' ){
        this.disableSubmitAddUpdate();
        this.showToolTip('name','Name - required, min 3 chars, max 20 chars');
      } else {
        this.hideToolTip('name');
        if(!document.querySelector('*[tooltip]')){
          this.enableSubmitAddUpdate();
        }
      }
    })

    document.getElementById('serialNumber').addEventListener('blur', () => {
      if(document.getElementById('serialNumber').value.toString().length !== 10){
        this.disableSubmitAddUpdate();
        this.showToolTip('serialNumber','SerialNumber - required, 10digits');
      } else {
        this.hideToolTip('serialNumber');
        if(!document.querySelector('*[tooltip]')){
          this.enableSubmitAddUpdate();
        }
      }
    });

    document.getElementById('count').addEventListener('blur', () => {
      const numberRegex = /^[0-9]*$/;
      if(!document.getElementById('count').value.match(numberRegex)){
        this.disableSubmitAddUpdate();
        this.showToolTip('count','Count - only digits');
      } else {
        this.hideToolTip('count');
        if(!document.querySelector('*[tooltip]')){
          this.enableSubmitAddUpdate();
        }
      }
    });

    document.getElementById('price').addEventListener('blur', () => {
      const floatRegex = /^[0-9]*\.?[0-9]+$/;
      if(!document.getElementById('price').value.match(floatRegex) && document.getElementById('price').value !== ''){
        this.disableSubmitAddUpdate();
        this.showToolTip('price','Price - only numbers');
      } else {
        this.hideToolTip('price');
        if(!document.querySelector('*[tooltip]')){
          this.enableSubmitAddUpdate();
        }
      }
    });

    document.getElementById('date').addEventListener('blur', () => {
       if( (new Date(new Date() - new Date(document
        .getElementById('date').value)).getUTCFullYear() - 1970) !== 0 ){
          this.disableSubmitAddUpdate();
          this.showToolTip('date','Date: not earlier than current moment of time, not further than 1 year from current moment of time.');
      } else {
        this.hideToolTip('date');
        if(!document.querySelector('*[tooltip]')){
          this.enableSubmitAddUpdate();
        }
      }
    });
  }

  disableSubmitAddUpdate(){
    document.getElementById('confirm-yes').disabled = true;
  }

  enableSubmitAddUpdate(){
    if(document.getElementById('name').value !== '' && document.getElementById('serialNumber').value !== ''){
      document.getElementById('confirm-yes').disabled = false;
    }
  }

  showToolTip(index,message){
    document.getElementById(index).parentNode.firstElementChild.firstElementChild.setAttribute('tooltip',message);
  }

  hideToolTip(index){
    document.getElementById(index).parentNode.firstElementChild.firstElementChild.removeAttribute('tooltip');
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
      this.stack.pop();
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
