async function fetchLatestAlert() {
  try {
    const response = await fetch('/api/latest-alert');
    const latestAlert = await response.json();
    let formattedMessage = latestAlert.message
      .split(/\r\n+/) //розділити текст на абзаци за \r\n
      .filter(line => !line.includes('Space Weather Message Code') && 
                      !line.includes('Serial Number') && 
                      !line.includes('Issue Time')) //видалення рядків
      .map(line => `<p>${line}</p>`) //обгорнути кожен рядок у тег <p>
      .join(''); //об'єднати у HTML-рядок

    //відображення повідомлення на сайті
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
      <p>Date: ${latestAlert.issue_datetime}</p>
      <div>${formattedMessage}</div>
    `;
  } catch (error) {
    console.error('Error fetching latest alert:', error);
  }
}
fetchLatestAlert();
