import moment from "moment";

export const contentDateSwitchCase = (content) => {
  const now = moment();
  const contentCreatedAt = moment(content.createdAt);
  const contentDateComparison =
    contentCreatedAt.date() === now.date()
      ? true
      : now.date() - contentCreatedAt.date();

  switch (contentDateComparison) {
    case true:
      return "today";
    case 1:
      return "yesterday";
    default:
      return `${contentDateComparison} days ago`;
  }
};
