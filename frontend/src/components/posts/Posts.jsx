import {useEffect, useState} from "react";
import { Checkbox } from "../ui/Checkbox.jsx";
import {fetchPosts, deletePost, createPost} from "../../redux/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import style from "./posts.module.scss";
import {Post} from "./post/Post.jsx";
import {ModalAddComponent} from "../modal/ModalAddComponent.jsx";


export const Posts = ({ selectedPosts, setSelectedPosts }) => {
    const dispatch = useDispatch();
    const { posts, loading} = useSelector((state) => state?.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const selectAll = selectedPosts.size === posts.length && posts.length > 0;
    const isIndeterminate = selectedPosts.size > 0 && selectedPosts.size < posts.length;
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleAddPost = (postData) => {
        dispatch(createPost(postData));
        setIsModalOpen(false);
    };

    return (
        <div className={style.container}>
            <div className={style.formContent}>
                <div className={style.btnField}>
                    <div className={style.btnDeleteBox}>
                        <Checkbox
                            checked={selectAll}
                            indeterminate={isIndeterminate}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            disabled={posts.length === 0}
                            name="select_all"
                        />

                        <button
                            className={`${style.btn} ${style.deleteBtn}`}
                            onClick={handleDeleteSelected}
                            disabled={selectedPosts.size === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <button
                        className={`${style.btn} ${style.deleteBtn}`}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Posts
                    </button>
                </div>
            </div>
            {loading ? (<div className={style.loader}>loading...</div>) : (<div className={style.containerInner}>
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

<ModalAddComponent
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSubmit={handleAddPost}
/>
        </div>
    );
};
