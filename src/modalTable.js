/* eslint-disable import/prefer-default-export */
class ModalTable {
  constructor(tableTitle, products, placeForButton) {
    this.tableTitle = tableTitle;
    this.products = products;
    this.rootDirectory = document.getElementById(placeForButton);
    this.init();
  }

  init() {
    this.tableId = ModalTable.id + 1;
    ModalTable.id += 1;
    this.addButtonTableShow();
    this.drawTable();
    this.drawUpdateAddForm();
    this.subscribeToEvents();
  }

  addButtonTableShow() {
    console.log('added buttons');
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
