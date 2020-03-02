/* eslint-disable import/prefer-default-export */
import { ModalManager } from './modalManager.js';
import { DataManager } from './dataManager.js';

const modalManager = new ModalManager();

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
    this.dataManager = new DataManager(this.products);
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
    this.drawTitle();
    this.drawFilter();
    this.drawHead();
    this.drawBody();
    this.drawButtons();
  }

  createTableContainer() {
    this.rootRef.innerHTML += '<div class="table-container"></div>';
    this.tableRef = this.rootRef.querySelector('.table-container');
  }

  drawTitle() {
    this.tableRef.innerHTML = `<h3 class="table-title">${this.tableTitle}</h3>`;
  }

  drawFilter() {
    this.tableRef.innerHTML += `<div class="filter-container">
    <input type="text" placeholder="Type your filter here...">
  </div>`;
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
