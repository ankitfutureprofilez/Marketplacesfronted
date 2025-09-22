import PropTypes from "prop-types";

function DateFormate({ data }) {
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

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

DateFormate.propTypes = {
  data: PropTypes.string.isRequired,
};

export default DateFormate;