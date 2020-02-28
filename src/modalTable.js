/* eslint-disable import/prefer-default-export */
class ModalTable {
  constructor(tableTitle, products, placeForButton) {
    this.tableTitle = tableTitle;
    this.products = products;
    this.placeForButton = placeForButton;
    this.init();
  }

  init() {
    this.tableId = ModalTable.id + 1;
    ModalTable.id += 1;
    this.createRootContainer();
    this.addButtonShowTable();
    this.drawTable();
    this.drawUpdateAddForm();
    this.subscribeToEvents();
  }

  createRootContainer() {
    document.getElementById(this.placeForButton).innerHTML = `<div id="tableContainer${this.tableId}"></div>`;
    this.rootRef = document.getElementById(this.placeForButton).firstChild;
  }

  addButtonShowTable() {
    this.rootRef.innerHTML = `<button class="btn btn-green" id="showTable">${this.tableTitle}</button>`;
    this.buttonShowTableRef = this.rootRef.querySelector('#showTable');
  }

  drawTable() {
    console.log('drawing table');
  }

  drawUpdateAddForm() {
    console.log('drawingUpdateAddForm');
  }

  subscribeToEvents() {
    console.log('subscribedToEvents');
  }
}

ModalTable.id = 0;

export { ModalTable };
