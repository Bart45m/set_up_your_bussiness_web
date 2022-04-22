import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web'

const Loader = () => {

    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./9764-loader.json')
        })
    })

    return(
        <div className="container" ref={container}></div>
    )
}

export default Loader;