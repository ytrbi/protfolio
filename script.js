// import gsap from 'gsap';


window.onmousemove = (e) => {
    let winPercent = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        distFromCenter = 1 - Math.abs((e.clientX - window.innerWidth / 2) / window.innerWidth * 2);
    
    gsap.timeline({ defaults: { duration: 0.5, overwrite: 'auto' } })
        .to('.card', { rotation: -7 + 9 * winPercent.x }, 0)
        .to('.fillLight', { opacity: distFromCenter }, 0)  
        .to('.bg', { x: 100 - 200 * winPercent.x, y: 20 - 40 * winPercent.y }, 0)
        .to('.navbar', { opacity: distFromCenter }, 0);  
};

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const closeMenu = document.querySelector(".close-menu");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    closeMenu.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


let roles = ['Full-stack developer', 'Web developer', 'Software Engineer', 'UX/UI Designer'];
let roleIndex = 0;
let currentRole = '';
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const writeElement = document.getElementsByClassName('write-effect')[0];
    
    if (isDeleting) {
        currentRole = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentRole = roles[roleIndex].substring(0, charIndex + 1);
        charIndex++;
    }

    writeElement.innerHTML = currentRole;

    if (!isDeleting && charIndex === roles[roleIndex].length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; 
    }

    const speed = isDeleting ? 100 : 150; 
    setTimeout(typeEffect, speed);
}

typeEffect();

// document.addEventListener('mousemove', (e) => {
//     gsap.to(cursorGif, {
//         left: e.pageX,
//         top: e.pageY,
//         duration: 0.5
//     });
// });


const cursorGif = document.getElementById('cursor-gif');

// Display the active cursor image initially
cursorGif.src = './assets/img/cursor-active.gif'; // The active cursor image
cursorGif.style.display = 'block';

let inactivityTimer; // Timer for inactivity

window.addEventListener('mousemove', (e) => {
    // Reset the inactivity timer on mouse movement
    clearTimeout(inactivityTimer);

    cursorGif.style.left = e.pageX + 'px';
    cursorGif.style.top = e.pageY + 'px';

    cursorGif.src = './assests/img/duck-ducky.gif'; // Active cursor image
    cursorGif.style.display = 'block';

    // Start the inactivity timer
    inactivityTimer = setTimeout(() => {
        cursorGif.src = './assests/img/rubber-duck.gif'; // Inactive cursor image
    }, 3000); // 3000 milliseconds = 3 seconds
});

window.addEventListener('mouseenter', () => {
    cursorGif.style.display = 'block';
});

window.addEventListener('mouseleave', () => {
    cursorGif.style.display = 'none';
});


window.addEventListener("scroll", () => {
    console.log(cursorGif.style.display); 
}, false);

window.addEventListener("scroll", () => {
    const scrollPercentage = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    document.body.style.setProperty("--scroll", scrollPercentage);
    
    const scrollAnimateElement = document.querySelector('.scroll-animate');
    if (scrollPercentage > 0) {
        scrollAnimateElement.style.animationPlayState = 'running'; 
    } else {
        scrollAnimateElement.style.animationPlayState = 'paused'; 
    }
}, false);


document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    const observerOptions = {
        root: null, 
        threshold: 0.1 
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute("data-level");
                const progress = bar.querySelector(".progress");
                progress.style.width = level + "%"; 
                observer.unobserve(bar); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});

function playSound() {
    const nameInArabic = "يارا تركي الحربي"; 
    
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(nameInArabic);
        utterance.lang = 'ar-SA'; 
        utterance.rate = 1; 
        utterance.pitch = 1; 

        // Speak the name
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech synthesis is not supported in this browser.');
    }
}

if (window.canRunAds && window.isAdBlockActive) {
    console.log("Ad is hidden or blocked. Redirecting...");
    window.location.href = "https://github.com/ytrbi"; // Replace with your 404 page URL
}
