import axios from 'axios';
// import jsonexport from 'jsonexport';
const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(',') + '\n';
  const rows = data.map((obj) => Object.values(obj).join(',')).join('\n');
  return header + rows;
};
const downloadCSV = async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/task/${location.search}`,
      {
        headers: {
          'access-token': token,
        },
      }
    );

    const csvData = convertToCSV(response.data);

    const url = window.URL.createObjectURL(
      new Blob([csvData], { type: 'text/csv' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
};

export default downloadCSV;
