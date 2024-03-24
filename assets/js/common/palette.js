function getRandomColor() {
  const colors = [
    '89, 167, 114', //
    '121, 60, 249', //
    '80, 74, 188', //
    '205, 114 ,114', //
    '143, 160, 176', //
  ];
  const currentIndex = colors.indexOf(getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim());
  let randomIndex = Math.floor(Math.random() * colors.length);
  // 현재 적용 중인 색상과 같은 인덱스면 다시 랜덤 선택
  while (randomIndex === currentIndex) {
    randomIndex = Math.floor(Math.random() * colors.length);
  }
  return colors[randomIndex];
}

function changeColor() {
  const newColor = getRandomColor();
  document.documentElement.style.setProperty('--main-color', newColor);
}
