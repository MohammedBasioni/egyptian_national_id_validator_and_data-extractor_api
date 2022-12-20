import { Request, Response, NextFunction } from 'express';



const getNationalNumber = async (req: Request, res: Response, next: NextFunction) => {
    let nationalNumber: string = req.params.nationalNumber;
    
    if (!isValidNationaNumber(nationalNumber)){
        const error = new Error('Invalid national number');
        return res.status(404).json({
            message: error.message
        });
    }

    

    // First digit represents the century.
    let century: number = parseInt(nationalNumber.substring(0,1)); 

    // The (2nd, 3rd) digits are the citizen birth year of that century.
    let year:String = new String((2000 - ((3 - century) * 100)) + parseInt(nationalNumber.substring(1,3)));
    
    // The (4th, 5th), (6th, 7th) digits are the birth month and day, respectively.
    let birthDate:Date = new Date(year + "-" + nationalNumber.substring(3,5) + "-" + nationalNumber.substring(5,7));

    // The (8th, 9th) digits represnts a uniqe id for each egyptian governorate.
    let governorate:number = parseInt(nationalNumber.substring(7,9));

    // The (10th, 11th, 12th, 13th) digits represents the citizen order of the born babies on his birth date.
    let birthOrder:number = parseInt(nationalNumber.substring(9,13));

    if (!isValidGovernorateNumber(governorate)){
        const error = new Error(`Invalid national number: No governorate with given id = ${governorate}.`);
        return res.status(404).json({
            message: error.message
        });
    }

    if (!isValidDate(birthDate)){
        const error = new Error(`Invalid national number: Invalid birth date.`);
        return res.status(404).json({
            message: error.message
        });
    }
    
    if (birthOrder === 0){
        const error = new Error(`Invalid national number: Birth order can not be zero.`);
        return res.status(404).json({
            message: error.message
        });
    }

    let info = {
        birthDate: birthDate.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'}),
        governorate: getGovernorate(governorate),
        birthOrder: birthOrder
    }

    return res.status(200).json({
        message: info
    });
};

const isValidDate = (birthDate:Date) => {
    let today:Date = new Date();

    return today >= birthDate; 
}

const isValidNationaNumber = (nationalNumber:String) => {
    return isNumber(nationalNumber) && nationalNumber.length == 14;
}

const isValidGovernorateNumber = (governorateId:number) => {
    return governorateId <= 88
    && governorateId > 0
    && (governorateId < 5 
        || (governorateId > 10 
            && governorateId < 36 
            && governorateId != 20
            && governorateId != 30)
        ||
        governorateId == 88
        )
    // These ↑ are the only valid governorate ranges.     
}

const isNumber = (number: String) => {
    const charArray = Array.from(number)
    charArray.forEach(element => {
        if (element < '0' || element > '9'){
            return false;
        }
    });

    return true;
}

const getGovernorate = (governorateId : number) => {
    
    switch (governorateId) {
        case 1: return "Cairo"
        case 2: return "Alexandria"
        case 3: return "Port Said"
        case 4: return "Suez"
        case 11: return "Damietta"
        case 12: return "Mansoura"
        case 13: return "Sharqia"
        case 14: return "Qalyubia"
        case 15: return "Kafr Elshiekh"
        case 16: return "Gharbia"
        case 17: return "Menofia"
        case 18: return "Behira"
        case 19: return "Ismailia"
        case 21: return "Giza"
        case 22: return "Beni Suef"
        case 23: return "Fayoum"
        case 24: return "Minya"
        case 25: return "Asyut"
        case 26: return "Sohag"
        case 27: return "Qina"
        case 28: return "Aswan"
        case 29: return "Luxor"
        case 31: return "Al-Bahr Al-Ahmar"
        case 32: return "New Valley"
        case 33: return "Matrouh"
        case 34: return "North Sinai"
        case 35: return "South Sinai"
        case 88: return "Outside Egypt"
        
    }
    return "";
}
export default { getNationalNumber};


