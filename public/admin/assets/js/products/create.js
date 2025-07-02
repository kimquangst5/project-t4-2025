var listUploadPreview = [];
let controls = [
     "play-large", // Nút phát lớn ở giữa
     "restart", // Khởi động lại phát lại
     "rewind", // Tua lại theo thời gian tìm kiếm (mặc định là 10 giây)
     "play", // Phát/tạm dừng phát lại
     "fast-forward", // Tua nhanh theo thời gian tìm kiếm (mặc định là 10 giây)
     "progress", // Thanh tiến trình và thanh trượt để phát lại và lưu vào bộ đệm
     "current-time", // Thời gian phát lại hiện tại
     "duration", // Thời lượng đầy đủ của phương tiện
     "mute", // Bật tắt tiếng
     "volume", // Điều khiển âm lượng
     "captions", // Bật tắt chú thích
     "settings", // Menu cài đặt
     "pip", // Hình trong hình (hiện chỉ có Safari)
     "airplay", // Airplay (hiện chỉ có Safari)
     "download", // Hiển thị nút tải xuống có liên kết đến nguồn hiện tại hoặc URL tùy chỉnh mà bạn chỉ định trong tùy chọn của mình
     "fullscreen", // Bật toàn màn hình
];

const upload = new FileUploadWithPreview.FileUploadWithPreview(
     "upload-image-1", {
          showFileSize: true,
          accept: "image/*",

          multiple: true,
          maxFileCount: 6,
     },
);
listUploadPreview.push(upload);

function checkImageByLoad(url) {
     return new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = url;
     });
}

const addImageFromPath = (element) => {

     const id = element
          .querySelector("[data-upload-id]")
          .getAttribute("data-upload-id");
     const addImage = element.querySelector("[add-image-from-path]");
     const input = addImage.querySelector("sl-input");
     if (!addImage || !input) return;

     input.addEventListener("keydown", async (e) => {
          if (e.key === 'Enter') {
               e.preventDefault();
               if (input.value.length == 0) {
                    alert_quick('Vui lòng nhập hoặc dán\n link ảnh!', 'warning')
                    return;
               }
               for (const upload of listUploadPreview) {
                    if (upload.uploadId == id) {
                         const checkImage = await checkImageByLoad(input.value);
                         if (checkImage) {
                              upload.addImagesFromPath([
                                   input.value,
                              ]);
                              input.value = "";
                              alert_quick('Thêm ảnh thành công!', 'success')
                         } else {
                              alert_quick('Link ảnh không hợp lệ!', 'warning')

                         }

                    }
               }
          }

     });
};

const UploadVideo1 = document.querySelector(
     "[data-upload-id = 'upload-video-1']",
);
if (UploadVideo1) {
     const upload = new FileUploadWithPreview.FileUploadWithPreview(
          "upload-video-1", {
               showFileSize: true,

               multiple: true,
               maxFileCount: 6,
               accept: "video/*",
          },
     );
}

const viewVideo = () => {
     const viewVideo = document.querySelector("[view-video]");
     if (!viewVideo) return;
     viewVideo.addEventListener("click", () => {
          const drawer = document.querySelector("[drawer-preview-video]");
          if (!drawer) return;
          drawer.show();
     });
};

const validator = new JustValidate("form[form-validate]", {
     validateBeforeSubmitting: true,
     // submitFormAutomatically: false,
});

const validate = () => {
     const name = document.querySelector("[name = 'name']");
     const slug = document.querySelector("[name = 'slug']");
     const categories = document.querySelector("[id = 'categories']");
     const brand = document.querySelector("[id = 'brand']");

     if (!name || !slug || !brand || !categories) return;
     validator
          .addField(name, [{
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
          .addField(slug, [{
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
          ])
          .addField(categories, [{
               rule: "required",
               errorMessage: "Vui lòng chọn hoặc nhập danh mục",
          }, ])
          .addField(brand, [{
               rule: "required",
               errorMessage: "Vui lòng chọn hoặc nhập thương hiệu",
          }, ]);
     // validator
     //      .showSuccessLabels(name, [{
     //                rule: "required",
     //                errorMessage: "Vui lòng nhập tên sản phẩm",
     //           },
     //           {
     //                rule: "minLength",
     //                value: 20,
     //                errorMessage: `Ít nhất 20 ký tự`,
     //           },
     //           {
     //                rule: "maxLength",
     //                value: 255,
     //                errorMessage: "Tối đa 255 kí tự",
     //           },
     //      ])
};
validate();

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

let sortable_table;
let sortable_preview_image;

const init_sortable_table = () => {
     const tbody = document.querySelector('[table-attribute] tbody')
     if (sortable_table) sortable_table.destroy();

     sortable_table = Sortable.create(tbody, {
          animation: 400,
          sort: true,
          multiDrag: true,
          // dataIdAttr: 'data-id',
          disabled: true
     });
}

const init_sortable_preview_image = () => {
     const parent_preview_image = document.querySelector('[parent-preview-image]')
     if (sortable_preview_image) sortable_preview_image.destroy();

     sortable_preview_image = Sortable.create(parent_preview_image, {
          animation: 400,
          sort: true,
          // dataIdAttr: 'data-id',
          disabled: true
     });
}
// init_sortable_table()

const swap_two_table = (i, j) => {
     const order = sortable_table.toArray();
     sortable_table.captureAnimationState();

     [order[i], order[j]] = [order[j], order[i]]; // hoán đổi trong mảng
     sortable_table.sort(order); // SortableJS tự animate & cập nhật DOM
     sortable_table.animateAll(); // chạy animation từ cũ → mới

};

function swap_nodes(sortable, a, b) {
     sortable.captureAnimationState();
     const parent = a.parentNode;
     const sibling = a.nextSibling === b ? a : a.nextSibling;
     parent.insertBefore(a, b);
     parent.insertBefore(b, sibling);
     sortable.animateAll(); // chạy animation từ cũ → mới
}

const swap_two_preview_image = (i, j) => {
     const order = sortable_preview_image.toArray(); // [ 'a','b','c','d', ... ]
     sortable_preview_image.captureAnimationState();
     [order[i], order[j]] = [order[j], order[i]]; // hoán đổi trong mảng
     sortable_preview_image.sort(order); // SortableJS tự animate & cập nhật DOM
     sortable_preview_image.animateAll(); // chạy animation từ cũ → mới

};

const initSortableSwap = (group) => {
     let old_index;
     new Sortable(group, {
          animation: 400,
          ghostClass: "blue-background-class",
          handle: ".cursor-move",
          swap: true,
          swapClass: "highlight",
          onStart: (evt) => {
               old_index = evt.oldIndex
          },
          onEnd: (evt) => {
               const parent_group = document.querySelector('[parent-group]')
               const tbody = document.querySelector('[table-attribute] tbody')
               const parent_preview_images = document.querySelector('[parent-preview-image]')
               const select = evt.from.parentElement.parentElement.querySelector(`[select-attribute]`)
               if (select && parseInt(select.getAttribute('select-attribute')) == 1) {
                    init_sortable_preview_image()
                    swap_nodes(sortable_preview_image, parent_preview_images.children[old_index], parent_preview_images.children[evt.newIndex])
               }
               if (parent_group.children.length == 1) {
                    init_sortable_table()
                    swap_nodes(sortable_table, tbody.children[old_index], tbody.children[evt.newIndex])
               } else if (parent_group.children.length == 2) {
                    if (parseInt(select.getAttribute('select-attribute')) == 1) {
                         const childrent_2 = parent_group.children[1].querySelector('[keo-tha]').children;
                         init_sortable_table()
                         for (let i = 0; i < childrent_2.length; i++) {
                              swap_nodes(sortable_table, tbody.children[old_index * childrent_2.length + i], tbody.children[evt.newIndex * childrent_2.length + i]);
                         }

                    } else if (parseInt(select.getAttribute('select-attribute')) == 2) {
                         const childrent_1 = parent_group.children[0].querySelector('[keo-tha]').children;
                         const childrent_2 = parent_group.children[1].querySelector('[keo-tha]').children;
                         init_sortable_table();
                         let cnt_old = +old_index,
                              cnt_new = +evt.newIndex;
                         for (let i = 0; i < childrent_1.length; i++) {
                              if (old_index == 0) {
                                   const td_current = tbody.children[cnt_old].children[1];
                                   const td_current_new = tbody.children[cnt_new].children[1];
                                   let cut_td = td_current
                                   td_current.remove()
                                   // td_current_new.setAttribute('rowspan', rowspan_current);
                                   td_current_new.parentNode.insertBefore(cut_td, td_current_new)

                              } else if (evt.newIndex == 0) {
                                   // lay ra the td o vi tri new de cut dem qua vi tr old
                                   const td_current_new = tbody.children[cnt_new].children[1];
                                   const td_current_old = tbody.children[cnt_old].children[1];
                                   let cut_td = td_current_new
                                   td_current_new.remove()
                                   // td_current_new.setAttribute('rowspan', rowspan_current);
                                   td_current_old.parentNode.insertBefore(cut_td, td_current_old)
                              }
                              swap_nodes(sortable_table, tbody.children[cnt_old], tbody.children[cnt_new]);

                              cnt_old += childrent_2.length
                              cnt_new += childrent_2.length
                         }

                    }
               }

          }

     })
};



const btn_test = document.querySelector('[test-swap-table]');
btn_test.addEventListener('click', () => {
     const listEl = document.querySelector('table tbody')
     const items = listEl.children;
     const row2 = items[0];
     const row3 = items[1];
     const row7 = items[3];
     const row8 = items[4];

     // 3) Swap hai cặp
     swap_nodes(row2, row7);
     swap_nodes(row3, row8);

})
const initSortable = (group) => {
     new Sortable(group, {
          animation: 250,
     });
};
if (document.querySelector(`[data-upload-id = 'upload-image-1' ]`)) {
     initSortable(
          document.querySelector(
               `[data-upload-id = 'upload-image-1' ] .image-preview`,
          ),
     );
     addImageFromPath(
          document.querySelector(`[data-upload-id = 'upload-image-1' ]`)
          .parentElement.parentElement,
     );
}
if (
     document.querySelector(
          `[data-upload-id = 'upload-video-1' ] .image-preview`,
     )
)
     initSortable(
          document.querySelector(
               `[data-upload-id = 'upload-video-1' ] .image-preview`,
          ),
     );

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


initTomSelectMultiple();



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
     openImage(
          document.querySelector("[data-upload-id='upload-video-1']")
          .parentElement,
     );

const attribute_change = (element) => {
     const select = element.querySelector(`[name = 'select-attribute']`);
     select.addEventListener('change', async () => {
          const select_id = extractItems(select.tomselect)[0];
          const list_options = element.querySelectorAll(`[keo-tha] select`);
          for await (const it of list_options) {
               const ts = it.tomselect;
               ts.clearOptions();
               ts.clear(true)
               if (select_id && select_id.id && extractItems(select.tomselect)[0].new == false) {
                    await axios.get(`/api/attributes/detail/${select_id.id}`)
                         .then(async (res) => {
                              if (res.data.attributes) {
                                   let array_option = []
                                   for (const it of res.data.attributes.array_value) {
                                        array_option.push({
                                             value: it._id,
                                             text: it.value
                                        })
                                   }

                                   await ts.addOption(array_option);
                              }

                         })



               }
               ts.refreshOptions(false);
          }
     })

}

const addGroup = async () => {
     const parentGroup = document.querySelector("[parent-group]");
     if (!parentGroup) return;
     if (parentGroup.children.length >= 2) return;
     const newDiv = document.createElement("div");
     newDiv.classList.add("bg-[#F6F6F6]", "rounded-[10px]", "relative");

     let parent_html = ''
     parent_html += `
          <div class="py-[10px] px-[20px] flex flex-col gap-y-[10px] my-[20px]">
               <div class="grid grid-cols-5 gap-[20px] mb-[10px]">
                    <div class="flex items-center gap-x-[10px]">
                         <div class="text-[14px]">Thuộc tính ${parentGroup.children.length + 1}</div>
                    </div>
                    <div class="col-span-4 grid grid-cols-2 gap-[20px]">
                         <div class="flex gap-x-[5px] items-center">
                              <div class="w-full">
                              <select  class = "w-full"
                              placeholder = "Chọn thuộc tính ${parentGroup.children.length + 1}..."
                              multiple = ""
                              select-single = '' name="select-attribute" select-attribute="${parentGroup.children.length + 1}">`
     await axios.get('/api/attributes/list?select=name')
          .then(res => {
               if (res.data && res.data.attributes.length > 0) {
                    for (const it of res.data.attributes) {
                         parent_html += `<option value="${it._id}">${it.name}</option>`
                    }

               }
          })
     parent_html += `</select>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="grid grid-cols-5 items-start gap-[20px]">
                    <div class="flex items-center gap-x-[10px]">
                         <div class="text-[14px]">Tùy chọn</div>
                         <sl-icon  btn-add-option = ${parentGroup.children.length + 1} class = "cursor-pointer text-[#8F87F1]"
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

     newDiv.innerHTML = parent_html;
     parentGroup.appendChild(newDiv);
     const listItemSelect = newDiv.querySelectorAll("select");
     for (const it of listItemSelect) {
          initTomSelectSingle(it);
     }
     actionGroupAttribute(newDiv);
     attribute_change(newDiv)
};

const addNameValuePreviewImage = () => {
     const parentPreviewImage = document.querySelector("[parent-preview-image]");
     if (!parentPreviewImage) return;
     if (parentPreviewImage.children.length == 1) {
          const nameAtribute =
               parentPreviewImage.children[0].querySelector("[name-attribute]");
          nameAtribute.innerHTML = "Thuộc tính 1:";
     } else if (parentPreviewImage.children.length > 1) {}
};

const addColumeThead = (table) => {
     const parentGroup = document.querySelector("[parent-group]");
     if (parentGroup.children.length > 2) return;
     const thead = table.querySelector("thead");
     const tr = thead.querySelector("tr");
     const sku = thead.querySelector("[insert-attr-before]");
     const newTh = document.createElement("th");
     newTh.setAttribute("colume", parentGroup.children.length);
     newTh.className = "px-[10px] min-w-[150px] sticky left-0 bg-[#ECEEF0]";
     newTh.innerHTML = `Thuộc tính ${parentGroup.children.length}`;
     tr.insertBefore(newTh, sku);
};

const addColumeTbody = (table) => {
     const parentGroup = document.querySelector("[parent-group]");
     if (parentGroup.children.length > 2) return;
     const tbody = table.querySelector("tbody");
     const listRow = tbody.querySelectorAll("tr");
     if (listRow.length > 0) {
          for (const row of listRow) {
               const sku = row.querySelector("[insert-attr-before]");
               const newTd = document.createElement("td");
               newTd.className = "px-[10px] sticky z-20 left-0 bg-[white]";
               newTd.setAttribute("colume", parentGroup.children.length);
               if (parentGroup.children.length == 1)
                    newTd.setAttribute("rowspan", 1);
               // newTd.innerHTML = `Gía trị ${parentGroup.children.length}`
               row.insertBefore(newTd, sku);
          }
     }
};

const addColumeAttribute = () => {
     const table = document.querySelector("[table-attribute]");
     if (!table) return;
     addColumeThead(table);
     addColumeTbody(table);
};

const btnAddGroup = () => {
     const btn = document.querySelector("[btn-add-group]");
     if (!btn) return;

     btn.addEventListener("click", async () => {
          const parentGroup = document.querySelector("[parent-group]");
          if (!parentGroup) return;
          if (parentGroup.children.length >= 2) return;
          await addGroup();
          addNameValuePreviewImage();
          addColumeAttribute();
     });
};
btnAddGroup();

const updateNameAttributePreviewImage = (value, text) => {
     const parentPreview = document.querySelector("[parent-preview-image]");
     if (!parentPreview) return;
     const listName = parentPreview.querySelectorAll("[name-attribute]");
     for (const it of listName) {
          it.innerHTML = text + ":";
          it.setAttribute("name-attribute", value);
     }
};
const updateThead = (table, value, text, number) => {
     const thead = table.querySelector("thead");
     const tr = thead.querySelector("tr");
     const th = tr.querySelector(`[colume = '${number}']`);
     th.innerHTML = text;
     if (!value) {
          th.classList.add("border-[2px]", "border-[red]");
     } else {
          if (th.className.includes("border-[2px]", "border-[red]"))
               th.classList.remove("border-[2px]", "border-[red]");
     }
     th.setAttribute("attribute", value);
};

const updateBody = (table, value, text, number) => {};
const updateNameAttributeTable = (value, text, number) => {
     const table = document.querySelector("[table-attribute]");
     updateThead(table, value, text, number);
};

const changeAttribute = (group) => {
     const attribute = group.querySelector("[select-attribute]");
     if (!attribute) return;
     attribute.addEventListener("change", () => {
          const number = parseInt(attribute.getAttribute("select-attribute"));
          const option = attribute.querySelector(
               `option[value='${attribute.value}']`,
          );
          if (number == 1) {
               updateNameAttributePreviewImage(attribute.value, option.innerHTML);
          }
          updateNameAttributeTable(attribute.value, option.innerHTML, number);
     });
};

const updateAttributeValueInPreviewImage = (item, select) => {
     const group1 = document.querySelector("[parent-group]").children[0];
     const listOption = group1.querySelector("[keo-tha]");
     const arrayList = Array.from(listOption.children);
     const index = arrayList.indexOf(item);
     const parentImage = document.querySelector("[parent-preview-image]");
     const itemImage =
          parentImage.children[index].querySelector("[value-atribute]");
     const option = select.querySelector(`[value='${select.value}']`);
     if (parentImage.children[index]) {
          itemImage.setAttribute("value", select.value);
          itemImage.innerHTML = option.innerHTML;
     } else {}
};

const updateColumeAttributeValue = (item, row) => {
     const select = item.querySelector("select");
     select.addEventListener("change", () => {
          const option = item.querySelector(`option[value='${select.value}']`);
          const value = parseInt(item.getAttribute("colume-attribute-value"));
          validateSelectAttribute(select);
          if (value == 1) {
               const td = row.querySelector(`td[colume='${value}']`);
               if (td && !select.value) {
                    td.classList.add("border-[2px]", "border-[red]");
               } else if (td && select.value) {
                    if (td.className && td.className.includes("border-[2px]", "border-[red]"))
                         td.classList.remove("border-[2px]", "border-[red]");
               }
               if (td && select.value) {
                    td.setAttribute("value", select.value);
                    td.innerHTML = option.innerHTML;
               }

               updateAttributeValueInPreviewImage(item, select);
          } else if (value == 2) {
               const table = document.querySelector("[table-attribute]");
               const tbody = table.querySelector("tbody");
               const listRow = tbody.querySelectorAll(`td[colume='${value}']`);

               // làm lại
               const attributeValueGroup1 =
                    document.querySelectorAll("[keo-tha]")[0];
               const attributeValueGroup2 =
                    document.querySelectorAll("[keo-tha]")[1];
               const childrenArray = Array.from(attributeValueGroup2.children);
               const index = childrenArray.indexOf(item);
               for (let i = 1; i <= attributeValueGroup1.children.length; i++) {
                    let current = i;
                    const tdCurrent = tbody.children[
                         childrenArray.length * i - childrenArray.length + index
                    ].querySelector(`[colume="${value}"]`);
                    tdCurrent.innerHTML = option.innerHTML;
                    tdCurrent.setAttribute("value", select.value);
                    if (!select.value) {
                         tdCurrent.classList.add("border-[2px]", "border-[red]");
                    } else {
                         if (
                              tdCurrent.className.includes(
                                   "border-[2px]",
                                   "border-[red]",
                              )
                         )
                              tdCurrent.classList.remove(
                                   "border-[2px]",
                                   "border-[red]",
                              );
                    }
               }
          }
     });
};

const changeAttributeValue = (group) => {
     const numberGroup = group
          .querySelector("[select-attribute]")
          .getAttribute("select-attribute"); // lấy ra thuộc tính 1 hay 2
     const countChild = group.querySelector("[keo-tha]"); // đây là số lượng các tùy chọn
     const table = document.querySelector("[table-attribute]");
     if (!table) return;
     const body = table.querySelector("tbody");
     updateColumeAttributeValue(countChild.children[0], body.children[0]);
};

const addAttributeValueInGroup = (group) => {
     const parent = group.querySelector("[keo-tha]");
     const newOption = document.createElement("div");
     newOption.classList.add("flex", "gap-x-[5px]", "items-center");
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
          `;
     parent.appendChild(newOption);
     initTomSelectSingle(newOption.querySelector("select"));
     // return newOption
};

const addAttributeValueInTable = (group) => {
     const table = document.querySelector("[table-attribute]");
     if (!table) return;
     const body = table.querySelector("tbody");
     if (!body) return;
     const newRows = document.createElement("tr");
     newRows.classList.add("h-[50px]", "text-center");

     newRows.innerHTML = body.children[0].innerHTML;
     const listColume = newRows.querySelectorAll("[colume]");
     if (listColume && listColume.length > 0) {
          for (const it of listColume) {
               it.innerHTML = "";
          }
     }
     body.appendChild(newRows);
};

const addAttributeValue = (group) => {
     const btnAdd = group.querySelector("[btn-add-option]");
     if (!btnAdd) return;
     btnAdd.addEventListener("click", async () => {
          // addAttributeValueInGroup(group)
          const parent = group.querySelector("[keo-tha]");
          const newOption = document.createElement("div");
          newOption.setAttribute(
               "colume-attribute-value",
               parseInt(btnAdd.getAttribute("btn-add-option")),
          );
          newOption.classList.add("flex", "gap-x-[5px]", "items-center");
          let html_new_options = ''
          html_new_options += `
               <sl-icon class="cursor-move hover:text-[#8F87F1]" name="arrows-move"></sl-icon>
               <div class="w-full">
                    <select class="w-full" placeholder="Chọn giá trị..." multiple="" select-single="" name="select-attribute">`
          const ts = extractItems(group.querySelector(`[name = 'select-attribute']`).tomselect)[0]
          if (ts && ts.new == false) {
               await axios.get(`/api/attributes/detail/${ts.id}`)
                    .then(res => {
                         if (res.data && res.data.attributes.array_value.length > 0) {
                              for (const it of res.data.attributes.array_value) {
                                   html_new_options += `
                                                       <option value="${it._id}">${it.value}</option>
                                                  `
                              }
                         }

                    })
          }
          html_new_options += `</select>
               </div>
               <sl-icon class="cursor-pointer text-[#F7374F]" name="trash"></sl-icon>
          `;
          newOption.innerHTML = html_new_options;
          parent.appendChild(newOption);
          initTomSelectSingle(newOption.querySelector("select"));


          // addAttributeValueInTable(group)
          // Hết addAttributeValueInGroup(group)

          // addAttributeValueInTable
          if (parseInt(btnAdd.getAttribute("btn-add-option")) == 1) {
               //Nếu group là 1
               const table = document.querySelector("[table-attribute]");
               if (!table) return;
               const body = table.querySelector("tbody");
               if (!body) return;
               const rowSpan = body.children[0].querySelector("[rowspan]");
               const valueRowSpan = parseInt(rowSpan.getAttribute("rowspan"));
               for (let i = 0; i < valueRowSpan; i++) {
                    const newRows = document.createElement("tr");
                    newRows.classList.add("h-[50px]", "text-center");

                    newRows.innerHTML = body.children[i].innerHTML;
                    const td = newRows.querySelector("[colume = '1']");
                    if (td) {
                         td.innerHTML = "";
                         td.setAttribute("value", "");
                    }

                    formatPrice(newRows);
                    body.appendChild(newRows);
                    updateColumeAttributeValue(newOption, newRows);
               }
          } else if (parseInt(btnAdd.getAttribute("btn-add-option")) == 2) {
               const attributeValueGroup1 = document.querySelector("[keo-tha]");
               for (let i = 1; i <= attributeValueGroup1.children.length; i++) {
                    const tbody = document.querySelector("[table-attribute] tbody");
                    if (!tbody) return;
                    tbody.children[
                              i * parent.children.length - parent.children.length
                         ]
                         .querySelector("[rowspan]")
                         .setAttribute("rowspan", parent.children.length);
                    const newRow = document.createElement("tr");
                    newRow.classList.add("h-[50px]", "text-center");
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
                              name = "price-before-discount"
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
                              name = "price-after-discount"
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
                              name = 'stock'
                              size="small"
                         ></sl-input>
                         </td>

                    `;
                    if (tbody.children[i * parent.children.length - 1]) {
                         tbody.insertBefore(
                              newRow,
                              tbody.children[i * parent.children.length - 1],
                         );
                         formatPrice(newRow);
                    } else {
                         tbody.appendChild(newRow);
                         formatPrice(newRow);
                    }
               }
               updateColumeAttributeValue(newOption, undefined);
          }
          // Hết addAttributeValueInTable

          // Add Item Image

          const arrayList = Array.from(parent.children);
          const index = arrayList.indexOf(newOption);

          const parentImage = document.querySelector("[parent-preview-image]");
          if (
               parseInt(btnAdd.getAttribute("btn-add-option")) == 1 &&
               !parentImage.children[index]
          ) {
               const newPreview = document.createElement("div");
               newPreview.setAttribute("upload-image", "");
               newPreview.className = "flex flex-col gap-[5px] my-[10px]";
               let name_attribute = '';
               const tom_select_att = group.querySelector(`[name = 'select-attribute']`).tomselect
               let {
                    options
               } = tom_select_att
               if (extractItems(tom_select_att)[0]) {
                    name_attribute = options[extractItems(tom_select_att)[0].id].text
               }


               newPreview.innerHTML = `
                    <div class="flex items-center gap-x-[10px]">
                         <h4 class="text-[#626262] text-[13px]">Ảnh sản phẩm (Tối đa 6 ảnh)</h4>
                         <h4 class="text-[#626262] text-[13px]" name-attribute="">${name_attribute}</h4>
                         <h4 class="text-[#626262] text-[13px]" value-atribute=""></h4>
                    </div>
                    <div class="flex items-start gap-x-[40px]">
                         <div div class = "custom-file-container w-[70%]"
                         data-upload-id = "upload-image-${index + 1}" >
                         </div>
                         <div class="flex items-center gap-x-[10px] w-[25%]">
                              <sl-icon class="cursor-pointer text-[#FA4F64]" name="trash"></sl-icon>
                              <div class="flex flex-col flex-1 gap-y-[10px]">
                                   <sl-button class="flex-1" variant="success" size="small">Chọn ảnh<sl-icon
                                             class="text-[white]" slot="prefix" name="images"></sl-icon>
                                   </sl-button>
                                   <div class = "flex items-center gap-x-[5px]"
                                   add-image-from-path = ''>
                                        <sl-input class="flex-1" variant="success" size="small" placeholder="Dán link ảnh có sẵn..." type="text"></sl-input>
                                        <button type="submit">
                                             <sl-icon class="text-[var(--green)] cursor-pointer" name="check-lg">
                                             </sl-icon>
                                        </button>
                                   </div>
                              </div>
                              
                         </div>
                    </div>
               `;
               parentImage.appendChild(newPreview);
               const check = newPreview.querySelector(`[data-upload-id]`);
               if (check) {
                    addImageFromPath(newPreview);
                    const upload = new FileUploadWithPreview.FileUploadWithPreview(
                         `upload-image-${index + 1}`, {
                              multiple: true,
                              maxFileCount: 6,
                         },
                    );
                    listUploadPreview.push(upload);
                    const input = newPreview.querySelector("input");
                    input.setAttribute("accept", "image/*");

                    openImage(newPreview);
                    // initSortableSwap(newPreview.querySelector(".image-preview"));
                    window.addEventListener(
                         FileUploadWithPreview.Events.IMAGE_ADDED,
                         async (event) => {
                              const uploadId = event.detail.uploadId;
                              const intervalId = setInterval(() => {
                                   const previewEl = document.querySelector(
                                        `[data-upload-id="${uploadId}"] .image-preview`
                                   );
                                   if (previewEl) {
                                        initSortable(previewEl);
                                        clearInterval(intervalId);
                                   }
                              }, 1000);
                         },
                    );
               }
          }
          //  Hết Add Item Image
          initSortableSwap(group.querySelector("[keo-tha]"));
     });
};

window.addEventListener(
     FileUploadWithPreview.Events.IMAGE_MULTI_ITEM_CLICKED,
     (e) => {
          if (e.detail.uploadId == "upload-video-1") {
               const drawer = document.querySelector("[drawer-preview-video]");
               if (drawer.children[0]) {}

               drawer.innerHTML = `
                    <video video id = "player"
                    playsinline controls autoplay loop>
                         <source src="${URL.createObjectURL(e.detail.file)}" type="video/mp4" />
                    </video>
               `;
               const player = new Plyr("video", {
                    controls,
               });

               window.player = player;
               drawer.show();
               viewVideo();
          } else {
               const previewImage = document.createElement("div");
               for (const file of e.detail.cachedFileArray) {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(file);
                    previewImage.appendChild(img);
               }
               const viewer = new Viewer(previewImage, {
                    navbar: true, // hiển thị ảnh phụ ở dưới
                    toolbar: true, // hiển thị toolbar
                    initialViewIndex: e.detail.index, // mở vào ảnh thứ 3 (index = 2)
               });
               viewer.show();
          }
     },
);

const input = document.querySelector("[parent-preview-image] input[accept]");
if (input) input.setAttribute("accept", "image/*");

const actionGroupAttribute = (group) => {
     changeAttribute(group);
     changeAttributeValue(group);
     addAttributeValue(group);
     // deleteGroupAtrribute()
};

const renderSeo = (input, element) => {
     if (!input) return;
     if (input.getAttribute("value"))
          element.innerHTML = input.getAttribute("value");

     input.addEventListener("sl-input", () => {
          if (!element) return;
          element.innerHTML = input.value;
     });
};
const seoDescription = document.querySelector("[name='seo-description']");
const elementSeoDescription = document.querySelector("[seo-description]");
const seoTitle = document.querySelector("[name='seo-title']");
const elementSeoTitle = document.querySelector("[seo-title]");

renderSeo(seoDescription, elementSeoDescription);
renderSeo(seoTitle, elementSeoTitle);

const initSlug = (string) => {
     const result = slugify(string, {
          replacement: "-", // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true, // convert to lower case, defaults to `false`
          strict: true, // strip special characters except replacement, defaults to `false`
          locale: "vi", // language code of the locale to use
          trim: true, // trim leading and trailing replacement chars, defaults to `true`
     });
     return result;
};

const btnSlug = () => {
     const btnSlug = document.querySelector("[btn-slug");
     if (!btnSlug) return;
     btnSlug.addEventListener("click", () => {
          const name = document.querySelector(`[name = 'name' ]`);
          const slug = document.querySelector(`[name = 'slug' ]`);
          if (name.value) {
               const result = initSlug(name.value);
               slug.value = result;
               alert_quick("Đã đồng bộ đường dẫn", "success");
          } else {
               alert(
                    "Bạn chưa nhập tên sản phẩm?",
                    "warning",
                    "center",
                    "Vui lòng nhập tên sản phẩm để đồng bộ đường dẫn!",
                    false,
               );
          }
     });
};
btnSlug();

const main = () => {
     const form = document.querySelector("form[form-validate]");
     if (!form) return;
     form.addEventListener("submit", (e) => {
          e.preventDefault();
     });
     const btnSubmit = document.querySelector("[btn-submit]");
     btnSubmit.addEventListener("click", () => {

          validator.revalidate().then((isValid) => {
               if (isValid) {
                    alert(
                         "Thêm mới sản phẩm?",
                         "warning",
                         "center",
                         "Bạn có chắc muốn thêm mới sản phẩm này?",
                         true,
                         () => {
                              const parentGroup = document.querySelector("[parent-group]");
                              const formData = new FormData();

                              const name = form.querySelector(`[name = 'name']`);
                              const slug = form.querySelector(`[name = 'slug']`);
                              const categories =
                                   form.querySelector(`[id = 'categories']`);
                              const brand = form.querySelector(`[id = 'brand']`);
                              const featured =
                                   form.querySelector(`[name = 'featured']`);
                              const post_tags = form.querySelector(`[name = 'post-tags']`);
                              const seo_title = form.querySelector(`[name = 'seo-title']`);
                              const seo_description = form.querySelector(`[name = 'seo-description']`);
                              const seo_keyword = form.querySelector(`[name = 'seo-keyword']`);
                              if (
                                   !name ||
                                   !slug ||
                                   !categories ||
                                   !brand ||
                                   !featured ||
                                   !post_tags
                              )
                                   return;
                              const array_categories = extractItems(
                                   categories.tomselect,
                              );

                              const array_brands = extractItems(brand.tomselect);
                              let array_image_preview_id = []
                              let tier_variations = [];
                              if (parentGroup.childElementCount == 0) {


                              } else if (parentGroup.childElementCount == 1) {

                              } else if (parentGroup.childElementCount == 2) {

                              }
                              switch (parentGroup.childElementCount) {
                                   case 0:
                                        // Ảnh
                                        const uploadId = document.querySelector(`[data-upload-id = '${listUploadPreview[0].uploadId}'] .image-preview`)
                                        let index = 1;
                                        for (const element of uploadId.children) {
                                             const file = listUploadPreview[0].cachedFileArray.find(file => file.name == element.getAttribute('data-upload-name'))
                                             array_image_preview_id.push({
                                                  preview_id: file.name.split(":upload:")[1],
                                                  position: index++
                                             });
                                             formData.append(
                                                  "images",
                                                  file,
                                             );
                                        }
                                        // Hết Ảnh

                                        // Giá và số lượng

                                        const status = document.querySelector('table tbody tr sl-switch');
                                        const SKU = document.querySelector(`table tbody tr [insert-attr-before] sl-input`);
                                        const price_before_discount = document.querySelector(`table tbody tr [name = 'price-before-discount']`);
                                        const price_after_discount = document.querySelector(`table tbody tr [name = 'price-after-discount']`);
                                        const stock = document.querySelector(`table tbody tr [name = 'stock']`);
                                        tier_variations.push({
                                             status: status.checked,
                                             SKU: SKU.value,
                                             price_before_discount: +price_before_discount.value.replace(/,/g, ''),
                                             price_after_discount: +price_after_discount.value.replace(/,/g, ''),
                                             stock: +stock.value,
                                        })

                                        // Hết Giá và số lượng
                                        break;
                                   case 1:
                                        const attribute = parentGroup.children[0].querySelector('[select-attribute]');
                                        if (!attribute) return;
                                        formData.append("atribute_1_status", JSON.stringify(extractItems(attribute.tomselect)[0]));
                                        const parent_child = parentGroup.children[0].querySelector('[keo-tha]');
                                        const list_child = parent_child.querySelectorAll('select');
                                        let index_case_1 = 0;
                                        const tbody = document.querySelector('[table-attribute] tbody')
                                        for (const select of list_child) {
                                             const tr = tbody.children[index_case_1]

                                             tier_variations.push({
                                                  status: tr.querySelector('sl-switch').checked,
                                                  atribute_value_1_status: extractItems(select.tomselect)[0],
                                                  SKU: tr.querySelector("[name = 'sku']").value,
                                                  price_before_discount: +tr.querySelector("[name = 'price-before-discount']").value.replace(/,/g, ''),
                                                  price_after_discount: +tr.querySelector("[name = 'price-after-discount']").value.replace(/,/g, ''),
                                                  stock: +tr.querySelector("[name = 'stock']").value,
                                                  position: index_case_1 + 1
                                             })
                                             index_case_1++;
                                        }

                                        // Ảnh
                                        const list_upload_element = document.querySelectorAll('[upload-image]')
                                        let cnt = 0
                                        for (const it of list_upload_element) {
                                             const image_preview = it.querySelector('.image-preview');
                                             const data_upload_id = it.querySelector('[data-upload-id]');
                                             let res = 1;
                                             for (const image of image_preview.children) {
                                                  const ele = parent_child.children[cnt]
                                                  const select = ele.querySelector('select')

                                                  const upload = listUploadPreview.find(it => it.uploadId === data_upload_id.getAttribute('data-upload-id'))
                                                  const file = upload.cachedFileArray.find(file => file.name == image.getAttribute('data-upload-name'));
                                                  array_image_preview_id.push({
                                                       preview_id: file.name.split(":upload:")[1],
                                                       position: res,
                                                       attribute_value_id: extractItems(select.tomselect)[0].id
                                                  });
                                                  formData.append(
                                                       "images",
                                                       file,
                                                  );
                                                  res++;
                                             }
                                             cnt++;
                                        }
                                        // Hết Ảnh
                                        break;
                                   case 2:
                                        // SKU và Giá
                                        const group_1 = document.querySelector('[parent-group]').children[0].querySelector('[keo-tha]')
                                        const group_2 = document.querySelector('[parent-group]').children[1].querySelector('[keo-tha]');
                                        const attribute_1_status = document.querySelector('[parent-group]').children[0].querySelector("[name = 'select-attribute']")
                                        const attribute_2_status = document.querySelector('[parent-group]').children[1].querySelector("[name = 'select-attribute']")
                                        formData.append("atribute_1_status", JSON.stringify(extractItems(attribute_1_status.tomselect)[0]));
                                        formData.append("atribute_2_status", JSON.stringify(extractItems(attribute_2_status.tomselect)[0]));
                                        formData.append("number_of_attribute_values_2", group_2.children.length);
                                        const tbody_case_2 = document.querySelector('[table-attribute] tbody');
                                        let index_case_2 = 0;
                                        for (let i = 0; i < group_1.children.length; i++) {
                                             const select_1 = group_1.children[i].querySelector('select');

                                             for (let j = 0; j < group_2.children.length; j++) {
                                                  const select_2 = group_2.children[j].querySelector('select');
                                                  const tr = tbody_case_2.children[i * group_2.children.length + j]
                                                  tier_variations.push({
                                                       status: tr.querySelector('sl-switch').checked,
                                                       atribute_value_1_status: extractItems(select_1.tomselect)[0],
                                                       atribute_value_2_status: extractItems(select_2.tomselect)[0],
                                                       SKU: tr.querySelector("[insert-attr-before] sl-input").value,
                                                       price_before_discount: +tr.querySelector("[name = 'price-before-discount']").value.replace(/,/g, '') || 0,
                                                       price_after_discount: +tr.querySelector("[name = 'price-after-discount']").value.replace(/,/g, '') || 0,
                                                       stock: +tr.querySelector("[name = 'stock']").value,
                                                       position: index_case_2 + 1
                                                  });
                                                  index_case_2++;

                                             }
                                        }

                                        // Ảnh
                                        const parent_child_case_2 = parentGroup.children[0].querySelector('[keo-tha]');
                                        const list_upload_element_case_2 = document.querySelectorAll('[upload-image]')
                                        let cnt_case_2 = 0
                                        for (const it of list_upload_element_case_2) {
                                             const image_preview = it.querySelector('.image-preview');
                                             const data_upload_id = it.querySelector('[data-upload-id]');
                                             let res = 1;
                                             for (const image of image_preview.children) {
                                                  const ele = parent_child_case_2.children[cnt_case_2]
                                                  const select = ele.querySelector('select');

                                                  const upload = listUploadPreview.find(it => it.uploadId === data_upload_id.getAttribute('data-upload-id'))
                                                  const file = upload.cachedFileArray.find(file => file.name == image.getAttribute('data-upload-name'));
                                                  array_image_preview_id.push({
                                                       preview_id: file.name.split(":upload:")[1],
                                                       position: res,
                                                       attribute_value_id: extractItems(select.tomselect)[0].id
                                                  });
                                                  formData.append(
                                                       "images",
                                                       file,
                                                  );
                                                  res++;
                                             }
                                             cnt_case_2++;
                                        }
                                        // Hết Ảnh

                                        // Hết SKU và Giá
                                        break;
                              }


                              formData.append("array_seo_information", JSON.stringify({
                                   title: seo_title.value,
                                   description: seo_description.value,
                                   keyword: seo_keyword.tomselect.items,
                              }))
                              formData.append("array_post_tags", JSON.stringify(post_tags.tomselect.items));
                              formData.append("description_short", tinymce.get("description-short").getContent());
                              formData.append("description_content", tinymce.get("description-content").getContent());
                              formData.append("array_tier_variations", JSON.stringify(tier_variations));
                              formData.append("array_image_preview_id", JSON.stringify(array_image_preview_id));
                              formData.append("name", name.value);
                              formData.append("slug", slug.value);
                              formData.append("featured", JSON.parse(featured.value));
                              formData.append(
                                   "array_categories",
                                   JSON.stringify(array_categories),
                              );
                              formData.append(
                                   "array_brands",
                                   JSON.stringify(array_brands),
                              );

                              formData.append(
                                   "number_of_attributes",
                                   parentGroup.childElementCount,
                              );




                              axios
                                   .post(btnSubmit.getAttribute('btn-submit'), formData, {
                                        headers: {
                                             'Content-Type': 'multipart/form-data'
                                        }
                                   })
                                   .then((res) => {
                                        if (res.data.success == true) {
                                             alert_quick("Thêm thành công!");
                                        }
                                   });
                         },
                    );
               } else {
                    form.requestSubmit();
                    alert_quick("Vui lòng điền trường màu đỏ!", "warning");
               }
               // Nếu không, onFail/onSuccess sẽ được gọi tương ứng
          });
     });
};

main();