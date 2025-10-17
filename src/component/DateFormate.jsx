import PropTypes from "prop-types";

function DateFormat({ data }) {
  const formatDate = (data) => {
    if (!data) return "N/A";

    // Convert string or Date to Date object
    const date = typeof data === "string" ? new Date(data) : data;

    if (isNaN(date)) return "Invalid Date";

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return <div>{formatDate(data)}</div>;
}

DateFormat.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

export default DateFormat;
