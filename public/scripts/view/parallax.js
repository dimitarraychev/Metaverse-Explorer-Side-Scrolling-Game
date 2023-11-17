let xValue = 0;
let yValue = 0;

let element;

export function attachParalax(el) {
    window.addEventListener('mousemove', parallax);
    element = el;
}

export function removeParalax() {
    window.removeEventListener('mousemove', parallax);
}

function parallax(e) {
    const legend = document.querySelector(element);

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    legend.style.transform = `translateX(calc(-50% + ${-xValue * 0.001}rem)) translateY(${-yValue * 0.001}rem)`;
    legend.style.boxShadow = `0.1rem 0.1rem 0.3rem #090979, -0.1rem -0.1rem 0.3rem #090979, ${-xValue * 0.002}rem ${-yValue * 0.002}rem 1rem #003B00`;
}