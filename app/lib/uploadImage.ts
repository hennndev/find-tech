
export const uploadImage = async(fileImage: File) => {
  console.log(fileImage)
  const formDataImage = new FormData()
  formDataImage.append('file', fileImage)
  formDataImage.append('upload_preset', 'pjofr3dy')
  const res = await fetch(`https://api.cloudinary.com/v1_1/dohb3a484/image/upload`, {
    method: 'POST',
    body: formDataImage
  })
  return res.json()
}