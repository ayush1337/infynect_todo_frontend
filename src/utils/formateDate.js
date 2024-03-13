export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Get day, month, and year components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Get abbreviated month name
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );

  return `${day} ${monthName} ${year}`;
}
