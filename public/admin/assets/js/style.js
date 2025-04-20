
const sider = () => {
     const sider = document.querySelector('aside')
     if (!sider) return;
     const listul = sider.querySelectorAll('ul')
     if (listul.length == 0) return
     
     listul.forEach((ul) => {
          
          
     })
}

sider()

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