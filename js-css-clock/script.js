const getSecondDegrees = Symbol('getSecondDegrees');
const getMinuteDegrees = Symbol('getMinuteDegrees');
const getHourDegrees = Symbol('getHourDegrees');
const rotateHand = Symbol('rotateHand');
const drawClockFace = Symbol('drawClockFace');

class Clock {

    constructor() {
        this.secondHand = document.querySelector('.second');
        this.minuteHand = document.querySelector('.minute');
        this.hourHand = document.querySelector('.hour');
        
        // all hands are kept in a vertical position (90-degree rotation)
        this.offset = 90;
        
        this[drawClockFace]();
        this.updateTime(true);   
        
        setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime(init) {
        const now = new Date();

        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDegrees = this[getSecondDegrees](seconds);
        const minuteDegrees = this[getMinuteDegrees](minutes, seconds);
        const hourDegrees = this[getHourDegrees](hours, minutes);

        const tickStepSecondsMinutes = 360 / 60;
        const tickStepHours = 360 / 12;

        this[rotateHand](this.secondHand, secondDegrees, tickStepSecondsMinutes);        
        this[rotateHand](this.minuteHand, minuteDegrees, tickStepSecondsMinutes);
        this[rotateHand](this.hourHand, hourDegrees, tickStepHours);            
    }

    [drawClockFace]() {
        const markers = Array.from(document.querySelectorAll('.marker'));

        // How far apart (in degrees) to set individual markers, so that they form a circle
        const rotateStep = 360 / markers.length;

        // Circle radius, relative to the width of the view
        const radius = 15;

        markers.forEach((marker, index) => {
            const rotation = index * rotateStep;
            marker.style.transform = `rotate(${rotation}deg) translate(${radius}vw) rotate(-${rotation}deg)`;

            if (index % 3 === 0) {
                // Opens up possibility for special styling for each quarter of an hour
                marker.classList.add('quarter');
                marker.classList.add(`quarter-${index / 3}`);   
            }
        });
    }

    [getSecondDegrees](seconds)  {
        return ((seconds / 60) * 360) + this.offset;
    }

    [getMinuteDegrees](minutes, seconds) {
        return ((minutes / 60) * 360) + this.offset;
    }

    [getHourDegrees](hours, minutes) {
        return ((hours / 12) * 360) + this.offset;
    }

    [rotateHand](hand, degrees, tickStep) {
        const isFullCircle = degrees === 360 + this.offset - tickStep;
        if (isFullCircle) {
            hand.classList.remove('ticker');
        } else if (degrees === this.offset + tickStep) {
            hand.classList.add('ticker');
        }
        hand.style.transform = `rotate(${degrees}deg)`;        
    }    
}

new Clock();