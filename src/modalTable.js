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
    this.createTableContainer();
    this.hideTableContainer();
    this.drawTitle();
    this.drawFilter();
    this.drawHead();
    this.drawBody();
    this.drawButtons();
  }

  createTableContainer() {
    console.log('creatingTableContainer');
  }

  hideTableContainer() {
    console.log('hidingTableContainer');
  }

  showTableContainer() {
    console.log('showingTableContainer');
  }

  drawTitle() {
    console.log('drawingTitle');
  }

  drawFilter() {
    console.log('drawFilter');
  }

  drawHead() {
    console.log('drawHead');
  }

  drawBody() {
    console.log('drawBody');
  }

  drawButtons() {
    console.log('drawButtons');
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