export default function timer() {
    const deadline = '2020-08-26';

    function getTimeRemaining(endtime) {
        let today = new Date();
        let targetDay = new Date(endtime);
        let difference = targetDay - today;
        let secondsRemain = Math.floor((difference / 1000) % 60),
            minutesRemain = Math.floor((difference / 1000 / 60) % 60),
            hoursRemain = Math.floor((difference / 1000 / 60 / 60) % 24),
            daysRemain = Math.floor(difference / 1000 / 60 / 60 / 24);
    
    
        return {
            difference,
            secondsRemain,
            minutesRemain,
            hoursRemain,
            daysRemain,
        }
    }
    
    
    const setClock = (endtime) => {
        const hours = document.querySelectorAll('.timer__hours');
        const min = document.querySelectorAll('.timer__min');
        const sec = document.querySelectorAll('.timer__sec');
        const days = document.querySelectorAll('.timer__days-num');
        const daysName = document.querySelectorAll('.timer__days-name');
        const timerInterval = setInterval(updateClock, 1000);
    
        function updateClock() {
            let time = getTimeRemaining(endtime);
    
            if (time.daysRemain <= 0) {
                days.forEach(item => item.textContent = "");
                daysName.forEach(item => item.textContent = "");
            } else {
                days.forEach(item => item.textContent = time.daysRemain);
                daysName.forEach(item => item.textContent = formatDays(time.daysRemain));
            }
    
            hours.forEach(item => item.textContent = formatTime(time.hoursRemain));
            min.forEach(item => item.textContent = formatTime(time.minutesRemain));
            sec.forEach(item => item.textContent = formatTime(time.secondsRemain));
    
            if (time.difference <= 0) {
                clearInterval(timerInterval);
                days.forEach(item => item.textContent = '');
                hours.forEach(item => item.textContent = '00');
                min.forEach(item => item.textContent = '00');
                sec.forEach(item => item.textContent = '00');
            }
        }
    
        function formatTime(time) {
            if (time < 10) {
                time = '0' + time;
            }
    
            return time;
        }
    
        function formatDays(day) {
            let sb = '',
                dayNew = day % 100,
                lastFigure = dayNew % 10;
            if (dayNew > 10 && dayNew < 20) {
                sb = 'ей';
            } else if (lastFigure == 1) {
                sb = "день";
            } else if (lastFigure > 1 && lastFigure < 5) {
                sb = 'дня';
            } else {
                sb = 'дней';
            }
            return sb;
        }
    }
    setClock(deadline);
}