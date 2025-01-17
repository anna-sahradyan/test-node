import { Checkbox } from "../../ui/Checkbox.jsx";
import { Edit } from "../../../assets/icons/Edit.jsx";
import style from "./post.module.scss";
import {useDispatch} from "react-redux";
import {deletePost, updatePost} from "../../../redux/postsSlice.js";
import {useState} from "react";
import {Modal} from "../../modal/Modal.jsx";

export const Post = ({ index, item, selectedPosts, setSelectedPosts }) => {
    const dispatch = useDispatch();
    const cardClass = `${style.card} ${index % 2 !== 0 ? style.specialCard : ""}`;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({ title: item.title, body: item.body });
    const handleSaveChanges = async () => {
        try {
            await dispatch(updatePost({ id: item._id, updates: editData }));
            setIsModalOpen(false);
        } catch (err) {
            console.error("Произошла ошибка при сохранении данных", err);
        }
    };

    const handleCheckboxChange = (postId, value) => {
        setSelectedPosts((prev) => {
            const newSet = new Set(prev);
            if (value) {
                newSet.add(postId);
            } else {
                newSet.delete(postId);
            }
            return newSet;
        });
    };

    const handleDeletePost = (postId) => {
        dispatch(deletePost(postId));
    };

    return (
        <div className={cardClass}>
            <div className={style.cardInner}>
                <div className={style.title}>
                    <span>{index + 1}</span> {item.title}
                </div>
                <div className={style.desc}>{item.body}</div>
            </div>
            <div className={style.checkboxEdit}>
                <Edit onClick={() => setIsModalOpen(true)} />
                <Checkbox
                    checked={selectedPosts.has(item._id)}
                    onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                />
                <button
                    className={`${style.deleteButton}`}
                    onClick={() => handleDeletePost(item._id)}
                >
                </button>
            </div>
            <Modal   isOpen={isModalOpen}
                     onClose={() => setIsModalOpen(false)}
                     editData={editData}
                     setEditData={setEditData}
                     handleSaveChanges={handleSaveChanges} />

        </div>
    );
};
