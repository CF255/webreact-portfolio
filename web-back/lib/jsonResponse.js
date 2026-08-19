export default function jsonResponse(statuscode, body) {
    return {
      statuscode,
      body: body,
    };
  };


