
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image-1', {
     multiple: true,
     maxFileCount: 6,
});
const validator = new JustValidate('form', {
     validateBeforeSubmitting: true,

});
validator
     .addField(document.querySelector("[name = 'name']"), [{
               rule: 'required',
               errorMessage: 'Vui lòng nhập tên sản phẩm',
          },
          {
               rule: 'minLength',
               value: 20,
               errorMessage: `Ít nhất 20 ký tự`,
          },
          {
               rule: 'maxLength',
               value: 255,
               errorMessage: 'Tối đa 255 kí tự',
          },
     ])
     .addField(document.querySelector("[name = 'slug']"), [{
               rule: 'required',
               errorMessage: 'Vui lòng nhập đường dẫn',
          },
          {
               rule: 'minLength',
               value: 3,
               errorMessage: 'Ít nhất 3 ký tự',
          },
          {
               rule: 'maxLength',
               value: 255,
               errorMessage: 'Tối đa 255 kí tự',
          },
     ])


document.querySelectorAll("select[name='select-attribute']").forEach((element) => {
     validator.addField(element, [{
          rule: 'required',
          errorMessage: 'Vui lòng chọn giá trị',
     }, ]);
});

const validateSelectAttribute = (element) => {
     validator.addField(element, [{
          rule: 'required',
          errorMessage: 'Vui lòng chọn giá trị',
     }, ]);
}

// dragula([document.querySelector('[keo-tha]')], {
//      moves: function (el, container, handle) {
//           return handle.classList.contains('cursor-move');
//      }
// });

const initSortable = () => {
     const keoTha = document.querySelectorAll('[keo-tha]');
     if (!keoTha || keoTha.length === 0) return
     new Sortable(document.querySelector('[keo-tha]'), {
          animation: 250,
          ghostClass: 'blue-background-class',
          handle: '.cursor-move',
          swap: true, // Enable swap plugin
          swapClass: 'highlight', // The class applied to the hovered swap item

     });
}
initSortable()

const formatPrice = () => {
     const moneyInput = document.querySelectorAll('[money-input]')
     if (moneyInput && moneyInput.length > 0) {
          moneyInput.forEach(input => {
               new AutoNumeric(input, {
                    digitGroupSeparator: ',', // Dấu phẩy phân cách hàng nghìn
                    decimalCharacter: '.', // Dấu chấm phần thập phân
                    decimalPlaces: 0, // Số chữ số thập phân, ở đây là 0 vì tiền Việt Nam không có phần thập phân
               });
          })

     }

}
formatPrice()


const main = () => {
     // const btn = document.querySelector("[type='submit']")
     // if (!btn) return
     // btn.addEventListener('click', () => {
     //      const errors = validator.isValid;
     //      console.log(errors);

     // })
}

main()


const initTomSelectMultiple = () => {
     document.querySelectorAll('[select-multiple]').forEach((el) => {
          let settings = {
               plugins: {
                    remove_button: {
                         title: 'Xóa lựa chọn này',
                    }
               },
               persist: false,
               create: true,
               // onDelete: function (values) {
               //      return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
               // }
          };
          new TomSelect(el, settings);

     });
}
initTomSelectMultiple()

const initTomSelectSingle = () => {
     document.querySelectorAll('[select-single]').forEach((el) => {
          let settings = {
               // plugins: {
               //      remove_button: {
               //           title: 'Xóa lựa chọn này',
               //      }
               // },
               persist: false,
               maxItems: 1,
               create: true,
               sortField: {
                    field: "text",
                    direction: "asc"
               }


               // onDelete: function (values) {
               //      return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
               // }
          };
          new TomSelect(el, settings);

     });
}
initTomSelectSingle()


const openImage = () => {
     const listUploadImage = document.querySelectorAll('[upload-image]')
     if (!listUploadImage || listUploadImage.length === 0) return;
     listUploadImage.forEach(it => {
          const btn = it.querySelector('sl-button')
          if (!btn) return
          btn.addEventListener('click', () => {
               const input = it.querySelector('input')
               if (!input) return
               input.click()
               
          })

          const trash = it.querySelector("[name='trash']")
          if (!trash) return
          trash.addEventListener('click', () => {
               console.log(trash);
               const clearButton = it.querySelector(".clear-button")
               if (!clearButton) return
               clearButton.click()
               
          })
          
     })
}

openImage()