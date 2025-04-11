console.log('ok');
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
     .addField(document.querySelector("sl-select[name='categories']"), [{
               rule: 'required',
               errorMessage: 'Vui lòng chọn danh mục',
          }
     ])

const main = () => {
     const btn = document.querySelector("[type='submit']")
     if (!btn) return
     btn.addEventListener('click', () => {
          const errors = validator.isValid;
          console.log(errors);

     })
}

main()