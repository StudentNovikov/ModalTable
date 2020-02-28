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
    const containerIndex = `tableContainer${this.tableId}`;
    document.getElementById(this.placeForButton).innerHTML = `<div id="${containerIndex}"></div>`;
    this.rootRef = document.getElementById(containerIndex);
  }

  addButtonShowTable() {
    const buttonIndex = 'showTable';
    this.rootRef.innerHTML = `<button class="btn btn-green" id="${buttonIndex}">${this.tableTitle}</button>`;
    this.buttonShowTableRef = this.rootRef.getElementById(buttonIndex);
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
