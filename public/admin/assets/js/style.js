
const sider = () => {
     const sider = document.querySelector('aside')
     if (!sider) return;
     const listul = sider.querySelectorAll('ul')
     if (listul.length == 0) return
     
     listul.forEach((ul) => {
          const tagA = ul.querySelectorAll(`a[href='${window.location.pathname}']`)
          console.log(tagA.parentElement);
          
     })
}

sider()