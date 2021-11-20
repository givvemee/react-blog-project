import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";

const TagsBlock = styled.div`
    margin-top: .5rem;
    .tag {
        display: inline-block;
        color: ${palette.red[7]};
        text-decoration: none;
        margin-right: .5rem;
        &:hover {
            color: ${palette.red[6]};
        }
    }
`

const Tags = ({tags}) => {
    return (
        <TagsBlock>
            {
                tags.map(tag => (<Link className="tag" tag={tag} to={`/?tag=${tag}`}>#{tag}</Link>))
            }
        </TagsBlock>
    )
}

export default Tags;