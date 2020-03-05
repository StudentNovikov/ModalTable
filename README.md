# ModalTable

Description:

  - Tables have the ability to sort / filter (several filters) / add new rows / edit existing rows / delete existing                 rows.
  - Operations like add / edit / delete are performed in extra modal / confirmation modal window.
  - At the same time, only one modal is displayed to the user.
  - Modal with main data is displayed after the user clicks on the button.
  - Table should is with json data format.
  - Several tables on the same page are working
  - Sort direction should has an indicator on the currently sorted column.

---------------------
How to create a table:
  import { Table } from './table.js';
And create a table instance:
  new Table(Title,ValuesArray,idOfAContainer);
-----------------------


For example:  
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
  dateAdded: '2020-01-12T03:40',
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
  dateAdded: '2019-05-02T11:22',
}, {
  name: 'Beer',
  serialNumber: 5364903300,
  count: 1200,
  price: 114.00,
  isAvaliable: true,
  dateAdded: '2020-01-01T09:20',
}], 'placeForTable1');

Also this table has this features: 

  - Creates modals with edit / add / remove functionality for this table.
  - By default table should is sorted by date.
  - Price is represented as a regular number during edit state.
  - If a user tries to close add / edit modal window with any added / changed data - table prompts confirmation window.
  - There is an ability for table to switch between regions ( US and RUS ) and reflect these changes for page content.

  Validation requirements for create / edit
  __________________________

    - Name - required, min 3 chars, max 20 chars
    - SerialNumber - required, 10digits
    - Count: numbers, default: 0
    - Price: numbers, default: -.--
    - isAvailable: flag, default: false
    - Date: not earlier than current moment of time, not further than 1 year from current moment of time.
    - Validation should notify users with tooltip + error description.


