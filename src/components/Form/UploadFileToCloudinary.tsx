const upload_preset="tim_viec"
const cloud_name="thutrang21"
const api_url =`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`

export const uploadFileToCloud=async(file:any)=>{
    const data =new FormData();
    data.append("file",file);
    data.append("upload_preset",upload_preset);
    data.append("cloud_name",cloud_name);
    data.append("folder", "timviec_file"); 
    const res=await fetch(api_url,{
        method:"post",
        body:data
    });
    const fileData=await res.json();
    return fileData.url;
}