export function invertColor(color) {
    // Убираем символ #, если он присутствует
    color = color.startsWith("#") ? color.slice(1) : color;

    // Преобразуем строку цвета в числа
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    // Инвертируем каждое значение
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    // Собираем обратно в шестнадцатеричный формат
    let invertedColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return invertedColor;
}


// Функция для получения текущей даты в формате YYYY-MM-DD_HH-MM-SS
// Используется для имени файла при сохранении PDF
export function getFormattedDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}