/* eslint-disable import/prefer-default-export */
class DataManager {
  constructor(data) {
    this.data = data;
    this.addIndexesToData();
    this.filterArray = [];
    this.sortBy = {
      field: 'dateAdded',
      direction: 'descending',
    };
  }

  addIndexesToData = () => {
    this.data = this.data.map((product,index) => {
      product.index = index;
      return product;
    });
  }

  getData() {
    return this.sort(this.filter());
  }

  getItemByIndex(index) {
    return this.data.filter(product => product.index == index)[0];
  }

  addFilter(filter) {
    if (!this.filterArray.includes(filter)) {
      this.filterArray.push(filter.toString().toLowerCase());
    }
  }

  removeFilter(filter) {
    this.filterArray.splice(this.filterArray.indexOf(filter), 1);
  }

  getFilters() {
    return this.filterArray;
  }

  setSortField(sortField) {
    this.sortBy.field = sortField;
    this.sortBy.direction = this.changeSortDirection();
  }

  getSortField() {
    return this.sortBy.field;
  }

  getSortDirection() {
    return this.sortBy.direction;
  }

  changeSortDirection() {
    return this.sortBy.direction === 'descending'
      ? 'ascending'
      : 'descending';
  }

  add(row) {
    this.data.push(row);
    this.data[this.data.length - 1].index = this.findMaxIndex() + 1;
  }

  findMaxIndex(){
    return this.data.reduce((maxIndex,item) => {
      if(item.index > maxIndex){
        return item.index;
      } else {
        return maxIndex;
      }
    },0)
  }

  delete(index) {
    this.data = this.data.filter(product => product.index != index);
  }

  filter() {
    let resultArray = this.data;
    this.filterArray.forEach((filter) => {
      resultArray = resultArray.filter((record) => {
        let recordSuitsFilter = false;
        Object.keys(record).forEach((field) => {
          if (record[field].toString().toLowerCase().includes(filter)) {
            recordSuitsFilter = true;
          }
        });
        return recordSuitsFilter;
      });
    });
    return resultArray;
  }

  sort(data) {
    if (this.sortBy.field === 'name') {
      return this.sortBy.direction === 'ascending'
        ? data.sort((a, b) => (`${b.name}`).localeCompare(a.name))
        : data.sort((a, b) => (`${a.name}`).localeCompare(b.name));
    }
    if (this.sortBy.field === 'dateAdded') {
      return this.sortBy.direction === 'ascending'
        ? data.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded))
        : data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
    return this.sortBy.direction === 'ascending'
      ? data.sort((a, b) => a[this.sortBy.field] - b[this.sortBy.field])
      : data.sort((a, b) => b[this.sortBy.field] - a[this.sortBy.field]);
  }
}

export { DataManager };
