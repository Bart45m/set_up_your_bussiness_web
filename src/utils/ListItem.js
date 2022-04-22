class ListItem {
    constructor (image, header, firstRow, firstRowLabel ,secondRow, secondRowLabel, corner = '', cornerLabel = '' ) {
        this.image = image;
        this.header = header;
        this.corner = corner;
        this.cornerLabel = cornerLabel;
        this.firstRow = firstRow;
        this.firstRowLabel = firstRowLabel;
        this.secondRow = secondRow;
        this.secondRowLabel = secondRowLabel;
    }

    getImage(){
        return this.image;
    }

    getHeader(){
        return this.header;
    }

    getCorner(){
        return this.corner;
    }

    getCornerLabel(){
        return this.cornerLabel;
    }

    getFirstRow(){
        return this.firstRow;
    }

    getFirstRowLabel(){
        return this.firstRowLabel;
    }

    getSecondRow(){
        return this.secondRow;
    }

    getSecondRowLabel(){
        return this.secondRowLabel;
    }
}

const listItemUserConverter = (data) => {

    Object.keys(data).forEach((element) => {
        if(data[element]['competentions']){
           
            data[element] = new ListItem(data[element]['avatar']? data[element]['avatar'] : process.env.PUBLIC_URL + '/Person_5.png', 
                                data[element]['name'],
                                data[element]['specialisation'],
                                'specialisation',
                                data[element]['competentions'],
                                'competentions',
                                data[element]['stars'],
                                'stars',
                            )
        }else{
            
            data[element] = new ListItem(data[element]['avatar']? data[element]['avatar'] : process.env.PUBLIC_URL + '/Person_5.png', 
                                data[element]['name']+' '+data[element]['surname'],
                                data[element]['specialisation'],
                                'specialisation',
                                data[element]['skills'],
                                'skills',
                                data[element]['stars'],
                                'stars',
                            )
        }
    })

    return data
}

const listItemOfferConverter = (data) => {

    Object.keys(data).forEach((element) => {
        console.log(data[element])
    })
}

export { ListItem, listItemUserConverter, listItemOfferConverter }