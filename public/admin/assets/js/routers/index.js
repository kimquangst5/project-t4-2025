const main = () => {
     const form = document.querySelector('form');
     const btn_submit = document.querySelector('[btn-submit]');

     btn_submit.addEventListener('click', () => {
          const box_admin = document.querySelector('[box-admin]')
          const management_variable = box_admin.querySelector("[name = 'management_variable']");
          console.log(management_variable.getAttribute('name'));
          axios.patch(btn_submit.getAttribute('btn-submit'), {
               list_router: [
                    {
                         type: 'admin',
                         [management_variable.getAttribute('name')]: management_variable.value
                    },
                    {
                         type: 'client',
                         [management_variable.getAttribute('name')]: management_variable.value
                    },
               ]
          })
               .then(res => {
                    // console.log(res);
                    // location.reload()
                    location.href = res.data.redirect
                    // window.open(res.data.redirect, '_blank');


               })


     })
}

main()