window.onload = function() {
  const $palette = document.getElementById("palette");
  const hex = "0123456789abcdef".split("");
  let $color;
  let colorNumber = [15,0,0];
  let order = [0,1,2];
  let color = "#f00";
  let translate = "translateX(-50%)";
  let oldSelect = 0;
  let select = 0;
  // let x = 0;
  // let oldX = 0;
  // let mouseDown = false;

  for(let i = 0; i < 16 * 8 - 7; i++) {
    const $box = document.createElement("div");
    $box.classList.add("box");
    $box.style.background = color;
    $box.innerHTML = color;
    $palette.appendChild($box);
    color = nextHex();
  }

  $color = document.querySelectorAll(".box");

  $color[0].classList.add("select");
  $color[1].classList.add("view");
  selectColor(0);

  document.addEventListener("mousewheel", e => {
    if(select !== oldSelect) return false;
    if(e.wheelDelta < 0) select++;
    if(e.wheelDelta > 0) select--;
    if(select < 0) select = $color.length - 1;
    if(select > $color.length - 1) select = 0;
    setTimeout(e => {oldSelect = select}, 50);
    selectColor(select);
  })

  document.addEventListener("click", e => {
    if(!hasClass(e.target, "box")) return false;
    if(select !== oldSelect) return false;
    select = getIdx(e.target)
    setTimeout(e => {oldSelect = select}, 500);
    selectColor(select);
  })

  // document.addEventListener("mousedown", e => {
  //   x = e.pageX;
  //   oldX = x;
  //   mouseDown = true;
  // })

  // document.addEventListener("mousemove", e => {
  //   if(mouseDown) {
  //     if(select !== oldSelect) return false;
  //     x = e.pageX;
  //     if(x < oldX) select++;
  //     if(x > oldX) select--;
  //     if(select < 0) select = $color.length - 1;
  //     if(select > $color.length - 1) select = 0;
  //     setTimeout(e => {oldSelect = select}, 100);
  //     selectColor(select);
  //     oldX = x;
  //   }
  // })

  // document.addEventListener("mouseup", e => {
  //   mouseDown = false;
  // })

  function selectColor(i) {
    let zIndex = 100;
    const $select = document.querySelector(".select");
    const $view = document.querySelectorAll(".view");
    $select.classList.remove("select");
    $view.forEach(i => i.classList.remove("view"));
    $color[i].style.zIndex = zIndex;
    $color[i].style.transform = `rotate(0deg) ${translate}`;
    $color[i].style.transition = "1s";
    $color[i].classList.add("select");
    for(let l = 1; l < 25; l++) {
      let transition
      if(l < 20) transition = "1s";
      else transition = "";
      if(i + l < $color.length) {
        $color[i + l].style.zIndex = zIndex - (l * 5);
        $color[i + l].style.transform = `rotate(${10 * l}deg) ${translate}`;
        $color[i + l].style.transition = transition;
        $color[i + l].classList.add("view");
      }else {
        $color[i + l - $color.length].style.zIndex = zIndex - (l * 5);
        $color[i + l - $color.length].style.transform = `rotate(${10 * l}deg) ${translate}`;
        $color[i + l - $color.length].style.transition = transition;
        $color[i + l - $color.length].classList.add("view");
      }
      if(i - l > -1) {
        $color[i - l].style.zIndex = zIndex - (l * 5);
        $color[i - l].style.transform = `rotate(${-10 * l}deg) ${translate}`;
        $color[i - l].style.transition = transition;
        $color[i - l].classList.add("view");
      }else {
        $color[i - l + $color.length].style.zIndex = zIndex - (l * 5);
        $color[i - l + $color.length].style.transform = `rotate(${-10 * l}deg) ${translate}`;
        $color[i - l + $color.length].style.transition = transition;
        $color[i - l + $color.length].classList.add("view");
      }
    }
    $color.forEach(i => {
      if(hasClass(i, "select") || hasClass(i, "view")) return;
      i.style.zIndex = 0;
      i.style.transform = `rotate(90deg) ${translate}`;
      i.style.transition = "";
    })
  }

  function nextHex() {
    let result = "#";
    if(colorNumber[order[0]] === 15 && colorNumber[order[1]] < 15) {
      colorNumber[order[1]]++;
    }else if(colorNumber[order[0]] > 0 && colorNumber[order[1]] === 15) {
      colorNumber[order[0]]--;
    }else if(colorNumber[order[1]] === 15 && colorNumber[order[2]] < 15) {
      colorNumber[order[2]]++;
    }else if(colorNumber[order[1]] > 0 && colorNumber[order[2]] === 15) {
      colorNumber[order[1]]--;
    }else if(order[0] === 0){
      order[0] = 2;
      order[2] = 0;
    }
    result += hex[colorNumber[0]];
    result += hex[colorNumber[1]];
    result += hex[colorNumber[2]];
    return result;
  }

  function getIdx(e) {
    let i = 0;
    while((e = e.previousSibling) !== null) i++;

    return i;
  }

  function hasClass(element, className) {
    return element.classList.contains(className);
  };
}