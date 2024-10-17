let searchBoxExists = false; 

document.querySelector('.search').addEventListener('click', function() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');

    if (!searchBoxExists) { 
        heroSection.style.backgroundColor = 'black';
        heroContent.style.display = 'none';

        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search courses...';

        searchBox.appendChild(searchInput);
        heroSection.appendChild(searchBox);
        searchInput.focus();

        searchBoxExists = true; 

        heroSection.addEventListener('click', function(event) {
            if (event.target !== searchInput && event.target !== searchBox) {
                searchBox.remove();
                heroContent.style.display = 'block';
                heroSection.style.backgroundColor = '';
                searchBoxExists = false; 
                heroSection.removeEventListener('click', arguments.callee);
            }
        });
    }
});

const strings = ["Programming", "Web Design", "Social Skills", "Marketing"];
let index = 0;
let charIndex = 0;
let currentString = '';
let isDeleting = false;
const typedText = document.getElementById('typed-text');
const heroTitle = document.getElementById('hero-title');
let completedTyping = false; 

// String Typed
function type() {
    if (isDeleting) {
        currentString = strings[index].substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentString = strings[index].substring(0, charIndex + 1);
        charIndex++;
    }
    
    typedText.textContent = currentString;

    
    if (!isDeleting && charIndex === strings[index].length) {
        setTimeout(() => {
            isDeleting = true; 
        }, 500);


        if (index === strings.length - 1 && !completedTyping) {
            completedTyping = true;
            heroTitle.classList.add('blink');
        }
    }

    
    if (isDeleting && charIndex === 0) {
        index = (index + 1) % strings.length;
        isDeleting = false;
        
       
        if (completedTyping) {
            heroTitle.classList.remove('blink');
            completedTyping = false;
        }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
}

// Start typing
type();


