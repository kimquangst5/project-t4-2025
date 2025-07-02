console.log(location.host);


const main = () => {
     const form = document.querySelector('form');
     const btn_submit = document.querySelector('[btn-submit]');
     const box_admin = document.querySelector('[box-admin]')
     const management_variable = box_admin.querySelector("[name = 'management_variable']");
     const routers_path = box_admin.querySelector("[name = 'routers']");
     const routers_index = box_admin.querySelector("[name = 'routers_index']");
     const routers_title = box_admin.querySelector("[name = 'routers_title']");
     const routers_description = box_admin.querySelector("[name = 'routers_description']");
     const routers_keyword = box_admin.querySelector("[name = 'routers_keyword']");
     const products_path = box_admin.querySelector("[name = 'products_path']");
     const products_create = box_admin.querySelector("[name = 'products_create']");
     const products_create_title = box_admin.querySelector("[name = 'products_create_title']");
     const products_create_description = box_admin.querySelector("[name = 'products_create_description']");
     const products_create_keyword = box_admin.querySelector("[name = 'products_create_keyword']");
     const products_create_post = box_admin.querySelector("[name = 'products_create_post']");
     const login_name = box_admin.querySelector("[name = 'login_name']");
     const login_title = box_admin.querySelector("[name = 'login_title']");
     const login_description = box_admin.querySelector("[name = 'login_description']");
     const login_keyword = box_admin.querySelector("[name = 'login_keyword']");
     const accounts_path = box_admin.querySelector("[name = 'accounts_path']");
     const accounts_create_name = box_admin.querySelector("[name = 'accounts_create_name']");
     const accounts_create_title = box_admin.querySelector("[name = 'accounts_create_title']");
     const accounts_create_description = box_admin.querySelector("[name = 'accounts_create_description']");
     const accounts_create_keyword = box_admin.querySelector("[name = 'accounts_create_keyword']");
     let options_keyword = (item) => {
          return JSON.parse(item.getAttribute('value')).map(it => {
               return {
                    value: it,
                    text: it
               }
          })
     }
     initTomSelectSingle(products_create_keyword, 10, options_keyword(products_create_keyword), JSON.parse(products_create_keyword.getAttribute('value')))
     initTomSelectSingle(routers_keyword, 10, options_keyword(routers_keyword), JSON.parse(routers_keyword.getAttribute('value')))
     initTomSelectSingle(login_keyword, 10, options_keyword(login_keyword), JSON.parse(login_keyword.getAttribute('value')))
     initTomSelectSingle(accounts_create_keyword, 10, options_keyword(accounts_create_keyword), JSON.parse(accounts_create_keyword.getAttribute('value')))

     btn_submit.addEventListener('click', () => {
          axios.patch(btn_submit.getAttribute('btn-submit'), {
                    list_router: [{
                              type: 'admin',
                              [management_variable.getAttribute('name')]: management_variable.value,
                              routers: {
                                   path: routers_path.value,
                                   index: {
                                        name: routers_index.value,
                                        title: routers_title.value,
                                        description: routers_description.value,
                                        keyword: routers_keyword.tomselect.items
                                   },
                                   update: {
                                        name: 'update'
                                   }
                              },
                              products: {
                                   path: products_path.value,
                                   create: {
                                        name: products_create.value,
                                        title: products_create_title.value,
                                        description: products_create_description.value,
                                        keyword: products_create_keyword.tomselect.items,
                                        post: products_create_post.value
                                   },

                              },
                              login: {
                                   name: login_name.value,
                                   title: login_title.value,
                                   description: login_description.value,
                                   keyword: login_keyword.tomselect.items,
                                   patch: 'login',
                              },
                              accounts: {
                                   path: accounts_path.value,
                                   create: {
                                        name: accounts_create_name.value,
                                        title: accounts_create_title.value,
                                        description: accounts_create_description.value,
                                        keyword: accounts_create_keyword.tomselect.items,
                                        post: 'createpost'
                                   }
                              }
                         },
                         {
                              type: 'client',
                              [management_variable.getAttribute('name')]: management_variable.value
                         },
                    ]
               })
               .then(res => {
                    console.log(res.data.redirect);
                    // location.reload()
                    location.href = res.data.redirect
                    // window.open(res.data.redirect, '_blank');


               })


     })

     form.addEventListener('submit', (e) => {
          e.preventDefault();
          // btn_submit.click()
     })
}

main()