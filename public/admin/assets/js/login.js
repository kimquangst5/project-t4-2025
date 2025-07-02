const main = () => {
     const form = document.querySelector('form');
     form.addEventListener('submit', (e) => {
          e.preventDefault();
          const username = form.querySelector("[ name = 'username' ]");
          const password = form.querySelector("[ name = 'password' ]");
          const remember = form.querySelector("[ name = 'remember' ]");
          const btn_submit = form.querySelector("[ btn-submit ]");
          const url = new URL(location.href);
          please_wait(true)
          
          axios.patch(btn_submit.getAttribute("btn-submit"), {
               username: username.value,
               password: password.value,
               remember: remember.checked,
               continue: url.searchParams.get("continue")
          })
               .then(res => {
                    if(res.data.success){
                         location.href = res.data.continue
                    }
                    else{
                         alert_quick(res.data.message, 'warning');
                         please_wait(false)
                    }
               })
          
          
          
     })
}

main()