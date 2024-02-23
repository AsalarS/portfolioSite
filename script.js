const track = document.getElementById("imageCarousel")

window.onmousedown = e => {
    track.dataset.mousedownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mousedownAt = "0"
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mousedownAt == "0") return;

    const mouseDelta = parseFloat(track.dataset.mousedownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
    track.dataset.percentage = nextPercentage;

    track.style.transform = 'translate(${nextPercentage}%, -50%)';
}