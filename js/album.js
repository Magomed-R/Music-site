let search = new URLSearchParams(window.location.search);
let index = search.get(`i`);

document.querySelector(`.main__info`).innerHTML = `
<div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${playlists[index][1]}" class="img-fluid rounded-start" alt="Обложка альбома" />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${playlists[index][0]}</h5>
                <p class="card-text description">${playlists[index][2]}</p>
                <p class="card-text"><small class="text-muted">Создан в ${playlists[index][3]} году</small></p>
            </div>
        </div>
    </div>
</div>`;

for (let i = 0; i < album[index].length; i++) {
    document.querySelector(`.list-group`).innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center gap-5"><audio class="audio" src="${album[index][i].src}"></audio><div class="d-flex justify-content-start align-items-center gap-2"><span class="number opacity-50">${i + 1} </span> <img src="assets/play.png" class="play-img" alt="иконка проигрывания"><span class="d-flex flex-column track-info"><span class="track-title">${album[index][i].title}</span><small class="track-description opacity-50">${album[index][i].autor}</small></span></div><span class="d-flex gap-5 align-items-center"><div class="progress w-25px opacity-0"><div class="progress-bar w-0" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div><span class="music-time">${album[index][i].time}</span></span></li>`;
}

let condition = false;
let prevAudio;
let prevImg;
let prevScale;
let prevTrackInfo;
let a = 0;

document.querySelectorAll(`.list-group-item`).forEach((track) => {
    track.addEventListener(`click`, function () {
        let audio = track.querySelector(`.audio`);
        let playImg = track.querySelector(`.play-img`);
        let trackInfo = track.querySelector(`.track-info`)
        let progressScale = track.querySelector(`.progress-bar`);
        let progress = track.querySelector(`.progress`);
        if (!a) {
            a++;
            audio.play();
            playImg.src = `assets/stop.png`;
            prevAudio = audio;
            prevImg = playImg;
            condition = true;
            progress.classList.remove(`opacity-0`);
            prevScale = progress;
        } else {
            if (prevAudio == audio) {
                audio.pause();
                playImg.src = `assets/play.png`;
                a--;
                condition == false;
            } else {
                prevAudio.pause();
                prevAudio.currentTime = 0;
                prevImg.src = `assets/play.png`;
                prevAudio = audio;
                prevImg = playImg;
                audio.play();
                playImg.src = `assets/stop.png`;
                condition == true;
                prevScale.classList.add(`opacity-0`);
                prevScale = progress;
                progress.classList.remove(`opacity-0`);
            }
        }
        function updateProgress() {
            // Нарисовать актуальное время
            let min = 0;
            let sec = Math.trunc(audio.currentTime);
            let nol = ``;
            if (Math.trunc(audio.currentTime) > 299) {
                min += 5;
                sec -= 300;
            } else if (Math.trunc(audio.currentTime) > 239) {
                min += 4;
                sec -= 240;
            } else if (Math.trunc(audio.currentTime) > 179) {
                min += 3;
                sec -= 180;
            } else if (Math.trunc(audio.currentTime) > 119) {
                min += 2;
                sec -= 120;
            } else if (Math.trunc(audio.currentTime) > 59) {
                min += 1;
                sec -= 60;
            } 
            if (sec < 10) {
                nol = 0;
            }
            track.querySelector(`.music-time`).innerHTML = `0${min}:${nol}${sec}`;
            progressScale.style.width = Math.trunc(audio.currentTime)/Math.trunc(audio.duration)*100 + `%`;
            // Нужно ли вызвать её ещё раз?
            if (condition) {
                requestAnimationFrame(updateProgress);
            }
        }
        updateProgress();
    });
});
