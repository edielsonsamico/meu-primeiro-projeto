let count = 0;
const counterElement = document.getElementById('counter-value');
const btnIncrement = document.getElementById('btn-increment');
const btnDecrement = document.getElementById('btn-decrement');
const clockElement = document.getElementById('clock');

btnIncrement.addEventListener('click', () => {
    count++;
    counterElement.textContent = count;
});

btnDecrement.addEventListener('click', () => {
    count--;
    counterElement.textContent = count;
});

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR');
    clockElement.textContent = `Horário Local: ${timeString}`;
}

setInterval(updateClock, 1000);
updateClock();
