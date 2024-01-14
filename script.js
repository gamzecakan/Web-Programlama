//LOGIN REGİSTER
function loginUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    alert("Login succesful!");
    window.location.replace("index.html");
    return false; 
}
function registerUser() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var birthdate = document.getElementById("birthdate").value;
    var phone = document.getElementById("phone").value;
    var gender = document.getElementById("gender").value;
    var password = document.getElementById("password").value;

    alert("Register succesful!");
    window.location.replace("index.html");
    return false; 
}

//SLIDER KISMI

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let count = 0;

    function nextSlide() {
        count++;
        if (count >= slider.children.length ) {
            count = 0;
        }
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(${-count * 100}%)`;
    }

    setInterval(nextSlide, 2500); // (örneğin, her 2,5  saniyede bir)
});

//RATING KISMI

function submitRating(rating) {
    alert("Thanks! " + rating +  " star rating has been given.");
}

//API KISMI
const videoSection = document.querySelector("section");
const loaderBox = document.querySelector('.loader-box');
loaderBox.style.display = 'none';

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UUIdSX1H7ZBCpr8FS7DOnmVA&key=AIzaSyAc1yWotBqRfPrMNFopjcdRCYJesxGl0S8')
    .then(res => {
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('API Response:', data); // 
        data.items.forEach(el => {
            const thumbnailUrl = el.snippet.thumbnails.maxres?.url || ''; //kontrol için
            const videoUrl = `https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}`;
            const videoTitle = el.snippet.title;

            if (thumbnailUrl) {
                videoSection.innerHTML += `
                    <a target="_blank" href="${videoUrl}" class="yt-video">
                        <img src="${thumbnailUrl}" />
                        <h3>${videoTitle}</h3>
                    </a>`;
            } else {
                console.warn(`Thumbnail URL not available for video: ${videoTitle}`);
                    }
        });
    })
    .catch(err => {
        console.error('API Request Error:', err);
        videoSection.innerHTML = `<h3>Sorry, something went wrong. Please try again later. (${err.message || 'Unknown error'})</h3>`;
    });
