const dropArea = document.getElementById('dropArea');
const uploadBtn = document.getElementById('uploadBtn');
const imageList = document.getElementById('imageList');

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  handleFiles(files);
});

uploadBtn.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.jpeg, .jpg, .png';
  fileInput.multiple = true;
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
});

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgData = reader.result;
        const img = document.createElement('img');
        img.src = imgData;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${imgData}">
          <span>${file.name} (${file.type})</span>
          <button class="close-btn">X</button>
        `;

        listItem.querySelector('.close-btn').addEventListener('click', () => {
          listItem.remove();
        });

        imageList.appendChild(listItem);
      };
    }
  }
}