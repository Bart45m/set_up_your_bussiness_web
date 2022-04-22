const isCommonUserDataValid = (dataSet) => {

    const isEmailValid = dataSet['email'] ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(dataSet['email']) : false
    const isPasswordValid = dataSet['password'] ? dataSet['password'].length >= 6 : false
    const isGoalsValid = dataSet['goals'] ? dataSet['goals'].length >= 0 : false
    const isSpecialisationValid = dataSet['specialisation'] ? dataSet['specialisation'].length >= 0 : false
    const isCountryValid = dataSet['country'] ? dataSet['country'].length >= 0 : false
    const isCityValid = dataSet['city'] ? dataSet['city'].length >= 0 : false
    const isTypeOfAccountValid = dataSet['typeOfAccount'] ? dataSet['typeOfAccount'].length >= 0 : false

    return (isEmailValid && isPasswordValid && isGoalsValid && isSpecialisationValid && isCountryValid && isCityValid && isTypeOfAccountValid)
}

const isPersonUserDataValid = (dataSet) => {

    const isNameValid = dataSet['name'] ? /^[A-Z]{1}[a-z]+$/.test(dataSet['name']) : false
    const isDegreeValid = dataSet['degree'] ? dataSet['degree'].length >= 0 : false
    const isSurnameValid = dataSet['surname'] ? /^[A-Z]{1}[a-z]+$/.test(dataSet['surname']) : false
    const isSkillsValid = dataSet['skills'] ? dataSet['skills'].length >= 0 : false
    const isInterestsValid = dataSet['interests'] ? dataSet['interests'].length >= 0 : false

    return (isNameValid && isSurnameValid && isSkillsValid && isInterestsValid && isDegreeValid)
}

const isInstiutionUserDataValid = (dataSet) => {

    const isNameValid = dataSet['name'] ? /^[A-Za-z]+$/.test(dataSet['name']) : false
    const isCompetentionsValid = dataSet['competentions'] ? dataSet['competentions'].length >= 0 : false

    return (isNameValid && isCompetentionsValid)
}

const prepareData = (userData) => {

    let finalUserData = JSON.parse(JSON.stringify(userData))

    delete finalUserData['password']

    if(userData['avatar']){ 
        finalUserData['avatar'] = userData['avatar'] 
    }

    finalUserData['goals'] = userData['goals'].split(',')
    finalUserData['specialisation'] = userData['specialisation'].split(',')

    if(userData['typeOfAccount'] === 'person'){
       finalUserData['skills'] = userData['skills'].split(',')
       finalUserData['interests'] = userData['interests'].split(',')
    }else{
        finalUserData['competentions'] = userData['competentions'].split(',')
    }    

    finalUserData['stars'] = 0
    finalUserData['rates_amount'] = 0

    return finalUserData
}

const splitToShortcutAndMainContent = (input, order) => {

    let shortcut = {}
    let main = {}
    
    if(input['avatar']){
        shortcut['avatar'] = input['avatar']
        delete input['avatar']
    }

    for(let i of order){
        shortcut[i] = input[i]
        delete input[i]
    }
    main = JSON.parse(JSON.stringify(input))

    return {
        shortcut: shortcut,
        main: main
    }
}

export { isCommonUserDataValid, isPersonUserDataValid, isInstiutionUserDataValid, prepareData, splitToShortcutAndMainContent }