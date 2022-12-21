import { Request, Response, NextFunction } from 'express';
import {
    StatusCodes,
} from 'http-status-codes';


const getNationalNumber = async (req: Request, res: Response, next: NextFunction) => {
    let national_number: string = req.params.national_number;
    
    if (!(Number(national_number) && isNDigits(national_number, 14))){
        const error = new Error('Invalid national number.');
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        });
    }

    let century: number = getCentury(national_number);

    let year:String = getYear(national_number, century);
    let month:String = getMonth(national_number);
    let day:String = getDay(national_number);
    let birth_date:Date = getBirthDate(year, month, day);

    let governorate:String;
    try {
        governorate = getGovernorate(national_number);
    }
    catch (e:any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: e.message
        });
    }

    let birth_order:number = getBirthOrder(national_number);
    let gender:String = getGender(national_number);
    if (!isValidDate(birth_date)){
        const error = new Error(`Invalid national number.`);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        });
    }
    
    if (birth_order === 0){
        const error = new Error(`Invalid national number.`);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        });
    }

    let info_extracted = {
        gender: gender,
        birth_date: reformatBirthDate(birth_date),
        governorate: governorate,
        birth_order: birth_order
    }

    return res.status(StatusCodes.OK).json({
        message: info_extracted
    });
};

const getCentury = (national_number:String) => {
    return parseInt(national_number.substring(0,1));
}

const getYear = (national_number:String, century:number) => {
    return new String((2000 - ((3 - century) * 100)) + parseInt(national_number.substring(1,3)));
}

const getMonth = (national_number:String) => {
    return national_number.substring(3,5);
}

const getDay = (national_number:String) => {
    return national_number.substring(5,7)
}

const getBirthDate = (year:String, month:String, day:String) => {
    return new Date(year + "-" + month + "-" + day);
}



const reformatBirthDate = (birth_date:Date) => {
    return birth_date.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'});
}

const getBirthOrder = (national_number:String) => {
    return parseInt(national_number.substring(9,12));
}

const getGender = (national_number:String) => {
    return parseInt(national_number.substring(12,13)) % 2 == 0? "Female":"Male";
}

const isValidDate = (birth_date:Date) => {
    let today:Date = new Date();

    return today >= birth_date;
}

const isNDigits = (national_number:String, n:number) => {
    return national_number.length == n;
}

const getGovernorate = (national_number : String) => {
    let governorate_id:number = parseInt(national_number.substring(7,9));

    switch (governorate_id) {
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
    throw new Error("Invalid national number.");
}
export default { getNationalNumber};


