// ########## Filters
let filters = document.querySelectorAll('ul li input'),
  saturate = document.getElementById('saturate'),
  contrast = document.getElementById('contrast'),
  brightness = document.getElementById('brightness'),
  sepia = document.getElementById('sepia'),
  grayscale = document.getElementById('grayscale'),
  blur = document.getElementById('blur'),
  hue = document.getElementById('hue'),
  // ############# buttons
  upload = document.getElementById('upload'),
  download = document.getElementById('download'),
  reset = document.querySelector('span'),
  img = document.getElementById('img'),
  imgBox = document.querySelector('.img-box'),
  // ############# Canvas
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');

window.onload = () => {
  download.style.display = 'none';
  reset.style.display = 'none';
};

upload.addEventListener('change', uploadImg);
reset.addEventListener('click', resetValue);
download.addEventListener('click', downloadImg);

function uploadImg() {
  resetValue();
  download.style.display = 'block';
  reset.style.display = 'block';
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const upload_Image = reader.result;
    img.src = upload_Image;
  });

  reader.readAsDataURL(this.files[0]);

  // ### Replace img with canvas
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = 'none';
  };
  // canvas.width = img.width;
  // canvas.height = img.height;
}

function resetValue() {
  ctx.filter = 'none';
  saturate.value = '100';
  contrast.value = '100';
  brightness.value = '100';
  sepia.value = '0';
  grayscale.value = '0';
  blur.value = '0';
  hue.value = '0';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function downloadImg() {
  download.href = canvas.toDataURL();
  // canvas.width = img.width;
  // canvas.height = img.height;
}

filters.forEach((filter) => {
  filter.addEventListener('input', () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hue.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});
