const UserService = require('../services/user.service');
const ResponseService = require('../services/response.service');

async function createUser(req, res) {
  const userData = req.body;
  const response = await UserService.createUser(userData);
  if (response.success) {
    return ResponseService.created(res, { message: response.message });
  } else {
    return ResponseService.internalServerError(res, { error: response.error });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updatedData = req.body;
  const response = await UserService.updateUser(userId, updatedData);
  if (response.success) {
    return ResponseService.success(res, { message: response.message, user: response.user });
  } else {
    if (response.error === 'Utilisateur non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  const response = await UserService.deleteUser(userId);
  if (response.success) {
    return ResponseService.success(res, { message: response.message });
  } else {
    if (response.error === 'Utilisateur non trouvé') {
      return ResponseService.notFound(res, { message: response.error });
    } else {
      return ResponseService.internalServerError(res, { error: response.error });
    }
  }
}

async function listUsers(req, res) {
  const response = await UserService.listUsers();
  if (response.success) {
    return ResponseService.success(res, { users: response.users });
  } else {
    return ResponseService.internalServerError(res, { error: response.error });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const response = await UserService.authenticateUser(username, password);
  if (response.success) {
    return ResponseService.success(res, { token: response.token });
  } else {
    return ResponseService.unauthorized(res, { error: response.error });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
  loginUser
};
