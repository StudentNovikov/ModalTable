import { ModalTable } from './modalTable.js';

const firstTable = new ModalTable('Table from class #1', [{
  name: 'Shoes',
  serialNumber: 7064903200,
  count: 4,
  price: 5.00,
  isAvaliable: true,
  dateAdded: '11.10.2020 12:24',
}, {
  name: 'Apples',
  serialNumber: 7062683200,
  count: 70,
  price: 7.1,
  isAvaliable: true,
  dateAdded: '12.01.2019 02:04',
}, {
  name: 'Coca-Cola',
  serialNumber: 2364903299,
  count: 10,
  price: 12.245,
  isAvaliable: true,
  dateAdded: '11.10.2020 10:57',
}], 'placeForTable1');
