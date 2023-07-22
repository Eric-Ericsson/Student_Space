import moment from "moment";
import TimeAgo from "../timeAgo";
import Link from "next/link";

const IdentityFormat = ({ post, id, user }) => {
  return (
    <>
      <div className="hidden sm:flex items-center gap-2 line-climp-1 text-xs sm:text-[15px]">
        <Link href={`/profile/${user?.id}`} className="flex gap-2 hover:underline">
        <div className="font-bold">{user?.name}</div>
        <div className="text-xs">{user?.username}</div>
        </Link>
        <Link href={`/posts/${id}`} className="text-xs font-thin hover:underline">
          <TimeAgo
            date={moment(post?.data()?.timestamp?.toDate().toLocaleString())
              .fromNow()}
          />
        </Link>
      </div>
      <div className="flex sm:hidden items-center gap-2 line-climp-1 text-xs sm:text-[15px]">
        <div className="font-bold hover:underline">
          {post?.data()?.name?.length >= 12
            ? post?.data()?.name?.slice(0, 5) + "..."
            : post?.data()?.name}
        </div>
        <div className="text-xs hover:underline">
          {post?.data()?.username?.length >= 11
            ? post?.data()?.username?.slice(0, 5) + "..."
            : post?.data()?.username}
        </div>
        <div className="text-xs font-thin hover:underline">
          <TimeAgo
            date={moment(post?.data()?.timestamp?.toDate())
              .startOf("hour")
              .fromNow()}
          />
        </div>
      </div>
    </>
  );
};

export default IdentityFormat;
