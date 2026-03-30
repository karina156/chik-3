showAndHidePlaylists()

function showAndHidePlaylists() {
    let obloshki = document.querySelectorAll('.obloshka')
    let obloshkiMini = document.querySelectorAll('.obloshka-mini')

    obloshkiMini.forEach((obloshkaMini) => {
        obloshkaMini.addEventListener('click', () => {
            obloshki.forEach((obloshka) => {
                obloshka.classList.add('none')
            })
            obloshkiMini.forEach((all) => {
                all.classList.remove('none')
            })

            obloshkaMini.classList.add('none')
            obloshkaMini.previousElementSibling.classList.remove('none')
        })
    })
}

const likeButtons = document.querySelectorAll('.likeBtn');

likeButtons.forEach((likeBtn) => {
    let liked = false;

    likeBtn.addEventListener('click', function () {
        liked = !liked;

        if (liked) {
            likeBtn.src = '../chik-3/images/like-fill.svg';
        } else {
            likeBtn.src = '../chik-3/images/like.svg';
        }
    });
});

function playMusic() {
    let playlists = document.querySelectorAll(
        '.playlist_2, .playlist_3, .playlist_4, .playlist_5, .playlist_6, .playlist_7, .playlist_8'
    );

    playlists.forEach((playlist) => {
        let btnObloshka = playlist.querySelector('.btn-obloshka');
        let playBtn = playlist.querySelector('.playBtn');
        let audioPlayer = playlist.querySelector('.audioPlayer');

        if (!btnObloshka || !playBtn || !audioPlayer) return;

        btnObloshka.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.src = '../chik-3/images/Pause.svg';
            } else {
                audioPlayer.pause();
                playBtn.src = '../chik-3/images/Play.svg';
            }
        });

        audioPlayer.addEventListener('ended', () => {
            playBtn.src = '../chik-3/images/Play.svg';
        });
    });
}

playMusic();


document.getElementById('btn_1').addEventListener('click', () => {
    document.getElementById('playlists').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn_2').addEventListener('click', () => {
    document.getElementById('artists').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn_3').addEventListener('click', () => {
    document.getElementById('create').scrollIntoView({ behavior: 'smooth' });
});

function animateNumbers() {
    let values = document.querySelectorAll('.value')

    values.forEach((value, index) => {
        let number = 10 + index * 15
        let direction = 1
        let speed = 40 + index * 20

        setInterval(() => {
            number += direction

            if (number >= 90 || number <= 10) {
                direction = direction * -1
            }

            value.textContent = number
        }, speed)
    })
}

animateNumbers()

function makeSliders() {
    let sliders = document.querySelectorAll('.sint-line');

    sliders.forEach((slider, index) => {
        let track = slider.querySelector('.track');
        let thumb = slider.querySelector('.thumb');
        let value = slider.querySelector('.line-value');

        let min = 10;
        let max = 90;

        let isDragging = false;
        let progress = 0.2 + index * 0.15; // стартовая позиция
        let direction = 1;
        let speed = 0.003 + index * 0.0015;

        function render() {
            let trackRect = track.getBoundingClientRect();
            let x = progress * trackRect.width;

            thumb.style.left = `calc(10% + ${x}px)`;

            let number = Math.round(min + progress * (max - min));
            value.textContent = number;
        }

        function setByClientX(clientX) {
            let trackRect = track.getBoundingClientRect();
            let x = clientX - trackRect.left;

            if (x < 0) x = 0;
            if (x > trackRect.width) x = trackRect.width;

            progress = x / trackRect.width;
            render();
        }

        function animate() {
            if (!isDragging) {
                progress += speed * direction;

                if (progress >= 1) {
                    progress = 1;
                    direction = -1;
                }

                if (progress <= 0) {
                    progress = 0;
                    direction = 1;
                }

                render();
            }

            requestAnimationFrame(animate);
        }

        thumb.addEventListener('mousedown', () => {
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setByClientX(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        track.addEventListener('click', (e) => {
            setByClientX(e.clientX);
        });

        render();
        requestAnimationFrame(animate);
    });
}

makeSliders();


function playArtistsMusic() {
    let artistCards = document.querySelectorAll('.artist-card');

    artistCards.forEach((card) => {
        let playBtn = card.querySelector('.playBtn');
        let audioPlayer = card.querySelector('.audioPlayer');

        if (!playBtn || !audioPlayer) return;

        playBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                document.querySelectorAll('.audioPlayer').forEach((audio) => {
                    audio.pause();
                    audio.currentTime = 0;
                });

                document.querySelectorAll('.playBtn').forEach((btn) => {
                    btn.src = '../chik-3/images/Play.svg';
                });

                audioPlayer.play();
                playBtn.src = '../chik-3/images/Pause.svg';
            } else {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                playBtn.src = '../chik-3/images/Play.svg';
            }
        });

        audioPlayer.addEventListener('ended', () => {
            playBtn.src = '../chik-3/images/Play.svg';
        });
    });
}

playArtistsMusic();

showAndHideArtists()
searchArtists()

function showAndHideArtists() {
    let screen1 = document.querySelector('.ekran-artists')
    let screen2 = document.querySelector('.ekran-artists-2')
    let refreshBtns = document.querySelectorAll('.artists-refresh')

    refreshBtns.forEach((refreshBtn) => {
        refreshBtn.addEventListener('click', () => {
            if (screen1.classList.contains('none')) {
                screen1.classList.remove('none')
                screen2.classList.add('none')
            } else {
                screen1.classList.add('none')
                screen2.classList.remove('none')
            }
        })
    })
}

function searchArtists() {
    let searchBlocks = document.querySelectorAll('.artists-search')

    searchBlocks.forEach((searchBlock) => {
        let searchBtn = searchBlock.querySelector('.searchBtn')

        let message = document.createElement('p')
        message.classList.add('search-message')
        message.textContent = ''
        searchBlock.after(message)

        searchBtn.addEventListener('click', () => {
            message.textContent = 'Такой артист не был найден'
        })
    })
}

function playPlaylistMusic() {
    let tracks = document.querySelectorAll('.playlist-track');

    tracks.forEach((track) => {
        let playBtn = track.querySelector('.playBtn');
        let audioPlayer = track.querySelector('.audioPlayer');

        if (!playBtn || !audioPlayer) return;

        playBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                document.querySelectorAll('.audioPlayer').forEach((audio) => {
                    audio.pause();
                    audio.currentTime = 0;
                });

                document.querySelectorAll('.playBtn').forEach((btn) => {
                    btn.src = '../chik-3/images/Play.svg';
                });

                audioPlayer.play();
                playBtn.src = '../chik-3/images/Pause.svg';
            } else {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                playBtn.src = '../chik-3/images/Play.svg';
            }
        });

        audioPlayer.addEventListener('ended', () => {
            playBtn.src = '../chik-3/images/Play.svg';
        });
    });
}

playPlaylistMusic();