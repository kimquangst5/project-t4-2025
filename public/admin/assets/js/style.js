const sider = () => {
     const sider = document.querySelector('aside')
     if (!sider) return;
     const listul = sider.querySelectorAll('ul')
     if (listul.length == 0) return

     listul.forEach((ul) => {


     })
}

sider()

const initTomSelectSingle = (item, number = 1, options = [], items = []) => {
     let settings = {
          options: options,
          items: items,
          plugins: {
               remove_button: {
                    title: "Xóa lựa chọn này",
               },
          },
          persist: true,
          maxItems: number,
          // create: true,
          create: function (input) {
               // Trả về một object option, với flag isNew = true
               return {
                    value: input,
                    text: input,
                    isNew: true
               };
          },
          sortField: {
               field: "text",
               direction: "asc",
          },
          hideSelected: true,
          render: {
               // Thay đổi phần “Add <value>…”
               option_create: function (data, escape) {
                    // data.input là text người dùng gõ
                    return (
                         '<div class="create">Ấn Enter để Thêm mới<strong>' +
                         " " +
                         escape(data.input) +
                         "</strong>&hellip;</div>"
                    );
               },
               // Thay đổi phần “No results found”
               no_results: function (data, escape) {
                    return '<div class="no-results">Không có kết quả nào trong các kết quả có sẵn.</div>';
               },
          },
     };
     new TomSelect(item, settings);
     // document.querySelectorAll("[select-single]").forEach((el) => {
     //      if (el.tomselect) return;

     // });
};

const initTomSelectMultiple = () => {
     document.querySelectorAll("[select-multiple]").forEach((el) => {
          let settings = {
               plugins: {
                    remove_button: {
                         title: "Xóa lựa chọn này",
                    },
               },
               persist: true,
               create: function (input) {
                    // Trả về một object option, với flag isNew = true
                    return {
                         value: input,
                         text: input,
                         isNew: true
                    };
               },
               render: {
                    option_create: function (data, escape) {
                         return (
                              '<div class="create">Ấn Enter để Thêm mới<strong>' +
                              " " +
                              escape(data.input) +
                              "</strong>&hellip;</div>"
                         );
                    },
                    // Thay đổi phần “No results found”
                    no_results: function (data, escape) {
                         return '<div class="no-results">Không có kết quả nào trong các kết quả có sẵn.</div>';
                    },
               },
          };
          const tom = new TomSelect(el, settings);

          tom.on("item_add", (value, itemEl) => {
               initSortable(itemEl.parentElement);
          });
     });
};

const extractItems = (tomselect) => {
     let {
          items,
          options
     } = tomselect;
     return items.map((id) => ({
          id: options[id].value,
          new: options[id].isNew == true,
     }));
};

const please_wait = (status = true) => {
     const please_wait = document.querySelector('[please-wait]');
     status == true ? please_wait.classList.remove('hidden') : please_wait.classList.add('hidden')
}

const alert_quick = (title = 'Chưa có tiêu đề', icon = 'success', position = 'top-right') => {
     const Toast = Swal.mixin({
          iconColor: (icon == 'success' ? '#2bbb93' : (icon == 'warning' ? '#f9b931' : '')),
          toast: true,
          position: position,
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
          }
     });
     Toast.fire({
          icon: icon,
          title: title,
     });
}

const alert = (title = 'Bạn chưa nhập tiêu đề?', icon = 'question', position = 'center', text = null, showCancelButton = true, onConfirm) => {
     const Toast = Swal.mixin({
          iconColor: (icon == 'success' ? '#2bbb93' : (icon == 'warning' ? '#f9b931' : '')),
          confirmButtonColor: 'var(--green)',
          confirmButtonText: 'Đồng ý',
          cancelButtonColor: 'var(--red)',
          cancelButtonText: 'Huỷ',
          position: position,
          showConfirmButton: true,
          showCancelButton: showCancelButton,
          reverseButtons: true,
          didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
          }
     });
     Toast
          .fire({
               icon: icon,
               title: title,
               text: text,
          })
          .then(result => {
               if (result.isConfirmed) {
                    if (typeof onConfirm === 'function') onConfirm();
               }
          })
}
if (sessionStorage.getItem('alert')) {
     const {
          title,
          icon,
          position,
          text
     } = JSON.parse(sessionStorage.getItem('alert'));
     alert(title, icon, position, text);
     sessionStorage.removeItem('alert')
}

if (sessionStorage.getItem('alert_quick')) {
     const {
          title,
          icon,
          position,
     } = JSON.parse(sessionStorage.getItem('alert_quick'));
     alert(title, icon, position);
     sessionStorage.removeItem('alert_quick')
}
const getCookie = (cookieName) => {
     // Tách chuỗi thành một mảng các cặp name/value
     let cookieArray = document.cookie.split("; ");
     // Chuyển name/value từ dạng string thành object
     cookieArray = cookieArray.map(item => {
          item = item.split("=");
          return {
               name: item[0],
               value: item[1]
          };
     });
     // Lấy ra cookie đang cần tìm
     const cookie = cookieArray.find(item => {
          return item.name === cookieName;
     });

     return cookie ? cookie.value : null;
}

const deleteCookie = (cookieName) => {
     document.cookie =
          cookieName + "=; " +
          "expires=Thu, 01 Jan 1970 00:00:00 UTC; " +
          "path=/;";
}
if (getCookie('alert_quick')) {
     console.log(getCookie('alert_quick'));
     console.log(decodeURIComponent(getCookie('alert_quick')));
     let value = decodeURIComponent(getCookie('alert_quick'))
     const {
          title,
          icon,
          position,
     } = JSON.parse(value);
     alert_quick(title, icon, position);
     console.log('ok');
     
     deleteCookie('alert_quick')
     
}




const countCharacter = () => {
     const listInput = document.querySelectorAll('sl-input');
     if (listInput.length == 0) return;
     for (const input of listInput) {
          const countCharacter = input.querySelector('[count-character]')
          if (countCharacter) {
               if (input.getAttribute('value')) countCharacter.innerHTML = input.getAttribute('value').length

               input.addEventListener('input', () => {
                    // console.log(input.value.length);
                    countCharacter.innerHTML = input.value.length

               })
          }
     }
}
countCharacter()