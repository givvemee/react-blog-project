import Post from "../../models/post";
import mongoose from 'mongoose'
import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const {ObjectId} = mongoose.Types;
const sanitizeOption = {
    allowedTags: [
        'h1', 'h2', 'b', 'i', 'u', 's', 'p', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class']
    },
    allowedSchemes: ['data', 'http']
}

export const getPostById = async (ctx, next) => {
    const {id} = ctx.params
    if (!ObjectId.isValid(id)) {
        ctx.status = 400 // Bad Request
        return 
    }
    try {
        const post = await Post.findById(id)
        // 포스트가 존재하지 않을 때
        if (!post) {
            ctx.status = 404
            return
        }
        ctx.state.post = post;
        return next()
    } catch (e) {
        ctx.throw(500, e)
    }
}

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403
        return
    }
    return next()
}

export const write = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string().required(), // required 가 있으면 필수 항몪!
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required() // 문자열로 이루어진 배열
    })

    // 검증하고 나서 실패인 경우의 에러 처리
    const result = schema.validate(ctx.request.body)
    if (result.error) {
        ctx.status = 400 // Bad Request
        ctx.body = result.error
        return 
    }

    const {title, body, tags} = ctx.request.body
    const post = new Post({
        title, 
        body: sanitizeHtml(body, sanitizeOption), 
        tags, 
        user: ctx.state.user,
    })
    try {
        await post.save()
        ctx.body = post 
    } catch (e) {
        ctx.throw(500, e)
    }
};

// html 을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
    const filtered = sanitizeHtml(body, {
        allowedTags: []
    })
    return filtered.length < 200 ? filtered : `${filtered.slice(0,200)}...`;
}

export const list = async ctx => {
    // query 는 문자열이기 때문에 parseInt 로 숫자로 반환해 주어야 한다. 값이 주어지지 않으면 1을 기본으로 사용한다.
    const page = parseInt(ctx.query.page || '1', 10)
    if (page < 1) {
        ctx.status = 400
        return
    }

    const {tag, username} = ctx.query;
    // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? {'user.username': username} : {} ),
        ...(tag ? {tags: tag} : {})
    }

    try {
        const posts = await Post.find(query).sort({ _id: -1}).limit(10).skip((page - 1) *10).lean().exec()
        const postCount = await Post.countDocuments(query).exec()
        ctx.set('Last-Page', Math.ceil(postCount / 10))
        ctx.body = posts
            // .map(post => post.toJSON())
            .map(post => ({
                ...post,
                body: removeHtmlAndShorten(post.body)
            }))
    } catch (e) {
        ctx.throw(500, e)
    }
};

export const read = ctx => {
    ctx.body = ctx.state.post
}

export const remove = async ctx => {
    const {id} = ctx.params
    try {
        await Post.findByIdAndRemove(id).exec()
        ctx.status = 204; // No content (성공은 했지만 응답할 데이터는 없음)
    } catch (e) {
        ctx.throw(500, e)
    }
};

export const update = async ctx => {
    const {id} = ctx.params
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string())
    })

    // 검증 후 실패의 경우 에러 처리
    const result = schema.validate(ctx.request.body)
    if (result.error) {
        ctx.status = 400
        ctx.body = result.error
        return;
    }

    const nextData = {...ctx.request.body}; // 객체 복사
    // body 값이 주어졌다면 HTML 필터링
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption)
    }
    try {
        const post = await Post.findByIdAndUpdate(id, nextData, {
            new : true // 이 값을 설정하면 업데이트 된 데이터를 반환한다. 만일 false 라면 업데이트 되기 전의 데이터를 반환한다.
        }).exec()
        if (!post) {
            ctx.status = 404
            return 
        }
        ctx.body = post
    } catch (e) {  
        ctx.throw(500, e)
    }
};

