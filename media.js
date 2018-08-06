var participante = false
var pista = document.getElementById('pista')
var progress = document.getElementById('progress')
var titulo = document.getElementById('titulo')
var artista = document.getElementById('artista')
var imagen = document.getElementById('imagen')
var handler = document.getElementById('handler')
var current_track = 0
var cancion, audio, duration
var canciones_html = ''

var canciones = [
    {
        imagen: 'https://i.kfs.io/album/tw/1570670,0v1/fit/500x500.jpg',
        titulo: 'You and Me',
        artista: 'Disclosure (Flume remix)',
        audio: 'Disclosure.mp3'
    },
    {
        imagen: 'https://pm1.narvii.com/6685/d9633331e3d31d5314e6139ac107254af15c3a60_hq.jpg',
        titulo: 'Scared to be lonely',
        artista: 'Martin Garrix & Dua Lipa',
        audio: 'ScaredToBeLonely.mp3'
    },
    {
        imagen: 'http://files.jenesaispop.com/wp-content/uploads/2018/04/calvin-harris_dua-lipa_one-kiss.jpg',
        titulo: 'One kiss',
        artista: 'Calvin Harris, Dua Lipa',
        audio: 'OneKiss.mp3'
    },
    {
        imagen: 'https://d2tml28x3t0b85.cloudfront.net/tracks/artworks/000/471/669/original/9dc1e0.jpeg?1488630979',
        titulo: 'Numb',
        artista: 'Linkin Park',
        audio: 'Numb.mp3'
    },
    {
        imagen: 'https://s.mxmcdn.net/images-storage/albums4/4/6/9/9/3/7/36739964_800_800.jpg',
        titulo: 'Anyway',
        artista: 'Francis Davila',
        audio: 'Anyway.mp3'
    },
    {
        imagen: 'https://songtexte.co/Images/Artists/twenty-one-pilots-songtexte-lyrics-b9e3e0.jpg',
        titulo: "Nico And The Niners",
        artista: 'Twenty One Pilots',
        audio: 'Niners.mp3'
    },
    {
        imagen: 'https://s3.amazonaws.com/beatstarsdata/b.user.data/y/yuval1999-244505/gfx/cover-artwork/904470_med_.jpg',
        titulo: 'Rockstar',
        artista: 'Post Malone',
        audio: 'rockstar.mp3'
    },
    {
        imagen: 'https://dancecentral.com.au/wp-content/uploads/2017/08/20155914_1473121179421946_2467788771756446_n.jpg',
        titulo: 'Humble',
        artista: 'Kendrick Lamar',
        audio: 'HUMBLE.mp3'
    },
    {
        imagen: 'http://hiphopog.com/wp-content/uploads/2015/12/1449500666_d3bc785021bb09d132ad6a8b91ea87f6.jpg',
        titulo: 'White Iverson',
        artista: 'Post Malone',
        audio: 'White_Iverson.mp3'
    },
]

$(document).ready(function () {
    $.each(canciones, function (index) {
        canciones_html += '<li class="list-group-item d-flex justify-content-between align-items-center" onclick="CancionSelect(' + index + ')">'
        canciones_html += '<blockquote class="blockquote">'
        canciones_html += '<h5>' + canciones[index].titulo + '</h5>'
        canciones_html += '<footer class="blockquote-footer">' + canciones[index].artista + '</footer>'
        canciones_html += '</blockquote>'
        canciones_html += '<h3><i id="play' + index + '" class="fas fa-play-circle"></i></h3>'
        canciones_html += '</li>'
    })
    $('#contenido').html(canciones_html)
    init()
})

function CancionSelect(id) {
    current_track = id
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        updateInfo();
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + id + '').removeClass('fa-play-circle')
        $('#play' + id + '').addClass('fa-pause-circle')
        audio.addEventListener('timeupdate', initProgressBar, false);
    }
}

function init() {
    cancion = canciones[current_track]
    audio = new Audio()
    imagen.src = cancion.imagen
    audio.src = cancion.audio
    titulo.textContent = cancion.titulo
    artista.textContent = cancion.artista
}

function playTrack() {
    if ($('#play').hasClass('fa-pause-circle')) {
        $('#play').removeClass('fa-pause-circle')
        $('#play').addClass('fa-play-circle')
        $('#play' + current_track + '').removeClass('fa-pause-circle')
        $('#play' + current_track + '').addClass('fa-play-circle')
        audio.pause()
    } else {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        audio.play()
        audio.addEventListener('timeupdate', initProgressBar, false);
    }
}

function nextTrack() {
    current_track++;
    current_track = current_track % (canciones.length);
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (canciones.length - 1) : current_track);
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        updateInfo();
    }
}

function updateInfo() {
    titulo.textContent = cancion.titulo;
    artista.textContent = cancion.artista;
    imagen.src = cancion.imagen;
    imagen.onload = function () {
        audio.play();
    }
}

function initProgressBar() {
    var length = audio.duration
    var current_time = audio.currentTime

    var totalLength = calculateTotalValue(length)
    $('#end-time').html(totalLength)

    var currentTime = calculateCurrentValue(current_time)
    $('#start-time').html(currentTime)

    progress.value = (audio.currentTime / audio.duration);
    progress.addEventListener("click", seek);

    function seek(event) {
        var percent = event.offsetX / this.offsetWidth;
        audio.currentTime = percent * audio.duration;
        progress.value = percent / 100;
    }

}

function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}