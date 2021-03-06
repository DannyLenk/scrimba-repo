"use strict"

const myDropdown = document.querySelector('#myDropdown');
const dropBtn = document.querySelector('#dropBtn');
const colorPicker = document.querySelector('#colorPicker');
const getBtn = document.querySelector('#getBtn');

let seedColor = `000000`;
let schemeMode = `monochrome`;

dropBtn.addEventListener('click', () => {
  myDropdown.classList.toggle('show');
})

colorPicker.addEventListener('input', () => {
  seedColor = colorPicker.value.slice(1);
}, false);

getBtn.addEventListener('click', () => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
    .then(res => res.json())
    .then(data => {
      
      const mainList = document.querySelectorAll('.main__col');
      const footList = document.querySelectorAll('.footer__col');

      data.colors.forEach((color, index) => {
        mainList[index].style.background = color.hex.value;
        footList[index].textContent = color.hex.value;
      })

    })
  ;
})

function copy(input) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input).then(() => {
      console.log('Copied to clipboard successfully.');
    }, (err) => {
      console.log('Failed to copy the text to clipboard.', err);
    });
  } else if (window.clipboardData) {
    window.clipboardData.setData("Text", input);
  }
}

window.onclick = function(e) {
  
  if (e.target.id != 'dropBtn') {
    myDropdown.classList.remove('show');
  }

  if (e.target.classList.contains('dropdown-a')) {
    const aList = document.querySelectorAll('.dropdown-a');

    aList.forEach(a => a.classList.remove('active'));
    document.querySelector('#schemeBtn').textContent = e.target.textContent;
    e.target.classList.add('active');
    schemeMode = e.target.textContent.toLowerCase();
  }

  if (e.target.classList.contains('main__col')) {
    copy(e.target.dataset.bcg);
    alert(`copied to the clipboard - ${e.target.dataset.bcg}`)
  }

  if (e.target.classList.contains('footer__col')) {
    copy(e.target.textContent);
    alert(`copied to the clipboard - ${e.target.textContent}`)
  }

}



