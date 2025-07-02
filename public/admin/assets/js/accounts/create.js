const main = () => {
     const username = document.querySelector("[name = 'username']")
     const password = document.querySelector("[name = 'password']")
     const confirm_password = document.querySelector("[name = 'confirm_password']");
     const btn_submit = document.querySelector('[btn-submit]');
     btn_submit.addEventListener('click', () => {
          const form_data = new FormData();
          form_data.append('username', username.value)
          form_data.append('password', password.value)
          form_data.append('confirm_password', confirm_password.value)
          axios.post(btn_submit.getAttribute('btn-submit'), form_data)
               .then(res => {
                    console.log(res);
                    
               })
     })
}

main()