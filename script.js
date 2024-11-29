// Store YouTube player objects
let players = {};

// YouTube video IDs from your provided URLs
const videoIds = {
    1: 'Ed1sGgHUo88',  // First video
    2: 'yizNNby1nfY',  // Second video
    3: 'G0eKzU_fV00',  // Third video
    4: 'rFm8jnvSy7Q'   // Fourth video
};

// Initialize YouTube API
function onYouTubeIframeAPIReady() {
    // Create players for each video container
    for (let i = 1; i <= 4; i++) {
        players[i] = new YT.Player(`player${i}`, {
            height: '100%',
            width: '100%',
            videoId: videoIds[i],
            playerVars: {
                'playsinline': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// Handle player state changes
function onPlayerStateChange(event) {
    const playerNumber = Object.keys(players).find(key => players[key] === event.target);
    const button = $(`.play-pause[data-player="${playerNumber}"]`);
    
    if (event.data === YT.PlayerState.PLAYING) {
        button.html('<i class="fas fa-pause"></i>');
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        button.html('<i class="fas fa-play"></i>');
    }
}

// Wait for DOM to be ready
$(document).ready(function() {
    // Individual video controls
    $('.play-pause').click(function() {
        const playerNumber = $(this).data('player');
        const player = players[playerNumber];
        
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
            $(this).html('<i class="fas fa-play"></i>');
        } else {
            player.playVideo();
            $(this).html('<i class="fas fa-pause"></i>');
        }
    });

    // Global controls
    $('#playAllBtn').click(function() {
        Object.values(players).forEach(player => {
            player.playVideo();
        });
        $('.play-pause').html('<i class="fas fa-pause"></i>');
    });

    $('#pauseAllBtn').click(function() {
        Object.values(players).forEach(player => {
            player.pauseVideo();
        });
        $('.play-pause').html('<i class="fas fa-play"></i>');
    });
});