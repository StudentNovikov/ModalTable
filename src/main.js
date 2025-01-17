import { Table } from './table.js';

const firstTable = new Table('Table from class #1', [{
  name: 'Shoes',
  serialNumber: 7064903200,
  count: 4,
  price: 5.00,
  isAvaliable: false,
  dateAdded: '2020-03-04T03:24',
}, {
  name: 'Apples',
  serialNumber: 7062683200,
  count: 70,
  price: 7.1,
  isAvaliable: true,
  dateAdded: '2020-01-12T13:40',
}, {
  name: 'Coca-Cola',
  serialNumber: 2364903299,
  count: 10,
  price: 12.245,
  isAvaliable: true,
  dateAdded: '2019-05-27T10:54',
}, {
  name: 'Fanta',
  serialNumber: 6346683200,
  count: 120,
  price: 3.31,
  isAvaliable: false,
  dateAdded: '2019-05-02T21:22',
}, {
  name: 'Beer',
  serialNumber: 5364903300,
  count: 1200,
  price: 114.00,
  isAvaliable: true,
  dateAdded: '2020-01-01T09:20',
}], 'placeForTable1');

// const secondTable = new Table('Table from class #2', [{
//   name: 'Shoes',
//   serialNumber: 7064903200,
//   count: 4,
//   price: 5.00,
//   isAvaliable: false,
//   dateAdded: '2020-03-04T03:24',
// }, {
//   name: 'Apples',
//   serialNumber: 7062683200,
//   count: 70,
//   price: 7.1,
//   isAvaliable: true,
//   dateAdded: '2020-01-12T03:40',
// }, {
//   name: 'Coca-Cola',
//   serialNumber: 2364903299,
//   count: 10,
//   price: 12.245,
//   isAvaliable: true,
//   dateAdded: '2019-05-27T10:54',
// }, {
//   name: 'Fanta',
//   serialNumber: 6346683200,
//   count: 120,
//   price: 3.31,
//   isAvaliable: false,
//   dateAdded: '2019-05-02T11:22',
// }, {
//   name: 'Beer',
//   serialNumber: 5364903300,
//   count: 1200,
//   price: 114.00,
//   isAvaliable: true,
//   dateAdded: '2020-01-01T09:20',
// }], 'placeForTable2');
