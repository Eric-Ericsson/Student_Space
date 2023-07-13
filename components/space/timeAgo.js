
const TimeAgo = ({ date }) => {
  let shortenedTime = date.replace("hours", "hrs");
  shortenedTime = shortenedTime.replace("hour", "hr");
  shortenedTime = shortenedTime.replace("minutes", "mins");
  shortenedTime = shortenedTime.replace("minute", "min");
  shortenedTime = shortenedTime.replace("seconds", "sec");

  return <span>{shortenedTime}</span>;
};

export default TimeAgo;
