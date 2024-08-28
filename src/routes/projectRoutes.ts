import { Router, request } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { ReqResValidations } from "../validations";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middlewares/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middlewares/task";
import { authenticate } from "../middlewares/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

router.use(authenticate)

router.post(
    "/", 
    ReqResValidations.projectBody, 
    handleInputErrors,
    ProjectController.createProject
)

router.get("/", ProjectController.getAllProjects)

router.get(
    "/:id",
    ReqResValidations.projectID,
    handleInputErrors, 
    ProjectController.getProjectById
)

router.param('projectId', projectExists)

router.put(
    "/:projectId",
    ReqResValidations.projectId,
    ReqResValidations.projectBody,
    handleInputErrors, 
    hasAuthorization,
    ProjectController.updateProject
)

router.delete(
    "/:projectId",
    ReqResValidations.projectId,
    handleInputErrors, 
    hasAuthorization,
    ProjectController.deleteProject
)

// ---------- Router For Task ----------


router.post(
    "/:projectId/tasks",
    hasAuthorization,
    ReqResValidations.taskBody,
    handleInputErrors,
    TaskController.createTask,
)

router.get(
    "/:projectId/tasks",
    TaskController.getAllTasks,
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get(
    "/:projectId/tasks/:taskId",
    ReqResValidations.taskId,
    handleInputErrors,
    TaskController.getTaskById,
)

router.put(
    "/:projectId/tasks/:taskId",
    hasAuthorization,
    ReqResValidations.taskId,
    ReqResValidations.taskBody,
    handleInputErrors,
    TaskController.updateTask,
)

router.delete(
    "/:projectId/tasks/:taskId",
    hasAuthorization,
    ReqResValidations.taskId,
    handleInputErrors,
    TaskController.deleteTask,
)

router.post(
    '/:projectId/tasks/:taskId/status',
    ReqResValidations.taskId,
    ReqResValidations.taskStatus,
    handleInputErrors,
    TaskController.updateStatus
)

// ---------- Router For Team ----------
router.post(
    '/:projectId/team/find',
    ReqResValidations.email,
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.post(
    '/:projectId/team',
    ReqResValidations.userId,
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete(
    '/:projectId/team/:userId',
    ReqResValidations.userIdParam,
    handleInputErrors,
    TeamMemberController.removeMemberById
)

router.get(
    '/:projectId/team',
    TeamMemberController.getProjectTeam
)

// ---------- Router For Notes ----------

router.post("/:projectId/tasks/:taskId/notes",
    ReqResValidations.content,
    handleInputErrors,
    NoteController.createNote
)

router.get("/:projectId/tasks/:taskId/notes",
    NoteController.getTaskNotes
)

router.delete("/:projectId/tasks/:taskId/notes/:noteId",
    ReqResValidations.noteIdParam,
    handleInputErrors,
    NoteController.deleteNote
)

export default router