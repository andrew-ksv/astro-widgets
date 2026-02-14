const thead = document.querySelector("#kpTable thead");
const tbody = document.querySelector("#kpTable tbody");

async function loadKpForecast() {
  try {
    showLoading();

    const response = await fetch("/api/k-forecast");

    if (!response.ok) {
      throw new Error("Server error");
    }

    const { dates, rows } = await response.json();

    renderTable(dates, rows);

  } catch (error) {
    console.error(error);
    showError();
  }
}

function renderTable(dates, rows) {
  // Header
  thead.innerHTML = `
    <tr>
      <th>Time (UT)</th>
      ${dates.map(d => `<th>${d}</th>`).join("")}
    </tr>
  `;

  // Body
  tbody.innerHTML = rows.map(row => `
    <tr>
      <td class="time">${row.time}</td>
      ${row.values.map(kp =>
        `<td class="kp kp-${Math.floor(kp)}">${kp.toFixed(2)}</td>`
      ).join("")}
    </tr>
  `).join("");
}

function showLoading() {
  tbody.innerHTML = `
    <tr>
      <td colspan="4">Loading...</td>
    </tr>
  `;
}

function showError() {
  tbody.innerHTML = `
    <tr>
      <td colspan="4">Failed to load data</td>
    </tr>
  `;
}

loadKpForecast();