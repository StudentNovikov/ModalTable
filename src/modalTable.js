/* eslint-disable import/prefer-default-export */
import { ModalManager } from './modalManager.js';
import { DataManager } from './dataManager.js';

const modalManager = new ModalManager();
const sortDirection = {
  ascending: '△',
  descending: '▽',
};

class ModalTable {
  constructor(tableTitle, products, placeForButton) {
    this.tableTitle = tableTitle;
    this.products = products;
    this.placeForButton = placeForButton;
    this.sort = {
      field: 'name',
      direction: 'descending',
    };
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
    this.createTable();
    this.drawHead();
    this.drawBody();
    this.drawButtons();
  }

  createTableContainer() {
    this.rootRef.innerHTML += '<div class="table-container"></div>';
    this.tableContainerRef = this.rootRef.querySelector('.table-container');
  }

  drawTitle() {
    this.tableContainerRef.innerHTML = `<h3 class="table-title">${this.tableTitle}</h3>`;
  }

  drawFilter() {
    this.tableContainerRef.innerHTML += `<div class="filter-container">
    <input type="text" placeholder="Type your filter here...">
  </div>`;
  }

  createTable() {
    this.tableContainerRef.innerHTML += '<table class="table"><thead><tr></tr></thead><tbody></tbody></table>';
    this.tableRef = this.tableContainerRef.querySelector('table');
  }

  drawHead() {
    this.tableRef.querySelector('tr').innerHTML = `
    <th id="name">Name</th>
    <th id="serialNumber">Serial Number</th>
    <th id="count">Count</th>
    <th id="price">Price</th>
    <th id="isAvaliable">IsAvaliable</th>
    <th id="dateAdded">Date added</th>
    <th id="actions">Actions</th>`;
    console.log(this.tableRef.querySelector(`#${this.sort.field}`));
    this.tableRef.querySelector(`#${this.sort.field}`).innerHTML += ` ${sortDirection[this.sort.direction]}`;
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
