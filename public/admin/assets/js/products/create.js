
var listUploadPreview = []
let controls = [
     'play-large', // Nút phát lớn ở giữa
     'restart', // Khởi động lại phát lại
     'rewind', // Tua lại theo thời gian tìm kiếm (mặc định là 10 giây)
     'play', // Phát/tạm dừng phát lại
     'fast-forward', // Tua nhanh theo thời gian tìm kiếm (mặc định là 10 giây)
     'progress', // Thanh tiến trình và thanh trượt để phát lại và lưu vào bộ đệm
     'current-time', // Thời gian phát lại hiện tại
     'duration', // Thời lượng đầy đủ của phương tiện
     'mute', // Bật tắt tiếng
     'volume', // Điều khiển âm lượng
     'captions', // Bật tắt chú thích
     'settings', // Menu cài đặt
     'pip', // Hình trong hình (hiện chỉ có Safari)
     'airplay', // Airplay (hiện chỉ có Safari)
     'download', // Hiển thị nút tải xuống có liên kết đến nguồn hiện tại hoặc URL tùy chỉnh mà bạn chỉ định trong tùy chọn của mình
     'fullscreen' // Bật toàn màn hình
];



const upload = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-1", {
          showFileSize: true,
          accept: "image/*",

          multiple: true,
          maxFileCount: 6,
     },
);
listUploadPreview.push(upload)
const addImageFromPath = (element) => {
     const id = element.querySelector("[data-upload-id]")?.getAttribute('data-upload-id')
     const form = element.querySelector('form')
     form.addEventListener('submit', (e) => {
          e.preventDefault();
          for (const upload of listUploadPreview) {
               if (upload.uploadId == id){
                    console.log(form.querySelector('sl-input').value);
                    
                    upload.addImagesFromPath([form.querySelector('sl-input').value])
                    form.querySelector('sl-input').value = ''
               }
          }
          
     })
     
     
}



const UploadVideo1 = document.querySelector("[data-upload-id = 'upload-video-1']")
if (UploadVideo1) {
     const upload = new FileUploadWithPreview.FileUploadWithPreview(
          'upload-video-1', {
               showFileSize: true,

               multiple: true,
               maxFileCount: 6,
          },
     );
     
}

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

const initSortableSwap = (group) => {
     new Sortable(group, {
          animation: 250,
          ghostClass: "blue-background-class",
          handle: ".cursor-move",
          swap: true, // Enable swap plugin
          swapClass: "highlight", // The class applied to the hovered swap item
     });
};

const initSortable = (group) => {
     new Sortable(group, {
          animation: 250,
     });
};
if (document?.querySelector(`[data-upload-id = 'upload-image-1' ]`)){
     initSortable(document?.querySelector(`[data-upload-id = 'upload-image-1' ] .image-preview`))
     addImageFromPath(document?.querySelector(`[data-upload-id = 'upload-image-1' ]`).parentElement.parentElement)

}
if (document ?.querySelector(`[data-upload-id = 'upload-video-1' ] .image-preview`))
     initSortable(document ?.querySelector(`[data-upload-id = 'upload-video-1' ] .image-preview`))

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
               persist: true,
               create: true,
               render: {
                    // Thay đổi phần “Add <value>…”
                    option_create: function (data, escape) {
                         // data.input là text người dùng gõ
                         return '<div class="create">Ấn Enter để Thêm mới<strong>' + ' ' +
                              escape(data.input) +
                              '</strong>&hellip;</div>';
                    },
                    // Thay đổi phần “No results found”
                    no_results: function (data, escape) {
                         return '<div class="no-results">Không có kết quả nào trong các kết quả có sẵn.</div>';
                    }
               }

          };
          new TomSelect(el, settings);
     });
};
initTomSelectMultiple();

const initTomSelectSingle = (item) => {
     let settings = {
          persist: true,
          maxItems: 1,
          create: true,
          sortField: {
               field: "text",
               direction: "asc",
          },
          hideSelected: true,
          render: {
               // Thay đổi phần “Add <value>…”
               option_create: function (data, escape) {
                    // data.input là text người dùng gõ
                    return '<div class="create">Ấn Enter để Thêm mới<strong>' + ' ' +
                         escape(data.input) +
                         '</strong>&hellip;</div>';
               },
               // Thay đổi phần “No results found”
               no_results: function (data, escape) {
                    return '<div class="no-results">Không có kết quả nào trong các kết quả có sẵn.</div>';
               }
          }
     };
     new TomSelect(item, settings);
     // document.querySelectorAll("[select-single]").forEach((el) => {
     //      if (el.tomselect) return;


     // });
};



// const openImage = () => {
//      const listUploadImage = document.querySelectorAll("[upload-image]");
//      if (!listUploadImage || listUploadImage.length === 0) return;
//      listUploadImage.forEach((it) => {
//           const btn = it.querySelector("sl-button");
//           if (!btn) return;
//           btn.addEventListener("click", () => {
//                const input = it.querySelector("input");
//                if (!input) return;
//                input.click();
//           });

//           const trash = it.querySelector("[name='trash']");
//           if (!trash) return;
//           trash.addEventListener("click", () => {
//                const clearButton = it.querySelector(".clear-button");
//                if (!clearButton) return;
//                clearButton.click();
//           });
//      });
// };
const openImage = (element) => {
     const btn = element.querySelector("sl-button");
     if (!btn || !element) return;
     btn.addEventListener("click", () => {
          const input = element.querySelector("input");
          if (!input) return;
          input.click();
     });

     const trash = element.querySelector("[name='trash']");
     if (!trash) return;
     trash.addEventListener("click", () => {
          const clearButton = element.querySelector(".clear-button");
          if (!clearButton) return;
          clearButton.click();
     });
};
openImage(document.querySelector("[upload-image]"));
if (document.querySelector("[data-upload-id='upload-video-1']"))
openImage(document.querySelector("[data-upload-id='upload-video-1']").parentElement);

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
               <div class="grid grid-cols-5 items-start gap-[20px]">
                    <div class="flex items-center gap-x-[10px]">
                         <div class="text-[14px]">Tùy chọn</div>
                         <sl-icon  btn-add-option = ${ parentGroup.children.length + 1 } class = "cursor-pointer text-[#8F87F1]"
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
     newTh.className = 'px-[10px] min-w-[150px] sticky left-0 bg-[#ECEEF0]';
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
               newTd.className = 'px-[10px] sticky z-20 left-0 bg-[white]';
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
          const parentGroup = document.querySelector("[parent-group]");
          if (!parentGroup) return;
          if (parentGroup.children.length >= 2) return;
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

const updateAttributeValueInPreviewImage = (item, select) => {
     const group1 = document.querySelector("[parent-group]").children[0]
     const listOption = group1.querySelector("[keo-tha]")
     const arrayList = Array.from(listOption.children)
     const index = arrayList.indexOf(item)
     const parentImage = document.querySelector('[parent-preview-image]')
     const itemImage = parentImage.children[index].querySelector('[value-atribute]')
     const option = select.querySelector(`[value='${select.value}']`)
     if (parentImage.children[index]) {
          itemImage.setAttribute('value', select.value)
          itemImage.innerHTML = option.innerHTML
     } else {}


}

const updateColumeAttributeValue = (item, row) => {
     const select = item.querySelector('select')
     select.addEventListener('change', () => {
          const option = item.querySelector(`option[value='${select.value}']`)
          const value = parseInt(item.getAttribute('colume-attribute-value'))
          validateSelectAttribute(select)
          if (value == 1) {
               const td = row.querySelector(`td[colume='${value}']`)
               if (!select.value) {
                    td.classList.add('border-[2px]', 'border-[red]')
               } else {
                    if (td.className.includes('border-[2px]', 'border-[red]'))
                         td.classList.remove('border-[2px]', 'border-[red]')
               }
               td.setAttribute('value', select.value)
               td.innerHTML = option.innerHTML;
               updateAttributeValueInPreviewImage(item, select)
          } else if (value == 2) {
               const table = document.querySelector('[table-attribute]')
               const tbody = table.querySelector('tbody')
               const listRow = tbody.querySelectorAll(`td[colume='${value}']`)

               // làm lại
               const attributeValueGroup1 = document.querySelectorAll('[keo-tha]')[0]
               const attributeValueGroup2 = document.querySelectorAll('[keo-tha]')[1]
               const childrenArray = Array.from(attributeValueGroup2.children);
               const index = childrenArray.indexOf(item);
               for (let i = 1; i <= attributeValueGroup1.children.length; i++) {
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
               }
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
               const rowSpan = body.children[0].querySelector("[rowspan]")
               const valueRowSpan = parseInt(rowSpan.getAttribute('rowspan'))
               for (let i = 0; i < valueRowSpan; i++) {
                    const newRows = document.createElement('tr');
                    newRows.classList.add('h-[50px]', 'text-center')

                    newRows.innerHTML = body.children[i].innerHTML
                    const td = newRows.querySelector("[colume = '1']")
                    if (td) {
                         td.innerHTML = '';
                         td.setAttribute('value', '');
                    }

                    formatPrice(newRows)
                    body.appendChild(newRows)
                    updateColumeAttributeValue(newOption, newRows)
               }
          } else if (parseInt(btnAdd.getAttribute('btn-add-option')) == 2) {
               const attributeValueGroup1 = document.querySelector('[keo-tha]');
               for (let i = 1; i <= attributeValueGroup1.children.length; i++) {
                    const tbody = document.querySelector('[table-attribute] tbody')
                    if (!tbody) return;
                    tbody.children[(i * parent.children.length) - parent.children.length].querySelector("[rowspan]").setAttribute('rowspan', parent.children.length)
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
                              class="w-[12rem] mx-auto block input input-xs outline-none px-[0.75rem] border-[1px] border-[hsl(240 5.3% 26.1%)]"
                              money-input=""
                              required=""
                              placeholder="Giá bán sau khi giảm"
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
                         tbody.appendChild(newRow);
                         formatPrice(newRow)

                    }


               }
               updateColumeAttributeValue(newOption, undefined)


          }
          // Hết addAttributeValueInTable

          // Add Item Image

          const arrayList = Array.from(parent.children)
          const index = arrayList.indexOf(newOption)

          const parentImage = document.querySelector('[parent-preview-image]')
          if (parseInt(btnAdd.getAttribute('btn-add-option')) == 1 && !parentImage.children[index]) {
               const newPreview = document.createElement("div");
               newPreview.setAttribute('upload-image', '');
               newPreview.className = 'flex flex-col gap-[5px] my-[10px]'
               newPreview.innerHTML = `
                    <div class="flex items-center gap-x-[10px]">
                         <h4 class="text-[#626262] text-[13px]">Ảnh sản phẩm</h4>
                         <h4 class="text-[#626262] text-[13px]" name-attribute=""></h4>
                         <h4 class="text-[#626262] text-[13px]" value-atribute=""></h4>
                    </div>
                    <div class="flex items-start gap-x-[40px]">
                         <div div class = "custom-file-container w-[70%]"
                         data-upload-id = "upload-image-${index + 1}" >
                         </div>
                         <div class="flex items-center gap-x-[10px] w-[25%]">
                              <sl-icon class="cursor-pointer text-[#FA4F64]" name="trash"></sl-icon>
                              <sl-button class="flex-1" variant="success" size="medium">Chọn ảnh<sl-icon
                                        class="text-[white]" slot="prefix" name="images"></sl-icon>
                              </sl-button>
                         </div>
                    </div>
               `
               parentImage.appendChild(newPreview)
               const check = newPreview.querySelector(`[data-upload-id]`)
               if (check) {
                    const upload = new FileUploadWithPreview.FileUploadWithPreview(
                         `upload-image-${index + 1}`, {
                              multiple: true,
                              maxFileCount: 6,
                         },
                    );
                    listUploadPreview.push(upload)
                    const input = newPreview.querySelector('input');
                    input.setAttribute('accept', 'image/*')

                    openImage(newPreview)
                    // initSortableSwap(newPreview.querySelector(".image-preview"));
                    window.addEventListener(FileUploadWithPreview.Events.IMAGE_ADDED, (event) => {
                         initSortable(newPreview.querySelector(`[data-upload-id = '${event.detail.uploadId}'] .image-preview`))


                    })


               }

          }
          //  Hết Add Item Image
          initSortableSwap(group.querySelector("[keo-tha]"));


     })
}

window.addEventListener(
     FileUploadWithPreview.Events.IMAGE_MULTI_ITEM_CLICKED,
     (e) => {
          if (e.detail.uploadId == "upload-video-1"){
               const drawer = document.querySelector('[drawer-preview-video]')
               drawer.innerHTML = `
                    <video id="player" playsinline controls data-poster="">
                         <source src="${URL.createObjectURL(e.detail.file)}" type="video/mp4" />
                    </video>
               `
               const player = new Plyr('video', {
                    controls
               });

               window.player = player;
               drawer.show()
               
          }
          else{
               const previewImage = document.createElement("div");
               for (const file of e.detail.cachedFileArray) {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(file);
                    previewImage.appendChild(img)
               }
               const viewer = new Viewer(previewImage, {
                    navbar: true, // hiển thị ảnh phụ ở dưới
                    toolbar: true, // hiển thị toolbar
                    initialViewIndex: e.detail.index // mở vào ảnh thứ 3 (index = 2)
               });
               viewer.show();
          }


     }
);



const input = document.querySelector("[parent-preview-image] input[accept]");
if (input) input.setAttribute('accept', 'image/*')

const actionGroupAttribute = (group) => {
     changeAttribute(group);
     changeAttributeValue(group);
     addAttributeValue(group)
     // deleteGroupAtrribute()
}

const renderSeo = (input, element) => {
     if (!input) return;
     if (input.getAttribute('value')) element.innerHTML = input.getAttribute('value')

     input.addEventListener('sl-input', () => {
          if (!element) return;
          element.innerHTML = input.value
     })
}
const seoDescription = document.querySelector("[name='seo-description']")
const elementSeoDescription = document.querySelector('[seo-description]')
const seoTitle = document.querySelector("[name='seo-title']")
const elementSeoTitle = document.querySelector('[seo-title]')

renderSeo(seoDescription, elementSeoDescription)
renderSeo(seoTitle, elementSeoTitle)