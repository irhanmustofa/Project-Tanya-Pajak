export default function Response(res, payload) {
  const { code = 200, ...rest } = payload;
  delete payload.code;

  return res.status(code).json(rest);
}

export const success = ({ message = "Request Success", data = null } = {}) => {
  const response = {
    code: 200,
    success: true,
    message: message,
  };

  if (data) {
    response.count = data.length;
    response.data = data;
  }

  return response;
};

export const error = ({ message = "Internal Server Error" } = {}) => ({
  code: 500,
  success: false,
  message: message,
});

export const created = ({ message = "New Data Created" } = {}) => ({
  code: 201,
  success: true,
  message: message,
});

export const notFound = ({ message = "Data Not Found" } = {}) => ({
  code: 404,
  success: false,
  message: message,
});

export const badRequest = ({ message = "Bad Request" } = {}) => ({
  code: 400,
  success: false,
  message: message,
});

export const unauthorized = ({ message = "Unauthorized" } = {}) => ({
  code: 401,
  success: false,
  message: message,
});

export const forbidden = ({ message = "Forbidden" } = {}) => ({
  code: 403,
  success: false,
  message: message,
});
