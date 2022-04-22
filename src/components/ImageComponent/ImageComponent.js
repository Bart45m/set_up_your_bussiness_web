import './ImageComponent.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ImageComponent = (props) => {

    const [srcImg, setSrcImg] = useState(useSelector(state => state.user.user.avatar))

    const imageHandler = (event) => {
        
          const reader = new FileReader();
          reader.addEventListener('load', (event) => {
            //document.getElementById('image').src = event.target.result
            setSrcImg(event.target.result)
          });
          props.setData('avatar', event.target.files[0])
          reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <>
            <img src={srcImg ? srcImg : process.env.PUBLIC_URL + '/Person_5.png'} alt={process.env.PUBLIC_URL + '/Person_5.png'} id="image" />
            <input
                type="file" id="myfile" name="myfile"
                accept="image/*"
                onChange={imageHandler}
            />
        </>
    )
}

export default ImageComponent