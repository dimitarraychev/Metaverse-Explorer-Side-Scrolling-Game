export function convertMillisecsToMins(milliseconds) {

    let totalSeconds = Math.floor(milliseconds / 1000);

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (minutes < 10) minutes = minutes.toString().padStart(2, '0');
    if (seconds < 10) seconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
}