let intervalId;
let slider;
let time;
export function create(imgs){
    const container = document.createElement("div");
    container.classList.add("slider-container");
    const dots = document.createElement("div");
    dots.classList.add("dots");
    imgs.forEach((img, i)=>{
        const div = document.createElement("div");
        div.classList.add("items", "fade");
        const image = document.createElement("img");
        image.src = img;
        div.append(image);
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset.id = i;
        dots.append(dot);
        container.append(div);
    })
    container.append(dots);
    const next = document.createElement("a");
    next.classList.add("next");
    next.innerHTML = "&#10095;";
    const prev = document.createElement("a");
    prev.classList.add("prev");
    prev.innerHTML = "&#10094;";
    container.append(next, prev);
    return container;
}
function select(){
    return {
        dots: document.querySelectorAll(".dot"),
        items: document.querySelectorAll(".items"),
        btns: document.querySelectorAll(".next, .prev")
    }
}
function showItems(n){
    console.log(slider);
    let index = n> slider.items.length -1 ? 0: n<0? slider.items.length-1: n;
    slider.items.forEach((item, i)=>{
        item.style.display = "none";
        slider.dots[i].classList.remove("active");
    })
    slider.items[index].style.display = "block";
    slider.dots[index].classList.add("active");
}
function currentItem(e){
    clearInterval(intervalId);
    let n = parseInt(e.target.dataset.id);
    showItems(n);
}
function changeItem(e){
    clearInterval(intervalId);
    let n = document.querySelector(".dot.active").dataset.id;
    if(e.target.classList.contains("next")){
        showItems(++n);
    }else{
        showItems(--n);
    }
    startInterval()
}
export default function init(timing = 3000){
    time = timing;
    slider = select();
    showItems(0);
    slider.dots.forEach(dot=>dot.addEventListener("pointerdown", currentItem));
    slider.btns.forEach(btn=>btn.addEventListener("pointerdown", changeItem));
    startInterval();
}
function startInterval() {
    clearInterval(intervalId)
    intervalId = setInterval(() => {
        changeItem({target: slider.btns[0]})
    }, time);
}