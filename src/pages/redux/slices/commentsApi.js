

import { rootApi } from "../slices/rootApi";

export const commentsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchComments: builder.query({
            query: (eventId) => `/comment/${eventId}/comments`,
            providesTags: ['Comment']
        }),

        addComment: builder.mutation({
            query: ({ eventId, data }) => ({
                url: `/comment/${eventId}/createComment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),

        addReply: builder.mutation({
            query: ({ commentId, data }) => ({
                url: `/comment/${commentId}/reply`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),

        deleteReply: builder.mutation({
            query: ({ commentId, replyId }) => ({
                url: `/comment/${commentId}/replies/${replyId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comment']
        }),

        deleteComment: builder.mutation({
            query: ({ commentId }) => ({
                url: `/comment/${commentId}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comment']
        }),

        updateComment: builder.mutation({
            query: ({ commentId , data }) => ({
                url: `/comment/${commentId}/update`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        updateReply: builder.mutation({
            query: ({ commentId ,replyId ,data}) => ({
                url: `/comment/${commentId}/reply/${replyId}/update`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),

    })
});

export const { useFetchCommentsQuery, useAddCommentMutation, useAddReplyMutation, useDeleteReplyMutation ,useDeleteCommentMutation,useUpdateCommentMutation , useUpdateReplyMutation } = commentsApi;
