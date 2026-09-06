/* ==================================================
   THEODORE
   ROMANTIC NETFLIX EXPERIENCE
================================================== */


/* ==================================================
   YOUR CHAPTERS
================================================== */

const chapters = [

    {
        video: "videos/intro.mp4",

        title: "THE BEGINNING",

        description:
            "Every beautiful story begins with a single moment."
    },


    {
        video: "videos/chapter1.mp4",

        title: "THAT SMILE",

        description:
            "Some smiles stay in your heart long after the moment is gone."
    },


    {
        video: "videos/chapter2.mp4",

        title: "LITTLE MOMENTS",

        description:
            "It was never about the big things. It was always the little moments."
    },


    {
        video: "videos/chapter3.mp4",

        title: "WITH YOU",

        description:
            "Somewhere between all those moments, you became my favorite part."
    },


    {
        video: "videos/chapter4.mp4",

        title: "US",

        description:
            "Some people simply feel like home."
    },


    {
        video: "videos/chapter5.mp4",

        title: "FOREVER",

        description:
            "And if I could choose again, I would still choose you."
    }

];


/* ==================================================
   ELEMENTS
================================================== */

const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );

const loadingProgress =
    document.getElementById(
        "loadingProgress"
    );

const introScreen =
    document.getElementById(
        "introScreen"
    );

const enterButton =
    document.getElementById(
        "enterButton"
    );

const mainExperience =
    document.getElementById(
        "mainExperience"
    );

const heroVideo =
    document.getElementById(
        "heroVideo"
    );

const episodeNumber =
    document.getElementById(
        "episodeNumber"
    );

const episodeTitle =
    document.getElementById(
        "episodeTitle"
    );

const episodeDescription =
    document.getElementById(
        "episodeDescription"
    );

const playButton =
    document.getElementById(
        "playButton"
    );

const pauseButton =
    document.getElementById(
        "pauseButton"
    );

const muteButton =
    document.getElementById(
        "muteButton"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const timeline =
    document.getElementById(
        "timeline"
    );

const timelineProgress =
    document.getElementById(
        "timelineProgress"
    );

const time =
    document.getElementById(
        "time"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const nextCardButton =
    document.getElementById(
        "nextCardButton"
    );

const nextChapterTitle =
    document.getElementById(
        "nextChapterTitle"
    );

const chaptersButton =
    document.getElementById(
        "chaptersButton"
    );

const chapterPanel =
    document.getElementById(
        "chapterPanel"
    );

const closePanel =
    document.getElementById(
        "closePanel"
    );

const chapterList =
    document.getElementById(
        "chapterList"
    );

const fullscreenButton =
    document.getElementById(
        "fullscreenButton"
    );

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );

const endingScreen =
    document.getElementById(
        "endingScreen"
    );

const replayButton =
    document.getElementById(
        "replayButton"
    );


/* ==================================================
   VARIABLES
================================================== */

let currentChapter = 0;

let musicPlaying = false;


/* ==================================================
   LOADING ANIMATION
================================================== */

let loading = 0;


const loadingTimer =
    setInterval(() => {


        loading += 5;


        loadingProgress.style.width =
            loading + "%";


        if (loading >= 100) {


            clearInterval(
                loadingTimer
            );


            setTimeout(() => {


                loadingScreen.style.opacity =
                    "0";


                setTimeout(() => {

                    loadingScreen.style.display =
                        "none";

                }, 1000);


            }, 300);

        }


    }, 70);


/* ==================================================
   LOAD CHAPTER
================================================== */

function loadChapter(index) {


    if (
        index < 0 ||
        index >= chapters.length
    ) {

        return;

    }


    currentChapter = index;


    const chapter =
        chapters[currentChapter];


    /* Fade video */

    heroVideo.classList.add(
        "changing"
    );


    setTimeout(() => {


        heroVideo.src =
            chapter.video;


        heroVideo.load();


        heroVideo.play()
            .then(() => {

                pauseButton.textContent =
                    "❚❚";

                playButton.innerHTML =
                    "❚❚ <span>Pause</span>";

            })
            .catch(() => {

                pauseButton.textContent =
                    "▶";

                playButton.innerHTML =
                    "▶ <span>Play</span>";

            });


        heroVideo.classList.remove(
            "changing"
        );


    }, 700);


    /* Episode */

    episodeNumber.textContent =
        `EPISODE ${String(currentChapter + 1).padStart(2, "0")}`;


    /* Title */

    episodeTitle.textContent =
        chapter.title;


    /* Description */

    episodeDescription.textContent =
        chapter.description;


    /* Next chapter */

    if (
        currentChapter <
        chapters.length - 1
    ) {

        nextChapterTitle.textContent =
            chapters[
                currentChapter + 1
            ].title;

    } else {

        nextChapterTitle.textContent =
            "THE END";

    }


    updateChapterList();

}


/* ==================================================
   ENTER
================================================== */

enterButton.addEventListener(
    "click",
    async () => {


        introScreen.style.opacity =
            "0";


        setTimeout(() => {


            introScreen.classList.add(
                "hidden"
            );


            mainExperience.classList.remove(
                "hidden"
            );


        }, 900);


        loadChapter(0);


        /* Music */

        backgroundMusic.volume =
            0.3;


        try {

            await backgroundMusic.play();

            musicPlaying = true;

            musicButton.textContent =
                "♫";

        } catch {

            musicPlaying = false;

        }

    }
);


/* ==================================================
   PLAY / PAUSE
================================================== */

function togglePlay() {


    if (
        heroVideo.paused
    ) {


        heroVideo.play();


        pauseButton.textContent =
            "❚❚";


        playButton.innerHTML =
            "❚❚ <span>Pause</span>";


    } else {


        heroVideo.pause();


        pauseButton.textContent =
            "▶";


        playButton.innerHTML =
            "▶ <span>Play</span>";

    }

}


playButton.addEventListener(
    "click",
    togglePlay
);


pauseButton.addEventListener(
    "click",
    togglePlay
);


/* ==================================================
   NEXT
================================================== */

function nextChapter() {


    if (
        currentChapter <
        chapters.length - 1
    ) {


        loadChapter(
            currentChapter + 1
        );


    } else {


        showEnding();

    }

}


nextButton.addEventListener(
    "click",
    nextChapter
);


nextCardButton.addEventListener(
    "click",
    nextChapter
);


/* ==================================================
   MUTE
================================================== */

muteButton.addEventListener(
    "click",
    () => {


        heroVideo.muted =
            !heroVideo.muted;


        muteButton.textContent =
            heroVideo.muted
                ? "🔇"
                : "🔊";

    }
);


/* ==================================================
   MUSIC
================================================== */

musicButton.addEventListener(
    "click",
    async () => {


        if (musicPlaying) {


            backgroundMusic.pause();


            musicPlaying = false;


            musicButton.textContent =
                "🔇";


        } else {


            try {


                await backgroundMusic.play();


                musicPlaying = true;


                musicButton.textContent =
                    "♫";


            } catch {


                console.log(
                    "Music playback blocked."
                );

            }

        }

    }
);


/* ==================================================
   VIDEO PROGRESS
================================================== */

heroVideo.addEventListener(
    "timeupdate",
    () => {


        if (!heroVideo.duration) {

            return;

        }


        const percentage =
            (
                heroVideo.currentTime /
                heroVideo.duration
            ) * 100;


        timelineProgress.style.width =
            percentage + "%";


        time.textContent =
            formatTime(
                heroVideo.currentTime
            )
            +
            " / "
            +
            formatTime(
                heroVideo.duration
            );

    }
);


/* ==================================================
   TIMELINE CLICK
================================================== */

timeline.addEventListener(
    "click",
    (event) => {


        if (!heroVideo.duration) {

            return;

        }


        const rect =
            timeline.getBoundingClientRect();


        const percentage =
            (
                event.clientX -
                rect.left
            )
            /
            rect.width;


        heroVideo.currentTime =
            percentage *
            heroVideo.duration;

    }
);


/* ==================================================
   FORMAT TIME
================================================== */

function formatTime(seconds) {


    if (
        !isFinite(seconds)
    ) {

        return "00:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsLeft =
        Math.floor(
            seconds % 60
        );


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secondsLeft)
            .padStart(2, "0")
    );

}


/* ==================================================
   FULLSCREEN
================================================== */

fullscreenButton.addEventListener(
    "click",
    () => {


        if (
            !document.fullscreenElement
        ) {


            mainExperience
                .requestFullscreen();


        } else {


            document.exitFullscreen();

        }

    }
);


/* ==================================================
   CHAPTER LIST
================================================== */

function updateChapterList() {


    chapterList.innerHTML = "";


    chapters.forEach(
        (chapter, index) => {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "chapter";


            if (
                index === currentChapter
            ) {

                item.classList.add(
                    "active"
                );

            }


            item.innerHTML = `

                <div class="chapter-number">

                    EPISODE
                    ${String(index + 1).padStart(2, "0")}

                </div>

                <div class="chapter-title">

                    ${chapter.title}

                </div>

            `;


            item.addEventListener(
                "click",
                () => {


                    loadChapter(index);


                    chapterPanel.classList.remove(
                        "open"
                    );

                }
            );


            chapterList.appendChild(
                item
            );

        }
    );

}


chaptersButton.addEventListener(
    "click",
    () => {

        chapterPanel.classList.add(
            "open"
        );

    }
);


closePanel.addEventListener(
    "click",
    () => {

        chapterPanel.classList.remove(
            "open"
        );

    }
);


/* ==================================================
   VIDEO ENDED
================================================== */

heroVideo.addEventListener(
    "ended",
    () => {

        pauseButton.textContent =
            "▶";

        playButton.innerHTML =
            "▶ <span>Replay</span>";

    }
);


/* ==================================================
   ENDING
================================================== */

function showEnding() {


    heroVideo.pause();


    mainExperience.classList.add(
        "hidden"
    );


    endingScreen.classList.remove(
        "hidden"
    );


}


/* ==================================================
   REPLAY
================================================== */

replayButton.addEventListener(
    "click",
    () => {


        endingScreen.classList.add(
            "hidden"
        );


        mainExperience.classList.remove(
            "hidden"
        );


        currentChapter = 0;


        loadChapter(0);


    }
);


/* ==================================================
   KEYBOARD CONTROLS
================================================== */

document.addEventListener(
    "keydown",
    (event) => {


        /* Space */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            togglePlay();

        }


        /* Right */

        if (
            event.key === "ArrowRight"
        ) {

            nextChapter();

        }


        /* Left */

        if (
            event.key === "ArrowLeft"
        ) {


            if (
                currentChapter > 0
            ) {

                loadChapter(
                    currentChapter - 1
                );

            }

        }


        /* Mute */

        if (
            event.key.toLowerCase() === "m"
        ) {

            muteButton.click();

        }


        /* Fullscreen */

        if (
            event.key.toLowerCase() === "f"
        ) {

            fullscreenButton.click();

        }


        /* Escape */

        if (
            event.key === "Escape"
        ) {

            chapterPanel.classList.remove(
                "open"
            );

        }

    }
);


/* ==================================================
   INITIALIZE
================================================== */

updateChapterList();