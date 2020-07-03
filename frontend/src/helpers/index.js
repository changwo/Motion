import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const getTimeAgo = (stamp) => {
    return dayjs(stamp).fromNow();
}