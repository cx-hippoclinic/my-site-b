import request from "@/utils/request"
export function getComment({page,limit,blogid=-1}){
  page = +page
  limit = +limit
  return request({
    url:'/api/comment',
    method:'get',
    params:{
      page,limit,blogid
    }
  })
}
export function deleteComment(id){
  return request({
    url:'/api/comment/'+id,
    method:'delete'
  })
}
