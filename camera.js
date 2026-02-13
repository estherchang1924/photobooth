let photos = [];
let photosCount = 0;

const video = document.getElementById('video');
const captureBtn = document.getElementById('takepic');
const countdownEl = document.querySelector('.timer p');
const photosContainer = document.getElementById('photos');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    });

// When Capture button is clicked
captureBtn.addEventListener('click', () => {
    photos = [];
    photosCount = 0;
    startCountdown();
});

function startCountdown() {

    let count = 5;

    countdownEl.style.display = 'block';
    countdownEl.textContent = count;

    const countdown = setInterval(() => {

        count--;

        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(countdown);
            countdownEl.style.display = 'none';
            capturePhoto();
        }

    }, 1000);
}

function capturePhoto() {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip image
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');

    photos.push(dataURL);
    photosCount++;

    // Show preview on page
    const photodiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = dataURL;
    photodiv.appendChild(img);
    photosContainer.appendChild(photodiv);

    if (photosCount < 4) {
        setTimeout(() => {
            startCountdown();
        }, 1000);
    } else {
        finishSession();
    }
}

function finishSession() {
    localStorage.setItem("photoboothImages", JSON.stringify(photos));
    window.location.href = "gallery.html";
}