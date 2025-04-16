const upload = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-1", {
          multiple: true,
          maxFileCount: 6,
     },
);

const upload2 = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-2", {
          multiple: true,
          maxFileCount: 6,
     },
);

const validator = new JustValidate("form", {
     validateBeforeSubmitting: true,
});
validator
     .addField(document.querySelector("[name = 'name']"), [{
               rule: "required",
               errorMessage: "Vui lòng nhập tên sản phẩm",
          },
          {
               rule: "minLength",
               value: 20,
               errorMessage: `Ít nhất 20 ký tự`,
          },
          {
               rule: "maxLength",
               value: 255,
               errorMessage: "Tối đa 255 kí tự",
          },
     ])
     .addField(document.querySelector("[name = 'slug']"), [{
               rule: "required",
               errorMessage: "Vui lòng nhập đường dẫn",
          },
          {
               rule: "minLength",
               value: 3,
               errorMessage: "Ít nhất 3 ký tự",
          },
          {
               rule: "maxLength",
               value: 255,
               errorMessage: "Tối đa 255 kí tự",
          },
     ]);

document
     .querySelectorAll("select[name='select-attribute']")
     .forEach((element) => {
          validator.addField(element, [{
               rule: "required",
               errorMessage: "Vui lòng chọn giá trị",
          }, ]);
     });

const validateSelectAttribute = (element) => {
     validator.addField(element, [{
          rule: "required",
          errorMessage: "Vui lòng chọn giá trị",
     }, ]);
};

// dragula([document.querySelector('[keo-tha]')], {
//      moves: function (el, container, handle) {
//           return handle.classList.contains('cursor-move');
//      }
// });

const initSortable = () => {
     const keoTha = document.querySelectorAll("[keo-tha]");
     if (!keoTha || keoTha.length === 0) return;
     new Sortable(document.querySelector("[keo-tha]"), {
          animation: 250,
          ghostClass: "blue-background-class",
          handle: ".cursor-move",
          swap: true, // Enable swap plugin
          swapClass: "highlight", // The class applied to the hovered swap item
     });
};
initSortable();

const formatPrice = (document) => {
     const moneyInput = document.querySelectorAll("[money-input]");
     if (moneyInput && moneyInput.length > 0) {
          moneyInput.forEach((input) => {
               new AutoNumeric(input, {
                    digitGroupSeparator: ",", // Dấu phẩy phân cách hàng nghìn
                    decimalCharacter: ".", // Dấu chấm phần thập phân
                    decimalPlaces: 0, // Số chữ số thập phân, ở đây là 0 vì tiền Việt Nam không có phần thập phân
               });
          });
     }
};
formatPrice(document);

const main = () => {
     // const btn = document.querySelector("[type='submit']")
     // if (!btn) return
     // btn.addEventListener('click', () => {
     //      const errors = validator.isValid;
     //      console.log(errors);
     // })
};

main();

const initTomSelectMultiple = () => {
     document.querySelectorAll("[select-multiple]").forEach((el) => {
          let settings = {
               plugins: {
                    remove_button: {
                         title: "Xóa lựa chọn này",
                    },
               },
               persist: false,
               create: true,
               // onDelete: function (values) {
               //      return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
               // }
          };
          new TomSelect(el, settings);
     });
};
initTomSelectMultiple();

const initTomSelectSingle = (item) => {
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
               direction: "asc",
          },

          // onDelete: function (values) {
          //      return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
          // }
     };
     new TomSelect(item, settings);
     // document.querySelectorAll("[select-single]").forEach((el) => {
     //      if (el.tomselect) return;


     // });
};



const openImage = () => {
     const listUploadImage = document.querySelectorAll("[upload-image]");
     if (!listUploadImage || listUploadImage.length === 0) return;
     listUploadImage.forEach((it) => {
          const btn = it.querySelector("sl-button");
          if (!btn) return;
          btn.addEventListener("click", () => {
               const input = it.querySelector("input");
               if (!input) return;
               input.click();
          });

          const trash = it.querySelector("[name='trash']");
          if (!trash) return;
          trash.addEventListener("click", () => {
               const clearButton = it.querySelector(".clear-button");
               if (!clearButton) return;
               clearButton.click();
          });
     });
};

openImage();

const addGroup = () => {
     const parentGroup = document.querySelector("[parent-group]");
     if (!parentGroup) return;
     if (parentGroup.children.length >= 2) return;
     const newDiv = document.createElement("div");
     newDiv.classList.add("bg-[#F6F6F6]", "rounded-[10px]", "relative");
     newDiv.innerHTML = `
          <div class="py-[10px] px-[20px] flex flex-col gap-y-[10px] my-[20px]">
               <div class="grid grid-cols-5 gap-[20px] mb-[10px]">
                    <div class="flex items-center gap-x-[10px]">
                         <div class="text-[14px]">Thuộc tính ${parentGroup.children.length + 1}</div>
                    </div>
                    <div class="col-span-4 grid grid-cols-2 gap-[20px]">
                         <div class="flex gap-x-[5px] items-center">
                              <div class="w-full">
                              <select select class = "w-full"
                              placeholder = "Chọn thuộc tính ${parentGroup.children.length + 1}..."
                              multiple = ""
                              select-single = ''
                                   name="select-attribute" select-attribute="${parentGroup.children.length + 1}">
                                   <option value="color">Màu sắc</option>
                                   <option value="size">Kích thước</option>
                                   <option value=""></option>
                              </select>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="grid grid-cols-5 gap-[20px]">
                    <div class="flex items-center gap-x-[10px]">
                         <div class="text-[14px]">Tùy chọn</div>
                         <sl-icon sl - icon btn-add-option = ${ parentGroup.children.length + 1 } class = "cursor-pointer text-[#8F87F1]"
                         name = "plus-circle" >
                         </sl-icon>
                    </div>
                    <div class="col-span-4 grid grid-cols-2 gap-[20px]" keo-tha="">
                         <div div class = "flex gap-x-[5px] items-center"
                         colume-attribute-value = '${parentGroup.children.length + 1}' >
                              <sl-icon class="cursor-move hover:text-[#8F87F1]" name="arrows-move"></sl-icon>
                              <div class="w-full">
                              <select class="w-full" placeholder="Chọn giá trị..." multiple="" select-single=""
                                   name="select-attribute">
                                   <option value="1">Ví dụ 1</option>
                                   <option value="2">Ví dụ 2</option>
                                   <option value=""></option>
                              </select>

                              </div>
                              <sl-icon class="cursor-pointer text-[#F7374F]" name="trash">
                              </sl-icon>
                         </div>
                    </div>
               </div>
          </div>
          <button
          class="absolute top-[10px] right-[10px] aspect-square flex items-center justify-center h-[30px] w-[30px] rounded-[7px] hover:bg-[#EBECF3]">
          <sl-icon name="x-lg"></sl-icon>
          </button>
     `;
     parentGroup.appendChild(newDiv);
     const listItemSelect = newDiv.querySelectorAll('select');
     for (const it of listItemSelect) {
          initTomSelectSingle(it)
     }
     actionGroupAttribute(newDiv)
};

const addNameValuePreviewImage = () => {
     const parentPreviewImage = document.querySelector('[parent-preview-image]')
     if (!parentPreviewImage) return;
     if (parentPreviewImage.children.length == 1) {
          const nameAtribute = parentPreviewImage.children[0].querySelector("[name-attribute]")
          nameAtribute.innerHTML = 'Thuộc tính 1:'

     } else if (parentPreviewImage.children.length > 1) {

     }


}

const addColumeThead = (table) => {
     const parentGroup = document.querySelector("[parent-group]")
     if (parentGroup.children.length > 2) return
     const thead = table.querySelector('thead')
     const tr = thead.querySelector('tr')
     const sku = thead.querySelector('[insert-attr-before]')
     const newTh = document.createElement("th");
     newTh.setAttribute("colume", parentGroup.children.length)
     newTh.classList.add('px-[10px', 'min-w-[150px]')
     newTh.innerHTML = `Thuộc tính ${parentGroup.children.length}`
     tr.insertBefore(newTh, sku)
}

const addColumeTbody = (table) => {
     const parentGroup = document.querySelector("[parent-group]")
     if (parentGroup.children.length > 2) return
     const tbody = table.querySelector('tbody')
     const listRow = tbody.querySelectorAll('tr')
     if (listRow.length > 0) {
          for (const row of listRow) {
               const sku = row.querySelector('[insert-attr-before]')
               const newTd = document.createElement("td");
               newTd.classList.add('px-[10px')
               newTd.setAttribute("colume", parentGroup.children.length)
               if (parentGroup.children.length == 1)
                    newTd.setAttribute("rowspan", 1)
               // newTd.innerHTML = `Gía trị ${parentGroup.children.length}`
               row.insertBefore(newTd, sku)
          }
     }

}

const addColumeAttribute = () => {
     const table = document.querySelector('[table-attribute]')
     if (!table) return;
     addColumeThead(table)
     addColumeTbody(table)
}

const btnAddGroup = () => {
     const btn = document.querySelector("[btn-add-group]");
     if (!btn) return;
     btn.addEventListener("click", () => {
          addGroup();
          addNameValuePreviewImage();
          addColumeAttribute();

     });
};
btnAddGroup();

const updateNameAttributePreviewImage = (value, text) => {
     const parentPreview = document.querySelector("[parent-preview-image]")
     if (!parentPreview) return;
     const listName = parentPreview.querySelectorAll('[name-attribute]')
     for (const it of listName) {
          it.innerHTML = text + ':'
          it.setAttribute('name-attribute', value)


     }

}
const updateThead = (table, value, text, number) => {
     const thead = table.querySelector('thead')
     const tr = thead.querySelector('tr');
     const th = tr.querySelector(`[colume = '${number}']`)
     th.innerHTML = text;
     if (!value) {
          th.classList.add('border-[2px]', 'border-[red]')
     } else {
          if (th.className.includes('border-[2px]', 'border-[red]'))
               th.classList.remove('border-[2px]', 'border-[red]')
     }
     th.setAttribute('attribute', value)

}

const updateBody = (table, value, text, number) => {

}
const updateNameAttributeTable = (value, text, number) => {
     const table = document.querySelector('[table-attribute]')
     updateThead(table, value, text, number)
}

const changeAttribute = (group) => {
     const attribute = group.querySelector('[select-attribute]')
     if (!attribute) return
     attribute.addEventListener('change', () => {
          const number = parseInt(attribute.getAttribute("select-attribute"))
          const option = attribute.querySelector(`option[value='${attribute.value}']`)
          if (number == 1) {
               updateNameAttributePreviewImage(attribute.value, option.innerHTML)
          }
          updateNameAttributeTable(attribute.value, option.innerHTML, number)

     })

}


const updateColumeAttributeValue = (item, row) => {
     const select = item.querySelector('select')
     select.addEventListener('change', () => {
          const option = item.querySelector(`option[value='${select.value}']`)
          const value = parseInt(item.getAttribute('colume-attribute-value'))
          if (value == 1) {
               const td = row.querySelector(`td[colume='${value}']`)
               if (!select.value) {
                    td.classList.add('border-[2px]', 'border-[red]')
               } else {
                    if (td.className.includes('border-[2px]', 'border-[red]'))
                         td.classList.remove('border-[2px]', 'border-[red]')
               }
               td.setAttribute('value', select.value)
               td.innerHTML = option.innerHTML
          } else if (value == 2) {
               const table = document.querySelector('[table-attribute]')
               const tbody = table.querySelector('tbody')
               const listRow = tbody.querySelectorAll(`td[colume='${value}']`)
               
               // làm lại
               const attributeValueGroup1 = document.querySelectorAll('[keo-tha]')[0]
               const attributeValueGroup2 = document.querySelectorAll('[keo-tha]')[1]
               const childrenArray = Array.from(attributeValueGroup2.children);
               const index = childrenArray.indexOf(item);
               for (let i = 1; i <= attributeValueGroup1.children.length; i++){
                    // console.log(i * attributeValueGroup2.children.length - attributeValueGroup2.children.length + index);
                    let current = i
                    const tdCurrent = tbody.children[((childrenArray.length * i) - childrenArray.length) + index].querySelector(`[colume="${value}"]`)
                    tdCurrent.innerHTML = option.innerHTML
                    tdCurrent.setAttribute('value', select.value)
                    if (!select.value) {
                         tdCurrent.classList.add('border-[2px]', 'border-[red]')
                    } else {
                         if (tdCurrent.className.includes('border-[2px]', 'border-[red]'))
                              tdCurrent.classList.remove('border-[2px]', 'border-[red]')
                    }
                    // console.log(`attributeValueGroup2.children: ${childrenArray.length}`)
                    // console.log(`i: ${i}`)
                    // console.log(`current: ${index}`)
                    
                    // tbody.children[attributeValueGroup2.children.length + index].querySelector(`[colume="${value}"]`).innerHTML = option.innerHTML
                    
               }

               // console.log(attributeValueGroup1.children.length);
               // for (let i = 0; i <= attributeValueGroup2.children.length - 1; i++) {
               //      if (!tbody) return;
               //      // console.log(`Hàng chính: ${ (i * parent.children.length) - parent.children.length}`);
               //      const childrenArray = Array.from(attributeValueGroup2.children);
               //      const index = childrenArray.indexOf(item);

               //      console.log('Vị trí trong list là:', index); // Vị trí bắt đầu từ 0

                    
               //      // console.log(tbody.children[(i * parent.children.length) - parent.children.length]);
               // }
               // hết làm lại
               // if (listRow.length > 0) {
               //      for (const td of listRow) {
               //           if (!select.value) {
               //                td.classList.add('border-[2px]', 'border-[red]')
               //           } else {
               //                if (td.className.includes('border-[2px]', 'border-[red]'))
               //                     td.classList.remove('border-[2px]', 'border-[red]')
               //           }
               //           td.setAttribute('value', select.value)
               //           td.innerHTML = option.innerHTML
               //      }
               // }

          }




     })

}

const changeAttributeValue = (group) => {
     const numberGroup = group.querySelector('[select-attribute]').getAttribute('select-attribute') // lấy ra thuộc tính 1 hay 2
     const countChild = group.querySelector('[keo-tha]'); // đây là số lượng các tùy chọn
     const table = document.querySelector("[table-attribute]")
     if (!table) return;
     const body = table.querySelector('tbody')
     updateColumeAttributeValue(countChild.children[0], body.children[0])

}

const addAttributeValueInGroup = (group) => {
     const parent = group.querySelector('[keo-tha]')
     const newOption = document.createElement('div')
     newOption.classList.add('flex', 'gap-x-[5px]', 'items-center')
     newOption.innerHTML = `
               <sl-icon class="cursor-move hover:text-[#8F87F1]" name="arrows-move"></sl-icon>
               <div class="w-full">
                    <select class="w-full" placeholder="Chọn giá trị..." multiple=""
                         select-single="" name="select-attribute">
                         <option value="1">Ví dụ 1</option>
                         <option value="2">Ví dụ 2</option>
                         <option value=""></option>
                    </select>
               </div>
               <sl-icon class="cursor-pointer text-[#F7374F]" name="trash"></sl-icon>
          `
     parent.appendChild(newOption)
     initTomSelectSingle(newOption.querySelector('select'))
     // return newOption
}

const addAttributeValueInTable = (group) => {
     const table = document.querySelector("[table-attribute]")
     if (!table) return;
     const body = table.querySelector('tbody')
     if (!body) return;
     const newRows = document.createElement('tr');
     newRows.classList.add('h-[50px]', 'text-center')

     newRows.innerHTML = body.children[0].innerHTML
     const listColume = newRows.querySelectorAll('[colume]')
     if (listColume && listColume.length > 0) {
          for (const it of listColume) {
               it.innerHTML = ''
          }
     }
     body.appendChild(newRows)
     // const item = addAttributeValueInGroup(group)
     // console.log((item));

     // updateColumeAttributeValue(item, newRows)
}

const addAttributeValue = (group) => {
     const btnAdd = group.querySelector('[btn-add-option]')
     if (!btnAdd) return
     btnAdd.addEventListener('click', () => {
          // addAttributeValueInGroup(group)
          const parent = group.querySelector('[keo-tha]')
          const newOption = document.createElement('div')
          newOption.setAttribute('colume-attribute-value', parseInt(btnAdd.getAttribute('btn-add-option')))
          newOption.classList.add('flex', 'gap-x-[5px]', 'items-center')
          newOption.innerHTML = `
               <sl-icon class="cursor-move hover:text-[#8F87F1]" name="arrows-move"></sl-icon>
               <div class="w-full">
                    <select class="w-full" placeholder="Chọn giá trị..." multiple="" select-single="" name="select-attribute">
                         <option value="1">Ví dụ 1</option>
                         <option value="2">Ví dụ 2</option>
                    </select>
               </div>
               <sl-icon class="cursor-pointer text-[#F7374F]" name="trash"></sl-icon>
          `
          parent.appendChild(newOption)
          initTomSelectSingle(newOption.querySelector('select'))
          // addAttributeValueInTable(group)
          // Hết addAttributeValueInGroup(group)

          // addAttributeValueInTable
          if (parseInt(btnAdd.getAttribute('btn-add-option')) == 1) {
               //Nếu group là 1
               const table = document.querySelector("[table-attribute]")
               if (!table) return;
               const body = table.querySelector('tbody')
               if (!body) return;
               // console.log(body.children[0]);
               const rowSpan = body.children[0].querySelector("[rowspan]")
               const valueRowSpan = parseInt(rowSpan.getAttribute('rowspan'))
               console.log(valueRowSpan);
               for (let i = 0; i < valueRowSpan; i++){
                    // console.log(body.children[i]);
                    const newRows = document.createElement('tr');
                    newRows.classList.add('h-[50px]', 'text-center')

                    newRows.innerHTML = body.children[i].innerHTML
                    const td = newRows.querySelector("[colume = '1']")
                    if (td){
                         td.innerHTML = '';
                         td.setAttribute('value', '');
                    }
                    
                    formatPrice(newRows)
                    body.appendChild(newRows)
                    updateColumeAttributeValue(newOption, newRows)
               }
               
               // const newRows = document.createElement('tr');
               // newRows.classList.add('h-[50px]', 'text-center')

               // newRows.innerHTML = body.children[0].innerHTML
               // const listColume = newRows.querySelectorAll('[colume]')
               // if (listColume && listColume.length > 0) {
               //      for (const it of listColume) {
               //           it.innerHTML = ''
               //           it.setAttribute('value', '')
               //      }
               // }
               
          } else if (parseInt(btnAdd.getAttribute('btn-add-option')) == 2) {
               // console.log(parseInt(btnAdd.getAttribute('btn-add-option')));
               // console.log(parent.children.length);
               const attributeValueGroup1 = document.querySelector('[keo-tha]');
               // console.log(attributeValueGroup1.children.length);
               for (let i = 1; i <= attributeValueGroup1.children.length; i++){ 
                    const tbody = document.querySelector('[table-attribute] tbody')
                    if (!tbody) return;
                    // console.log(`Hàng chính: ${ (i * parent.children.length) - parent.children.length}`);
                    tbody.children[(i * parent.children.length) - parent.children.length].querySelector("[rowspan]").setAttribute('rowspan', parent.children.length)
                    // console.log(tbody.children[(i * parent.children.length) - parent.children.length]);
                    
                    const newRow = document.createElement('tr');
                    newRow.classList.add('h-[50px]', 'text-center')
                    newRow.innerHTML = `
                         <td class="text-left w-[1%]">
                         <sl-switch
                              checked=""
                              style="--width: 50px; --height: 25px"
                              size="medium"
                              form=""
                         >
                         </sl-switch>
                         </td>
                         <td class="px-[10px]" colume="2" value=""></td>
                         <td class="text-left w-auto px-[10px]" insert-attr-before="">
                         <sl-input
                              class="w-[80%] mx-[auto]"
                              required=""
                              placeholder="Nhập SKU"
                              type="text"
                              value=""
                              size="small"
                              form=""
                         ></sl-input>
                         </td>
                         <td class="text-left w-auto px-[10px]">
                         <input
                              class="w-[10rem] mx-auto block input input-xs outline-none px-[0.75rem] border-[1px] border-[hsl(240 5.3% 26.1%)]"
                              money-input=""
                              required=""
                              placeholder="Nhập giá"
                              type="text"
                              value=""
                              size="small"
                              style="
                                   height: calc(
                                        var(--sl-input-height-small) - var(--sl-input-border-width) * 2
                                   );
                              "
                         />
                         </td>
                         <td class="text-left w-auto px-[10px]">
                         <input
                              class="w-[80%] mx-auto block input input-xs outline-none px-[0.75rem] border-[1px] border-[hsl(240 5.3% 26.1%)]"
                              money-input=""
                              required=""
                              placeholder="Nhập tồn kho"
                              type="text"
                              value="0"
                              size="small"
                              style="
                                   height: calc(
                                        var(--sl-input-height-small) - var(--sl-input-border-width) * 2
                                   );
                              "
                         />
                         </td>
                         <td class="text-left w-fit">
                         <sl-input
                              class="w-[80%] mx-auto"
                              required=""
                              placeholder="Nhập tồn kho"
                              type="text"
                              value="0"
                              size="small"
                              form=""
                         ></sl-input>
                         </td>

                    `
                    if (tbody.children[i * parent.children.length - 1]) {
                         tbody.insertBefore(newRow, tbody.children[i * parent.children.length - 1]);
                         formatPrice(newRow)
                    } else {
                         // console.log('ok');
                         
                         tbody.appendChild(newRow);
                         formatPrice(newRow)

                    }
                    
                    
               }
               updateColumeAttributeValue(newOption, undefined)
               

          }

          // Hết addAttributeValueInTable
     })
}

const actionGroupAttribute = (group) => {
     changeAttribute(group);
     changeAttributeValue(group);
     addAttributeValue(group)
     // deleteGroupAtrribute()
}