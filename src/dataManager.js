/* eslint-disable import/prefer-default-export */
class DataManager {
  constructor(data) {
    this.data = data;
    this.filterArray = [];
    this.sortBy = {
      field: 'name',
      direction: 'descending',
    };
  }

  getData() {
    return this.sort(this.filter());
  }

  addFilter(filter) {
    this.filterArray.push(filter);
  }

  removeFilter(filter) {
    this.filterArray.splice(this.filterArray.indexOf(filter), 1);
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
    this.filterAndSort();
  }

  edit(index, newValue) {
    this.data.delete(index);
    this.add(newValue);
    this.filterAndSort();
  }

  delete(index) {
    this.data.splice(index, 1);
  }

  filterAndSort() {
    this.filter();
    this.sort();
  }

  filter() {
    // let resultArray = data;
    // this.filterArray.forEach((filter) => {
    //   resultArray = resultArray.filter((record) => {
    //     let recordSuitsFilter = false;
    //     record.forEach((field) => {
    //       if (field.includes(filter)) {
    //         recordSuitsFilter = true;
    //       }
    //     });
    //     return recordSuitsFilter;
    //   });
    // });
    // return resultArray;
    return this.data;
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
