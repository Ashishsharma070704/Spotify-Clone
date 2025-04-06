// Initialize the Variables
        let songIndex = 0;
        let audioElement = new Audio();
        let masterPlay = document.getElementById('masterPlay');
        let myProgressBar = document.getElementById('myProgressBar');
        let gif = document.getElementById('gif');
        let masterSongName = document.getElementById('masterSongName');
        let songItemContainer = document.querySelector('.songItemContainer');
        
        let songs = [
            {songName: "G.O.A.T- Diljit Dosanjh", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg", duration: "05:34"},
            {songName: "Desi Kalakaar- Honey singh", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg", duration: "03:45"},
            {songName: "Antidote- Karan Aujla", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg", duration: "04:12"},
            {songName: "Jalalo Bilalo- Coke Studio", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg", duration: "06:22"},
            {songName: "Choo Lo- The Local Train", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg", duration: "04:38"},
            {songName: "Perfect- Ed Sheeran", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg", duration: "04:40"},
            {songName: "With You- AP Dhilon", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg", duration: "03:15"},  
            {songName: "Tension - Diljit Dosanjh", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg", duration: "03:30"}
        ];

        // Generate song items dynamically
        songs.forEach((song, index) => {
            let songItem = document.createElement('div');
            songItem.className = 'songItem';
            songItem.innerHTML = `
                <img src="${song.coverPath}" alt="${song.songName}" class="song1Image">
                <span class="songName">${song.songName}</span>
                <span class="songlistplay">
                    <span class="timestamp">${song.duration} 
                        <i id="${index}" class="far fa-play-circle songItemPlay"></i>
                    </span>
                </span>
            `;
            songItemContainer.appendChild(songItem);
        });

        // Handle play/pause click
        masterPlay.addEventListener('click', () => {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                if (!audioElement.src) {
                    // If no song selected, play first song
                    songIndex = 0;
                    audioElement.src = songs[songIndex].filePath;
                    masterSongName.innerText = songs[songIndex].songName;
                }
                audioElement.play()
                    .then(() => {
                        masterPlay.classList.remove('fa-play-circle');
                        masterPlay.classList.add('fa-pause-circle');
                        gif.style.opacity = 1;
                    })
                    .catch(error => {
                        console.error("Playback failed:", error);
                    });
            } else {
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        });

        // Listen to timeupdate events
        audioElement.addEventListener('timeupdate', () => {
            // Update Seekbar
            let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myProgressBar.value = progress;
        });

        myProgressBar.addEventListener('change', () => {
            audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
        });

        const makeAllPlays = () => {
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            });
        };

        // Handle song item clicks
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.addEventListener('click', (e) => {
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = songs[songIndex].filePath;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play()
                    .then(() => {
                        gif.style.opacity = 1;
                        masterPlay.classList.remove('fa-play-circle');
                        masterPlay.classList.add('fa-pause-circle');
                    })
                    .catch(error => {
                        console.error("Playback failed:", error);
                    });
            });
        });

        // Handle when song ends
        audioElement.addEventListener('ended', () => {
            // Play next song or stop
            songIndex = (songIndex + 1) % songs.length;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            makeAllPlays();
            document.getElementById(songIndex).classList.remove('fa-play-circle');
            document.getElementById(songIndex).classList.add('fa-pause-circle');
        });

        document.getElementById('previous').addEventListener('click', () => {
            songIndex = (songIndex - 1 + songs.length) % songs.length;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play()
                .then(() => {
                    makeAllPlays();
                    document.getElementById(songIndex).classList.remove('fa-play-circle');
                    document.getElementById(songIndex).classList.add('fa-pause-circle');
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                })
                .catch(error => {
                    console.error("Previous button playback failed:", error);
                });
        });
        
        document.getElementById('next').addEventListener('click', () => {
            songIndex = (songIndex + 1) % songs.length;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play()
                .then(() => {
                    makeAllPlays();
                    document.getElementById(songIndex).classList.remove('fa-play-circle');
                    document.getElementById(songIndex).classList.add('fa-pause-circle');
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                })
                .catch(error => {
                    console.error("Next button playback failed:", error);
                });
        });
        