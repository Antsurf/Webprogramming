const container = document.getElementById('tables-container');

for (let i = 1; i <= 12; i++) {
    const table = document.createElement('table');
    table.id = `tablemult-${i}`;
    table.className = 'tables-content';

    // Add hidden class to table initially, we know have two classes
    table.classList.add('hidden-table');

    const caption = document.createElement('caption');
    caption.textContent = `Table of ${i}`;
    // Make caption clickable
    caption.style.cursor = 'pointer'; // change cursor into a hand
    caption.addEventListener('click', function() {
        table.classList.toggle('hidden-table');
    });
    table.appendChild(caption);

    for (let j = 1; j <= 12; j++) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = `${i} × ${j} = ${i * j}`;
        row.appendChild(cell);
        table.appendChild(row);
    }

    container.appendChild(table);
}