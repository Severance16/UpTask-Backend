import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ReqResValidations } from "../validations";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post(
    "/create-account", 
    ReqResValidations.createAccount,
    handleInputErrors,
    AuthController.createAccount
)

router.post(
    "/confirm-account",
    ReqResValidations.token,
    handleInputErrors,
    AuthController.confirmAccount
)

router.post(
    "/login",
    ReqResValidations.login,
    handleInputErrors,
    AuthController.login
)

router.post(
    "/request-code",
    ReqResValidations.email,
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post(
    "/forgot-password",
    ReqResValidations.email,
    handleInputErrors,
    AuthController.forgotPassword
)

router.post(
    "/validate-token",
    ReqResValidations.token,
    handleInputErrors,
    AuthController.validateToken
)

router.post(
    "/update-password/:token",
    ReqResValidations.changePassword,
    ReqResValidations.tokenParam,
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

router.get(
    "/user",
    authenticate,
    AuthController.user
)

//** Profile */ 
router.put(
    "/profile",
    authenticate,
    ReqResValidations.updateProfile,
    handleInputErrors,
    AuthController.updateProfile
)
router.post(
    "/update-password",
    authenticate,
    ReqResValidations.changePassword,
    ReqResValidations.currentPassword,
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post(
    "/check-password",
    authenticate,
    ReqResValidations.password,
    handleInputErrors,
    AuthController.checkPassword
)

export default router