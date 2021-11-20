import AskModal from "../common/AskModal";

const AskRemoveModal = ({visible, onConfirm, onCancel}) => {
    return (
        <AskModal visible={visible} title="Delete post" description="Are you sure to delete post?" onCancel={onCancel} onConfirm={onConfirm}/>
    );
};

export default AskRemoveModal;