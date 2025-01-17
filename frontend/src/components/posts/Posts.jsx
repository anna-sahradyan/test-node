import { useEffect } from "react";
import { Checkbox } from "../ui/Checkbox.jsx";
import { fetchPosts, deletePost } from "../../redux/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./posts.module.scss";
import {Post} from "./post/Post.jsx";


export const Posts = ({ selectedPosts, setSelectedPosts }) => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state?.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const selectAll = selectedPosts.size === posts.length && posts.length > 0;
    const isIndeterminate = selectedPosts.size > 0 && selectedPosts.size < posts.length;

    const handleSelectAll = (checked) => {
        if (checked) {
            const allPostIds = posts.map((post) => post._id);
            setSelectedPosts(new Set(allPostIds));
        } else {
            setSelectedPosts(new Set());
        }
    };

    const handleDeleteSelected = () => {
        selectedPosts.forEach((postId) => {
            dispatch(deletePost(postId));
        });
        setSelectedPosts(new Set());
    };


    return (
        <div className={style.container}>
            <div className={style.formContent}>
                <Checkbox
                        checked={selectAll}
                        indeterminate={isIndeterminate}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        disabled={posts.length === 0}
                        name="select_all"
                    />
                <div className = {style.btnField}>
                <button
                    className={`${style.btn} ${style.deleteBtn}`}
                    onClick={handleDeleteSelected}
                    disabled={selectedPosts. size === 0}
                >
                    Delete Selected
                </button>
                </div>
            </div>
            {loading?(<div className = {style.loader}>loading...</div>): (<div className={style.containerInner}>
                <div className={style.cardContainer}>
                    {posts.map((item, index) => (
                        <Post
                            item={item}
                            key={index}
                            index={index}
                            selectedPosts={selectedPosts}
                            setSelectedPosts={setSelectedPosts}

                        />
                    ))}
                </div>
            </div>)}

        </div>
    );
};
