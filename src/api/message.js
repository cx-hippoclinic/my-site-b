import request from "@/utils/request"
export function getMessage({page,limit}){

  return request({
    url:'/api/message',
    method:'get',
    params:{
      page,limit
    }
  })
}
export function deleteMessage(id){
  return request({
    url:'/api/message'+id,
    method:'delete'
  })
}
