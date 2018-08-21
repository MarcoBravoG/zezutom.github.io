const inventors = [
    { field: 'physics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { field: 'physics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { field: 'physics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { field: 'astronomy', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { field: 'astronomy', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { field: 'astronomy', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { field: 'physics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { field: 'chemistry', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { field: 'mathematics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { field: 'mathematics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { field: 'physics', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { field: 'telco', invention: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const getTable = Symbol('getTable');
const addRow = Symbol('addRow');
const updateSliderValue = Symbol('updateSliderValue');
const setTableRows = Symbol('setTableRows');

class InventorTable {
    constructor(data) {
        this[setTableRows](data);
    }

    filterByEra(year) {
        this[updateSliderValue](year);
        const filteredData = inventors.filter(inventor => (inventor.year >= year && inventor.year <= year + 50));
        this[setTableRows](filteredData);
    }

    [updateSliderValue](year) {
        document.getElementById('slider_value').innerHTML = year;
    }

    [getTable]() {
        return document.getElementsByTagName('tbody')[0];
    }

    [setTableRows](rows) {
        const table = this[getTable]();
        if (table) {
            // Clear the previous content
            const rowCount = table.rows.length;
            for (var i = rowCount - 1; i >= 0; i--) {
                table.deleteRow(i);
            }

            // Add a new content, row by row
            rows.forEach(row => {
                this[addRow](table, row);
            });
        } else {
            console.error('Something went wrong');
        }        
    }

    [addRow](table, row) {
        const createCell = (label, text) => {
            const td = document.createElement('td');
            const textNode = document.createTextNode(text);
            td.appendChild(textNode);
            td.setAttribute('data-label', label);
            return td;
        };
        const tr = document.createElement('tr');        
        tr.appendChild(createCell('name', `${row.first} ${row.last}`));
        tr.appendChild(createCell('born', row.year));
        tr.appendChild(createCell('died', row.passed));
        tr.appendChild(createCell('field', row.field));
        tr.appendChild(createCell('invention', row.invention));
        table.appendChild(tr);
    }
}

const inventorTable = new InventorTable(inventors);