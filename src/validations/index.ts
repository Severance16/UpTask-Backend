import { body, param } from "express-validator"

export class ReqResValidations {
    static projectBody = [
        body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio."), 
        body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio."), 
        body("description").notEmpty().withMessage("La descripción del proyecto es obligatoria.")
    ]
    static projectID = [
        param("id").isMongoId().withMessage("ID no válido.")
    ]
    static projectId = [
        param("projectId").isMongoId().withMessage("ID no válido.")
    ]
    static taskBody = [
        body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio."), 
        body("description").notEmpty().withMessage("La descripción de la tarea es obligatoria.")
    ]
    static taskId = [
        param("taskId").isMongoId().withMessage("ID no válido.")
    ]
    static taskStatus = [
        body("status").notEmpty().withMessage("El estado es obligatorio.")
    ]
    static createAccount = [
        body("name").notEmpty().withMessage("El nombre es obligatorio."),
        body("password").isLength({min: 8}).withMessage("La contraseña debe contener mínimo 8 caracteres."),
        body("password_confirmation").custom((value, {req}) => {
            if(req.body.password !== value){
                throw new Error("Las contraseñas no coinciden.")
            }
            return true
        }),
        body("email").isEmail().withMessage("E-mail no válido.")
    ]
    static token = [
        body("token").notEmpty().withMessage("El token es obligatorio."),
    ]
    static login = [
        body("email").isEmail().withMessage("E-mail no válido."),
        body("password").notEmpty().withMessage("La contraseña es obligatoria."),
    ]
    static email = [
        body("email").isEmail().withMessage("E-mail no válido.")
    ]
    static changePassword = [
        body("password").isLength({min: 8}).withMessage("La contraseña debe contener mínimo 8 caracteres."),
        body("password_confirmation").custom((value, {req}) => {
            if(req.body.password !== value){
                throw new Error("Las contraseñas no coinciden.")
            }
            return true
        })
    ]
    static tokenParam = [
        param("token").isNumeric().withMessage("Token no válido.")
    ]
    static userId = [
        body("id").isMongoId().withMessage("ID no válido.")
    ]
    static userIdParam = [
        param("userId").isMongoId().withMessage("ID no válido.")
    ]
    static noteIdParam = [
        param("noteId").isMongoId().withMessage("ID no válido.")
    ]
    static content = [
        body("content").notEmpty().withMessage("El contenido de la nota es obligatorio.")
    ]
    static updateProfile = [
        body("name").notEmpty().withMessage("El nombre es obligatorio."),
        body("email").isEmail().withMessage("E-mail no válido.")
    ]
    static currentPassword = [
        body("current_password").notEmpty().withMessage("La contraseña acutal es obligatoria.")
    ]
    static password = [
        body("password").notEmpty().withMessage("La contraseña es obligatoria.")
    ]
}