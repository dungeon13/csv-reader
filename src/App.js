import React, { useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files
import './App.css'; // Import CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [markedRows, setMarkedRows] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // State to track sorting direction

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    // Using PapaParse to parse the CSV file
    Papa.parse(file, {
      complete: (result) => {
        // Adding a new property 'marked' to each row and initializing it to false
        const newData = result.data.slice(1).map(row => ({ ...row, marked: false }));
        setData(newData);
      }
    });
  };

  // Function to open Leetcode question link in a new tab
  const openLeetCodeLink = (link, index) => {
    window.open(link, '_blank');
    // Marking the row as ticked
    const newData = [...data];
    newData[index].marked = true;
    setMarkedRows([...markedRows, index]);
    setData(newData);
  };

  // Function to sort data based on Difficulty column
  const sortData = () => {
    const sortedData = [...data];
    if (sortDirection === 'asc') {
      sortedData.sort((a, b) => {
        const difficultyA = a[3];
        const difficultyB = b[3];
        if (difficultyA === difficultyB) return 0;
        if (difficultyA === 'Easy') return -1;
        if (difficultyB === 'Easy') return 1;
        if (difficultyA === 'Medium') return -1;
        if (difficultyB === 'Medium') return 1;
        return 1; // 'Hard' comes last
      });
      setSortDirection('desc');
    } else {
      sortedData.sort((a, b) => {
        const difficultyA = a[3];
        const difficultyB = b[3];
        if (difficultyA === difficultyB) return 0;
        if (difficultyA === 'Hard') return -1;
        if (difficultyB === 'Hard') return 1;
        if (difficultyA === 'Medium') return -1;
        if (difficultyB === 'Medium') return 1;
        return 1; // 'Easy' comes last
      });
      setSortDirection('asc');
    }
    setData(sortedData);
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Acceptance</th>
            <th onClick={sortData}>Difficulty</th>
            <th>Frequency</th>
            <th>Leetcode Question Link</th>
            <th>Marked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td>
                <button onClick={() => openLeetCodeLink(row[5], index)}>Open</button>
              </td>
              <td>{markedRows.includes(index) ? '✔️' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
