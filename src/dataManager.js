/* eslint-disable import/prefer-default-export */
class DataManager {
  constructor(data) {
    this.data = data;
    this.filterArray = [];
    this.sortBy = 'name';
  }

  getData() {
    return this.data;
  }

  addFilter(filter) {
    this.filterArray.push(filter);
  }

  removeFilter(filter) {
    this.filterArray.splice(this.filterArray.indexOf(filter), 1);
  }

  setSortField(sortField) {
    this.sortBy = sortField;
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
    let resultArray = this.data;
    this.filterArray.forEach((filter) => {
      resultArray = resultArray.filter((record) => {
        let recordSuitsFilter = false;
        record.forEach((field) => {
          if (field.includes(filter)) {
            recordSuitsFilter = true;
          }
        });
        return recordSuitsFilter;
      });
    });
    return resultArray;
  }


  sort(array) {
    return array.sort((a, b) => a[this.sortBy] - b[this.sortBy]);
  }
}

export { DataManager };
