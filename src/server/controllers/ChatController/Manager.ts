import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const managerController = (req: Request, res: Response) => {
    res.status(StatusCodes.FORBIDDEN).render('manager', {
        titleComplement: 'Management System'
    })
}