/* eslint-disable import/prefer-default-export */
class ModalManager {
  constructor() {
    this.queue = [];
    this.drawModalContainer();
  }

  show() {
    this.queue[this.queue.length - 1].draw();
  }

  add(item) {
    this.queue.push(item);
  }

  remove() {
    this.queue.pop();
    this.show();
  }

  drawModalContainer() {
    // TODO
  }

  closeModal() {
    // TODO
  }
}
export { ModalManager };
