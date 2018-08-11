class DrumKit {
    constructor() {
        this.keys = Array.from(document.querySelectorAll('.key'));
        this.keys.forEach(key => {
            key.addEventListener('transitionend', this.removeTransition);
            key.addEventListener('click', this.playSound);
        });
        window.addEventListener('keydown', this.playSound);
    }
    
    playSound(e) {
        const keyCode = privateMembers.getKeyCode(e);
        
        if (keyCode) {
            const audio = document.querySelector(`audio[data-key='${keyCode}']`);
            const key = document.querySelector(`div[data-key='${keyCode}']`);

            if (audio && key) {
                key.classList.add('playing');
                audio.currentTime = 0;
                audio.play();
            }                    
        }
    }
    
    removeTransition(e) {
        if (e.propertyName === 'transform') {
            e.target.classList.remove('playing');
        }        
    }
}

const privateMembers = {
    getKeyCode(e) {
        return e.keyCode ? e.keyCode : parseInt(e.target.parentElement.getAttribute('data-key'));    
    }
}

new DrumKit();