window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let deadLine = '2025-04-08';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t/1000) % 60);
        let minutes = Math.floor((t/1000/60) % 60);
        let hours = Math.floor((t/(1000*60*60)));
        //let days = Math.floor((t/(1000*60*60*24)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    };

    setClock('timer', deadLine);

    let more = this.document.querySelector('.more');
    console.log(more);
    let overlay = this.document.querySelector('.overlay');
    let close = this.document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        this.classList.add('more-splash');
        // запрещаем скролл страницы под модальным окном
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        // отменяем запрет скролла
        document.body.style.overflow = '';
    })

    const popup = this.document.querySelector('.popup');
    const popupTitle = this.document.querySelector('.popup-title');

    let offsetX, offsetY;
    let isDragging = false;

    popupTitle.addEventListener('mouseover', () => {
        popup.style.cursor = "pointer";
    })

    popupTitle.addEventListener('mousedown', (event) => {
        isDragging = true;

        offsetX = event.clientX - popup.getBoundingClientRect().left;
        offsetY = event.clientY - popup.getBoundingClientRect().top;

        popup.style.position = "absolute";
        popup.style.cursor = "grabbing";
    });

    this.document.addEventListener('mousemove', (event) => {
        if (!isDragging) return; 
        popup.style.left = `${event.clientX - offsetX}px`;
        popup.style.top = `${event.clientY - offsetY}px`;

        popup.style.cursor = "grabbing";
    });

    this.document.addEventListener('mouseup', () => {
        isDragging = false;
        popup.style.cursor = "default";
    })
});






