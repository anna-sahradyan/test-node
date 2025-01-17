import style from './modal.module.scss';

export const ModalContent = ({ editData, setEditData, handleSaveChanges, setIsModalOpen }) => {
    return (
        <div className={style.content}>
            <h3 className={style.title}>Редактировать пост</h3>
            <div className={style.formContent}>
                <form>
                    <input
                        className={style.inputField}
                        type="text"
                        placeholder="Введите заголовок"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                    />
                    <textarea
                        className={style.textField}
                        placeholder="Введите описание"
                        value={editData.body}
                        onChange={(e) => setEditData({...editData, body: e.target.value})}
                    />
                    <div className={style.modalActions}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className={style.btn}  >Отмена</button>
                        <button type="button" onClick={handleSaveChanges} className={style.btn}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
