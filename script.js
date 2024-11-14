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

cursorGif.style.display = 'block';


window.addEventListener('mousemove', (e) => {
    
    cursorGif.style.left = e.pageX + 'px';
    cursorGif.style.top = e.pageY + 'px';
});


window.addEventListener('mouseenter', () => {
    cursorGif.style.display = 'block';
});

window.addEventListener('mouseleave', () => {
    cursorGif.style.display = 'none';
});

window.addEventListener("scroll", () => {
    console.log(cursorGif.style.display); // Check if the display property changes unexpectedly
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