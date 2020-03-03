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
    this.drawConfirm();
    this.subscribeToEvents();
  }

  createRootContainer() {
    document.getElementById(this.placeForButton).innerHTML = `<div id="tableContainer${this.tableId}"></div>`;
    this.rootRef = document.getElementById('placeForTable1');
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
    this.tableRef.querySelector(`#${this.sort.field}`).innerHTML += `<span class="sort-triangle"> ${sortDirection[this.sort.direction]}</span>`;
  }

  drawBody() {
    this.tableRef.querySelector('tbody').innerHTML = `<tr>
   <th>Shoes</th>
   <td>7064903200</td>
   <td>4</td>
   <td>$ 5.00</td>
   <td>+</td>
   <td>11.10.2020 12:24</td>
   <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
 </tr>
 <tr>
   <th>Apples</th>
   <td>7062343200</td>
   <td>8</td>
   <td>$ 15.00</td>
   <td>+</td>
   <td>09.12.2020 11:30</td>
   <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
 </tr>
 <tr>
   <th>Bananas</th>
   <td>9064933200</td>
   <td>0</td>
   <td>$ 5.00</td>
   <td>-</td>
   <td>01.07.2019 14:54</td>
   <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
 </tr>
 <tr>
   <th>T-shirts</th>
   <td>7062563202</td>
   <td>4</td>
   <td>$ 5.00</td>
   <td>+</td>
   <td>12.10.2020 12:24</td>
   <td><a href="#">Edit</a> / <a href="#">Delete</a></td>
 </tr>`;
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

  subscribeToEvents() {
    this.subscribeTableOpener();
    this.subscribeDelete();
    console.log('subscribedToEvents');
  }

  subscribeTableOpener() {
    this.rootRef.querySelector('#showTable').addEventListener('click', () => {
      modalManager.show({ type: 'Table', render: this.drawTable });
    });
  }

  subscribeDelete() {
    // console.log('deleting...');
  }
}

ModalTable.id = 0;

export { ModalTable };
