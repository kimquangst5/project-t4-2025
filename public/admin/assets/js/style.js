const sider = () => {
     const sider = document.querySelector('aside')
     if (!sider) return;
     const listul = sider.querySelectorAll('ul')
     if (listul.length == 0) return

     listul.forEach((ul) => {


     })
}

sider()

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