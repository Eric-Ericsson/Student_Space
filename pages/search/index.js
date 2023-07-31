import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { containerZIndex } from "@components/atom/modalAtom";
import { useState } from "react";
import SearchBar from "./searchBar";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@components/firebase";

function Profile() {
  const router = useRouter();

  const { data: session } = useSession();
  const [conZIndex] = useRecoilState(containerZIndex);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const searchTermLower = searchTerm.toLowerCase();
      if (searchTermLower) {
        const usersQuery = query(
          collection(db, "users"),
          where("nameLowerCase", ">=", searchTermLower),
          where("nameLowerCase", "<=", searchTermLower + "\uf8ff"),
          orderBy("nameLowerCase")
        );

        const [usersSnapshot] = await Promise.all([getDocs(usersQuery)]);

        const users = usersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSearchResults([...users]);
      } else handleSearch("=-.!?");
    } catch (error) {}
  };

  return (
    <LayoutCover title="profile | student space">
      <div
        className={`relative mx-2 sm:mx-8 mb-10 sm:mb-0 md:mx-20 lg:mx-40 border-[1px] min-h-screen ${conZIndex}`}
      >
        <SideNav path={"/search"} session={session} />
        <div className="mt-8 sm:ml-16 md:ml-24 lg:ml-56 border-b-[1px]">
          <div className="container mx-auto">
            <div
              className={`backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 flex justify-center border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]`}
            >
              <button
                className={`font-bold pt-12 sm:pt-16 text-lg underline underline-offset-[8px] decoration-sky-500 decoration-[5px] sm:hover:bg-slate-100`}
              >
                Search
              </button>
            </div>
            <div className="mt-4 px-2 sm:px-5 md:px-8">
              <SearchBar handleSearch={handleSearch} />
            </div>

            <div className="">
              <h2 className="text-xl font-semibold mb-2 px-2 sm:px-5 md:px-8">
                Search Results:
              </h2>
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/profile/${result.id}`)}
                    className="border-b border-t sm:hover:bg-gray-100 px-2 sm:px-5 md:px-8 cursor-pointer"
                  >
                    {result.name && <p>{result.name}</p>}
                    {result.username && <p>{result.username}</p>}
                  </div>
                ))
              ) : (
                <span className="text-sm opacity-75 px-2 sm:px-5 md:px-8">
                  No search result
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutCover>
  );
}

export default Profile;
