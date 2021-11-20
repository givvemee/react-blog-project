import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
`
// TagBox 에서 사용하는 버튼과 일치하는 높이로 설정한 후 서로간의 여백 지정
const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`

const WriteActionButtons = ({onCancel, onPublish, isEdit}) => {
    return (
        <WriteActionButtonsBlock>
            <StyledButton red onClick={onPublish}>
                Post {isEdit ? 'Edit' : ''}
            </StyledButton>
            <StyledButton onClick={onCancel}>Cancel</StyledButton>
        </WriteActionButtonsBlock>
    )
}

export default WriteActionButtons;