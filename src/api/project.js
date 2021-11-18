import  request  from "@/utils/request"
export function addProject(data){
  return request({
    url:'/api/project',
    method:'post',
    data
  })
}
export function getProject(){
  return request({
    url:'/api/project',
    method:'get'
  })
}
export function changeProject(id,data){
  return request({
    url:'/api/project/' + id ,
    method:'put',
    data
  })
}
export function deleteProject(id){
  return request({
    url:'/api/project/' + id ,
    method:'DELETE',
  })
}
