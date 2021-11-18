import request from "@/utils/request"
export function getAboutUrl(){
  return request({
    url:'/api/about',
    method:'get'
  })
}
export function setAboutUrl(data){
  return request({
    url:'/api/about',
    method:'post',
    data
  })
}
