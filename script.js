const tbody = document.querySelector('table tbody');

/**
 * Move a block of rows from startIdx (inclusive) to endIdx (exclusive)
 * to before the row at beforeIdx.
 * All indices are zero-based based on the current row order.
 */
let sortable_table;
let sortable_preview_image;

const init_sortable_table = () => {
     const tbody = document.querySelector('tbody')
     if (sortable_table) sortable_table.destroy();

     sortable_table = Sortable.create(tbody, {
          animation: 400,
          sort: true,
          multiDrag: true,
          // dataIdAttr: 'data-id',
          // disabled: true
     });
}

const swap_two_table = (i, j) => {
     const order = sortable_table.toArray().map((_, idx) => idx);
     sortable_table.captureAnimationState();
     console.log(order);
     
     [order[i], order[j]] = [order[j], order[i]]; // hoán đổi trong mảng
     console.log([order[j], order[i]]);
     
     sortable_table.sort(order); // SortableJS tự animate & cập nhật DOM
     sortable_table.animateAll(); // chạy animation từ cũ → mới

};
const btn = document.querySelector('[click-me]');
btn.addEventListener('click', () => {
     init_sortable_table();
     swap_two_table(1, 6)
     swap_two_table(2, 7)
})