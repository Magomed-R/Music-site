document.querySelector(`input`).addEventListener(`input`, function () {
  document.querySelectorAll(`.card-title`).forEach((card) => {
    if (card.innerHTML.toLocaleLowerCase().includes(document.querySelector(`input`).value.toLocaleLowerCase())) {
      card.closest(`.card`).classList.remove(`d-none`);
    } else {
      card.closest(`.card`).classList.add(`d-none`);
    }
  });
});

for (let i = 0; i < playlists.length; i++) {
  document.querySelector(`.group-of-cards`).innerHTML += `
    <a href="album.html?i=${i}" class="card" style="width: 18rem">
      <img src="${playlists[i][1]}" class="card-img-top" alt="Обложка альбома для рисования" />
      <div class="card-body">
        <p class="card-title fw-bold">${playlists[i][0]}</p>
      </div>
    </a>`;
}