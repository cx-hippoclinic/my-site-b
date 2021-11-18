import  request  from "@/utils/request"
export function getBlog(){
  return request({
    url:'/api/blog',
    method:'get',
  })
}
export function postBlog(data){
  return request({
    url:'/api/blog',
    method:'post',
    data
  })
}
export function postBlogType(data){
  return request({
    url:'/api/blogtype',
    method:'post',
    data
  })
}
export function deleteBlog(id){
  return request({
    url:'/api/blog/'+id,
    method:'delete',
  })
}
export function getBlogType(){
  return request({
    url:'/api/blogtype',
    method:'get',
  })
}

export function deleteBlogType(id){
  return request({
    url:'/api/blogtype/'+id,
    method:'delete',
  })
}
export function changeBlogType(id,data){
  return request({
    url:'/api/blogtype/'+id,
    method:'put',
    data
  })
}
export function getOneBlog(id){
  return request({
    url:'/api/blog/'+id,
    method:'get',
  })
}
export function editBlog(id,data){
  return request({
    url:'/api/blog/'+id,
    method:'put',
    data
  })
}
