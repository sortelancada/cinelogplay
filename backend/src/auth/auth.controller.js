export function notImplementedAuth(req, res) {
  res.status(501).json({
    success: false,
    message: "Auth controller não implementado. Endpoint placeholder.",
  });
}

export default {
  notImplementedAuth,
};
