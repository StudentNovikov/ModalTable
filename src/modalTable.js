/* eslint-disable import/prefer-default-export */
import { ModalManager } from './modalManager.js';
import { DataManager } from './dataManager.js';

const modalManager = new ModalManager();
const sortDirection = {
  ascending: '△',
  descending: '▽',
};

const currencySigns = {
  US: '$',
  RUS: '₽',
};

class ModalTable {
  constructor(tableTitle, products, placeForButton) {
    this.tableTitle = tableTitle;
    this.language = 'US';
    this.currencySign = currencySigns[this.language];
    this.placeForButton = document.getElementById(placeForButton);
    this.init(products);
  }

  init(products) {
    this.tableId = ModalTable.id + 1;
    ModalTable.id += 1;
    this.dataManager = new DataManager(products);
    this.addButtonShowTable();
    // this.drawTable();
    // this.drawUpdateAddForm();
    // this.drawConfirm();
    this.subscribeTableOpener();
  }

  createRootContainer = () => {
    this.rootRef = document.querySelector('.modal-content');
    this.rootRef.innerHTML = `<div id="tableContainer${this.tableId}"></div>`;
  }

  addButtonShowTable() {
    this.placeForButton.innerHTML = `<button class="btn btn-green" id="showTable">${this.tableTitle}</button>`;
  }

  drawTable = () => {
    this.createRootContainer();
    this.createTableContainer();
    this.drawTitle();
    this.drawFilter();
    this.createTable();
    this.drawHead();
    this.drawBody();
    this.drawButtons();
    this.subscribeTableEvents();
  }

  createTableContainer() {
    this.rootRef.innerHTML += '<div class="table-container"></div>';
    this.tableContainerRef = this.rootRef.querySelector('.table-container');
  }

  drawTitle() {
    this.tableContainerRef.innerHTML = ` <div>
    <h3 class="table-title">${this.tableTitle}</h3>
    <span class="move-right language">${this.language}</span>
    </div>`;
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
    this.tableRef
      .querySelector(`#${this.dataManager.getSortField()}`)
      .innerHTML += `<span class="sort-triangle"> ${sortDirection[this.dataManager.getSortDirection()]}</span>`;
  }

  drawBody() {
    this.tableRef.querySelector('tbody').innerHTML = this.dataManager.getData()
      .reduce((tableHtml, product) => `${tableHtml}
      <tr>
      <th>${product.name}</th>
      <td>${product.serialNumber}</td>
      <td>${product.count}</td>
      <td>${this.currencySign} ${product.price.toFixed(2)}</td>
      <td>${product.isAvaliable ? '+' : '-'}</td>
      <td>${product.dateAdded}</td>
      <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
    </tr>`, '');
  }

  drawButtons() {
    this.tableContainerRef.innerHTML += ` <button class="btn btn-green" id="addRow">Add Row</button>
   <button class="btn btn-red btn-right move-right" id="closeTable">Close</button>`;
  }


  drawUpdateAddForm() {
    this.rootRef.innerHTML += `<div class="add-update">
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
    <input type="checkbox" name="inputIsAvaliable" value="isAvaliable">
    <p><label for="date">Date:</label></p>
    <input type="datetime-local" name="inputDate" id="date">
    <br>
    <input class="btn btn-green mt-1" type="submit" value="Add / Update" id="addUpdate">
   </form></div>`;
    this.updateAddFormRef = this.rootRef.querySelector('.add-update');
  }

  drawConfirm() {
    // console.log('drawing confirm draw');
  }

  subscribeTableEvents = () => {
    this.subscribeTitleSortInvoke();
    console.log('we subscribed i swear!');
  }

  subscribeTableOpener() {
    this.placeForButton.querySelector('#showTable').addEventListener('click', () => {
      modalManager.show({ type: 'Table', render: this.drawTable });
    });
  }

  subscribeTitleSortInvoke = () => {
    this.rootRef.querySelector('thead').addEventListener('click', (e) => {
      if (e.target.id !== 'actions') {
        if (e.target.classList.contains('sort-triangle')) {
          this.dataManager.sort(e.target.parentElement.id);
        } else {
          this.dataManager.sort(e.target.id);
        }
      }
    });
  }

  subscribeDelete() {
    // console.log('deleting...');
  }

  changeLocalisation(language) {
    this.changeCurrencySign(language);
    this.changeDateFormat(language);
  }

  changeCurrencySign(language) {
    this.currencySign = currencySigns(language);
  }

  changeDateFormat(language) {
    console.log('dates reformated');
  }
}

ModalTable.id = 0;

export { ModalTable };
