import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const getNationalNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let nationalNumber: string = req.params.nationalNumber;

  if (!(Number(nationalNumber) && isNDigits(nationalNumber, 14))) {
    const error = new Error("Invalid national number.");
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  let century: number = getCentury(nationalNumber);

  let year: String = getYear(nationalNumber, century);
  let month: String = getMonth(nationalNumber);
  let day: String = getDay(nationalNumber);
  let birthDate: Date = getBirthDate(year, month, day);

  let governorate: String;
  try {
    governorate = getGovernorate(nationalNumber);
  } catch (e: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: e.message,
    });
  }

  let birthOrder: number = getBirthOrder(nationalNumber);
  let gender: String = getGender(nationalNumber);
  if (!isValidDate(birthDate)) {
    const error = new Error(`Invalid national number.`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (birthOrder === 0) {
    const error = new Error(`Invalid national number.`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  let infoExtracted = {
    gender: gender,
    birthDate: reformatBirthDate(birthDate),
    governorate: governorate,
    birthOrder: birthOrder,
  };

  return res.status(StatusCodes.OK).json({
    message: infoExtracted,
  });
};

const getCentury = (nationalNumber: String) => {
  return parseInt(nationalNumber.substring(0, 1));
};

const getYear = (nationalNumber: String, century: number) => {
  return new String(
    2000 - (3 - century) * 100 + parseInt(nationalNumber.substring(1, 3))
  );
};

const getMonth = (nationalNumber: String) => {
  return nationalNumber.substring(3, 5);
};

const getDay = (nationalNumber: String) => {
  return nationalNumber.substring(5, 7);
};

const getBirthDate = (year: String, month: String, day: String) => {
  return new Date(year + "-" + month + "-" + day);
};

const reformatBirthDate = (birthDate: Date) => {
  return birthDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getBirthOrder = (nationalNumber: String) => {
  return parseInt(nationalNumber.substring(9, 12));
};

const getGender = (nationalNumber: String) => {
  return parseInt(nationalNumber.substring(12, 13)) % 2 == 0
    ? "Female"
    : "Male";
};

const isValidDate = (birthDate: Date) => {
  let today: Date = new Date();

  return today >= birthDate;
};

const isNDigits = (nationalNumber: String, n: number) => {
  return nationalNumber.length == n;
};

const getGovernorate = (nationalNumber: String) => {
  let governorateId: number = parseInt(nationalNumber.substring(7, 9));

  switch (governorateId) {
    case 1:
      return "Cairo";
    case 2:
      return "Alexandria";
    case 3:
      return "Port Said";
    case 4:
      return "Suez";
    case 11:
      return "Damietta";
    case 12:
      return "Mansoura";
    case 13:
      return "Sharqia";
    case 14:
      return "Qalyubia";
    case 15:
      return "Kafr Elshiekh";
    case 16:
      return "Gharbia";
    case 17:
      return "Menofia";
    case 18:
      return "Behira";
    case 19:
      return "Ismailia";
    case 21:
      return "Giza";
    case 22:
      return "Beni Suef";
    case 23:
      return "Fayoum";
    case 24:
      return "Minya";
    case 25:
      return "Asyut";
    case 26:
      return "Sohag";
    case 27:
      return "Qina";
    case 28:
      return "Aswan";
    case 29:
      return "Luxor";
    case 31:
      return "Al-Bahr Al-Ahmar";
    case 32:
      return "New Valley";
    case 33:
      return "Matrouh";
    case 34:
      return "North Sinai";
    case 35:
      return "South Sinai";
    case 88:
      return "Outside Egypt";
  }
  throw new Error("Invalid national number.");
};
export default { getNationalNumber };
