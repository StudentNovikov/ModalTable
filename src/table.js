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

class Table {
  constructor(tableTitle, products, placeForButton) {
    this.tableTitle = tableTitle;
    this.language = 'US';
    this.currencySign = currencySigns[this.language];
    this.placeForButton = document.getElementById(placeForButton);
    this.init(products);
  }

  init(products) {
    this.tableId = Table.id + 1;
    Table.id += 1;
    this.dataManager = new DataManager(products);
    this.addButtonShowTable();
    this.subscribeTableOpener();
  }

  createRootContainer = () => {
    this.rootRef = document.querySelector('.modal-content');
    this.rootRef.innerHTML = `<div></div>`;
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
    ${this.dataManager
    .getFilters()
    .reduce((filterHtml, filter) => {
      return filterHtml + `<div class="added-filter">
      <span class="filter">${filter}</span>
      <span class="close">&times;</span>
    </div>`
    },'')}
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

  drawBody = () => {
    this.tableRef.querySelector('tbody').innerHTML = this.dataManager.getData()
      .reduce((tableHtml, product, index) => `${tableHtml}
      <tr id="${index}">
      <th>${product.name}</th>
      <td>${product.serialNumber}</td>
      <td>${product.count ? product.count : 0}</td>
      <td>${this.currencySign} ${product.price ? Number.parseFloat(product.price).toFixed(2) : '-,--'}</td>
      <td>${product.isAvaliable ? '+' : '-'}</td>
      <td>${product.dateAdded.replace('T',' ')}</td>
      <td><button class="btn btn-small btn-green update-button">Edit</button> <button class="btn btn-small btn-red delete-button">Delete</button></td>
    </tr>`, '');
  }

  confirmDelete = () => {
    modalManager.add({ type: 'Confirmation', onSuccess: this.delete ,render: () => {}})
    modalManager.show();
  }

  delete = () => {
    this.dataManager.delete(this.currentIndex);
    this.drawTable();
  }

  drawButtons() {
    this.tableContainerRef.innerHTML += ` <button class="btn btn-green" id="addRow">Add Row</button>
   <button class="btn btn-gray move-right" id="closeTable">Close</button>`;
  }

  subscribeTableEvents = () => {
    this.subscribeTitleSortInvoke();
    this.subscribeFilterInput();
    this.subscribeFilterRemove();
    this.subscribeDeleteButton();
    this.subscribeAddButton();
    this.subscribeEditButton();
    this.subscribeCloseButton();
    this.subscribeRegionsSwitch();
  }



  subscribeTableOpener() {
    this.placeForButton.querySelector('#showTable').addEventListener('click', () => {
      modalManager.add({ type: 'Table', render: this.drawTable });
      modalManager.show();
    });
  }

  subscribeTitleSortInvoke = () => {
    this.rootRef.querySelector('thead').addEventListener('click', (e) => {
      if (e.target.id !== 'actions') {
        if (e.target.classList.contains('sort-triangle')) {
          this.dataManager.setSortField(e.target.parentElement.id);
        } else {
          this.dataManager.setSortField(e.target.id);
        }
        this.drawTable();
      }
    });
  }

  subscribeFilterInput = () => {
    this.rootRef.querySelector('.filter-container input').addEventListener('keydown', (e) => {
      //checking if pressed button is 'enter'
      if (e.which == 13 && e.target.value.trim()) {
        this.dataManager.addFilter(e.target.value);
        this.drawTable();
        e.preventDefault();
      }
    })
  }

  subscribeFilterRemove = () => {
    this.rootRef.querySelector('.filter-container').addEventListener('click', (e) => {
      if (e.target.classList.contains('close')){
        this.dataManager.removeFilter(e.target.parentNode.firstElementChild.innerHTML);
        this.drawTable();
      }
    });
  }

  subscribeDeleteButton(){
    this.rootRef.querySelector('tbody').addEventListener('click',(e) => {
      if(e.target.classList.contains('delete-button')){
        this.currentIndex = e.target.parentNode.parentNode.id;
        this.confirmDelete();
      }
    })
  }

  subscribeEditButton = () =>{
    this.rootRef.querySelector('tbody').addEventListener('click',(e) => {
      if(e.target.classList.contains('update-button')){
        this.currentIndex = e.target.parentNode.parentNode.id;
        this.currentProduct = this.dataManager.getData()[this.currentIndex];
        modalManager.add({ type: 'AddUpdate', render: this.fillInUpdateForm, onSuccess: this.update });
        modalManager.show();
        this.fillInUpdateForm();
      }
    })
  }

  subscribeCloseButton = () =>{
    document.getElementById('closeTable').addEventListener('click',() => {
      modalManager.add({ type: 'Confirmation', onSuccess: modalManager.closeModal ,render: () => {}})
      modalManager.show();
    });
  }

  fillInUpdateForm = () => {
   document.getElementById('name').value = this.currentProduct.name;
   document.getElementById('serialNumber').value = this.currentProduct.serialNumber;
   document.getElementById('count').value = this.currentProduct.count || 0;
   document.getElementById('price').value = this.currentProduct.price || '-.--' ;
   document.getElementById('isAvaliable').checked = this.currentProduct.isAvaliable || false;
   document.getElementById('date').value = this.currentProduct.dateAdded;
  }

  update = () => {
    this.dataManager.delete(this.currentIndex);
    this.add();
  }

  subscribeAddButton(){
    this.rootRef.querySelector('#addRow').addEventListener('click',(e) => {
      modalManager.add({ type: 'AddUpdate', render: () => {}, onSuccess: this.add });
      modalManager.show();
    })
  }

  add = () => {
    this.dataManager.add(this.getProductFromAddUpdateForm());
  }

  getProductFromAddUpdateForm = () => {
    const name = document.getElementById('name').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const count = document.getElementById('count').value;
    const price = document.getElementById('price').value;
    const isAvaliable = document.getElementById('isAvaliable').checked;
    const dateAdded = document.getElementById('date').value;
    return {name, serialNumber, count, price, isAvaliable, dateAdded}
  }


  subscribeRegionsSwitch = () => {
    document.querySelector('.language').addEventListener('click',(e) => {
      if(this.language === 'US'){
        this.language = 'RUS'
      } else {
        this.language = 'US';
      }
      e.target.innerHTML = this.language;
      console.log(this.language);
    });
  }

}

Table.id = 0;

export { Table };
